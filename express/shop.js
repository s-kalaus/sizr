const BaseController = require('./base');
const ShopifyExpress = require('@shopify/shopify-express');
const { RedisStrategy } = require('@shopify/shopify-express/strategies');

class ShopController extends BaseController {
  init(app) {
    const shopifyConfig = {
      host: this.app.config.get('url'),
      apiKey: this.app.config.get('shopify.key'),
      secret: this.app.config.get('shopify.secret'),
      scope: this.app.config.get('shopify.scope'),
      shopStore: new RedisStrategy({
        host: this.app.config.get('redis.host'),
        port: this.app.config.get('redis.port'),
      }),
      afterAuth(req, res) {
        res.redirect('/express/shop');
      },
    };
    const { routes, middleware } = ShopifyExpress(shopifyConfig);
    const { withShop } = middleware;
    app.use('/express/shop/install', routes);
    app.get('/express/shop', withShop({ authBaseUrl: '/express/shop/install' }), (req, res) => this.authorize(req, res));
  }

  async authorize(req, res) {
    const { session: { shop, accessToken } } = req;

    const resultAuth = await this.app.service.ShopService.authorize({
      shop,
      accessToken,
    });

    if (!resultAuth.success) {
      return this.error(res, resultAuth);
    }

    const { customerId, customerShopAccountId } = resultAuth.data;

    const resultToken = await this.app.service.AuthService.createToken({
      customerId,
      ...customerShopAccountId ? { ext: { customerShopAccountId: `${customerShopAccountId}` } } : {},
    });

    if (!resultToken.success) {
      return this.error(res, resultToken);
    }

    const { token } = resultToken.data;

    res.cookie('authorization', token);

    return res.redirect('/');
  }
}

module.exports = ShopController;
