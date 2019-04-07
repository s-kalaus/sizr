const convict = require('convict');

const config = convict({
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  logger: {
    console: {
      level: {
        format: ['info', 'error'],
        default: 'info',
      },
    },
  },
  db: {
    database: {
      format: String,
      env: 'SIZR_DB_DATABASE',
      default: 'localhost',
    },
    user: {
      format: String,
      sensitive: true,
      env: 'SIZR_DB_USER',
      default: 'user',
    },
    password: {
      format: String,
      sensitive: true,
      env: 'SIZR_DB_PASSWORD',
      default: 'password',
    },
    dialect: {
      format: String,
      default: 'mysql',
    },
    host: {
      format: String,
      env: 'SIZR_DB_HOST',
      default: 'localhost',
    },
    storage: {
      format: String,
      default: ':memory',
    },
    port: {
      format: 'port',
      default: 3306,
    },
    loggingToConsole: {
      format: Boolean,
      default: true,
    },
    sync: {
      format: Boolean,
      default: false,
    },
  },
  rabbitmq: {
    port: {
      format: 'port',
      default: 5672,
    },
    host: {
      format: String,
      env: 'SIZR_RABBITMQ_HOST',
      default: 'localhost',
    },
  },
  express: {
    port: {
      format: 'port',
      default: 4300,
    },
    viewCache: {
      format: Boolean,
      default: true,
    },
  },
  graphql: {
    port: {
      format: 'port',
      default: 4000,
    },
  },
  url: {
    format: String,
    default: 'localhost',
  },
  redis: {
    port: {
      format: 'port',
      default: 6379,
    },
    host: {
      format: String,
      env: 'SIZR_REDIS_HOST',
      default: 'localhost',
    },
  },
  token: {
    secret: {
      format: String,
      env: 'SIZR_TOKEN_SECRET',
      default: '',
    },
    ttl: {
      format: Number,
      default: 300,
    },
  },
  shopify: {
    key: {
      format: String,
      env: 'SIZR_SHOPIFY_KEY',
      default: '',
    },
    secret: {
      format: String,
      env: 'SIZR_SHOPIFY_SECRET',
      default: '',
    },
    scope: {
      format: Array,
      default: [],
    },
    name: {
      format: String,
      default: '',
    },
  },
});

const env = config.get('env');

config.loadFile(`${__dirname}/${env}.json`);
config.validate({ allowed: 'strict' });

module.exports = config;
