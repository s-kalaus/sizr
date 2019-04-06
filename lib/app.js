const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const Sequelize = require('sequelize');
const express = require('express');
const session = require('express-session');
const { ApolloServer } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('graphql-tools');
const config = require('../config');
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const permissions = require('../graphql/permissions');
const validators = require('../graphql/validators');
const {
  CustomerDS,
  AuthDS,
  AuctionDS,
  ProductDS,
} = require('../graphql/datasources');
const { graphql } = require('../lib');

const {
  AuthService,
  CustomerService,
  AuctionService,
  ProductService,
  MessageService,
  ShopService,
  ShopAuctionService,
  ShopProductService,
} = require('../service');
const { ShopController } = require('../express');

class App {
  constructor() {
    this.config = config;
    this.logger = null;
    this.sequelize = null;
    this.sequelizeConnection = null;
    this.service = {
      AuctionService: new AuctionService(this),
      ProductService: new ProductService(this),
      CustomerService: new CustomerService(this),
      AuthService: new AuthService(this),
      MessageService: new MessageService(this),
      ShopService: new ShopService(this),
      ShopAuctionService: new ShopAuctionService(this),
      ShopProductService: new ShopProductService(this),
    };
    this.express = {
      ShopController: new ShopController(this),
    };
    this.dataSource = {};

    this.loggerInitialize();
    this.dbInitialize();
  }

  loggerInitialize() {
    this.logger = createLogger({
      format: format.combine(
        format.splat(),
        format.colorize(),
        format.align(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info instanceof Error ? JSON.stringify(info.stack) : info.message}`),
      ),
      transports: [
        new transports.Console({
          level: this.config.get('logger.console.level'),
        }),
      ],
    });

    this.logger.info('Logger initialized');
  }

  dbInitialize() {
    const cnf = this.config.get('db');
    this.sequelize = new Sequelize(cnf.database, cnf.user, cnf.password, {
      dialect: cnf.dialect,
      host: cnf.host,
      port: cnf.port,
      storage: cnf.storage,
      logging: cnf.loggingToConsole ? err => this.logger.info(err) : false,
      operatorsAliases: false,
      pool: {
        autostart: true,
        max: 100,
        min: 0,
        idle: 300000,
        acquire: 60000,
        evict: 60000,
      },
    });

    this.sequelize.models = {};

    fs
      .readdirSync(`${__dirname}/../model`)
      .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
      .forEach((file) => {
        const model = this.sequelize.import(`${__dirname}/../model/${file}`);
        this.sequelize.models[model.name] = model;
      });

    Object.keys(this.sequelize.models)
      .forEach(modelName => this.sequelize.models[modelName].associate
        && this.sequelize.models[modelName].associate(this.sequelize.models));

    this.logger.info('Database initialized: %s models', Object.keys(this.sequelize.models).length);
  }

  async dbConnect() {
    await this.sequelize.authenticate();
    this.logger.info('Database connected');
  }

  async dbDisconnect() {
    await this.sequelize.close();
    this.logger.info('Database disconnected');
  }

  async dbSync(force = false) {
    if (!force && !this.config.get('db.sync')) {
      return;
    }
    await this.sequelize.sync();
    this.logger.info('Database synchronized');
  }

  expressStart() {
    const app = express();
    app.set('port', this.config.get('express.port'));
    app.set('views', `${__dirname}/../view`);
    app.set('view engine', 'pug');
    app.set('view cache', this.config.get('express.viewCache'));
    app.use(
      session({
        secret: this.config.get('shopify.secret'),
        resave: true,
        saveUninitialized: false,
      }),
    );
    this.express.ShopController.init(app);
    app.listen(app.get('port'));
    this.logger.info('Express statred: %s', app.get('port'));
  }

  async graphqlStart() {
    const port = this.config.get('graphql.port');
    const dataSources = () => {
      this.dataSource = {
        customerDS: new CustomerDS(this),
        authDS: new AuthDS(this),
        auctionDS: new AuctionDS(this),
        productDS: new ProductDS(this),
      };
      return this.dataSource;
    };
    this.pubsub = graphql.createPubSub.call(this);
    const contextData = {
      app: this,
    };
    const context = async ({ req, connection }) => {
      if (connection && connection.context) {
        Object.assign(contextData, connection.context);
      } else {
        const token = ((req && req.headers && req.headers.authorization && req.headers.authorization) || '').replace(/^Bearer /, '');
        Object.assign(contextData, await graphql.auth.bind(this)({ token }));
      }

      return contextData;
    };

    const schema = applyMiddleware(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      permissions,
      validators,
    );

    const server = new ApolloServer({
      schema,
      dataSources,
      context,
      introspection: true,
      playground: {
        settings: {
          'request.credentials': 'include',
          'editor.reuseHeaders': false,
        },
        endpoint: `${this.config.get('url')}/graphql`,
        subscriptionsEndpoint: `${this.config.get('url').replace('https:', 'wss:')}/subscriptions`,
      },
      subscriptions: {
        path: '/subscriptions',
        onConnect: async (connectionParams) => {
          const token = (connectionParams.authorization || '').replace(/^Bearer /, '');
          return Object.assign(contextData, await graphql.auth.bind(this)({ token }));
        },
      },
      formatError: (err) => {
        this.logger.error('ApolloServer: %j', err);
        return err;
      },
    });

    if (this.config.get('env') !== 'test') {
      const { url, subscriptionsUrl } = await server.listen({ port });
      this.logger.info(`httpservice/graphql is listenning on port: ${port}. GraphQL url: ${url}, Subscription: ${subscriptionsUrl}`);
    }

    return {
      server,
    };
  }
}

module.exports = App;
