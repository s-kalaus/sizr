const { promisify } = require('util');
const { ApolloError } = require('apollo-server');
const ShopService = require('./shop');

class ShopProductService extends ShopService {
  async getOne({
    oid,
    customerShopAccountId,
  }) {
    const shopify = await this.initShopify({ customerShopAccountId });
    const shopifyGet = promisify(shopify.get.bind(shopify));
    let title;

    try {
      [{ product: { title } }] = [await shopifyGet(`/admin/products/${oid}.json`)];
    } catch ({ error, code }) {
      throw new ApolloError(error, code);
    }

    return { title };
  }
}

module.exports = ShopProductService;
