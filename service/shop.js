const Shopify = require('shopify-api-node');

class ShopService {
  constructor(app) {
    this.app = app;
  }

  async authorize({
    shop,
    accessToken,
  }) {
    const shopify = new Shopify({
      shopName: shop,
      accessToken,
    });

    const shopAccount = await this.app.sequelize.models.ShopAccounts.findOne({
      attributes: ['shopAccountId'],
      where: {
        type: 'shopify',
      },
    });

    if (!shopAccount) {
      return { success: false, message: 'Shop Account Not Found' };
    }

    let [customerShopAccount] = await this.app.sequelize.models.CustomerShopAccounts
      .findOrCreate({
        attributes: ['token', 'customerShopAccountId'],
        where: {
          shopAccountId: shopAccount.shopAccountId,
          shop,
        },
      });

    if (!customerShopAccount) {
      return { success: false, message: 'Customer Shop Account Not Found' };
    }

    let shopResult;

    try {
      shopResult = await shopify.shop.get();
    } catch (e) {
      return { success: false, message: 'Shop Get Error' };
    }

    const { email } = shopResult;

    let resultCustomer = await this.app.service.CustomerService.getOne({ email });

    if (!resultCustomer.success) {
      const resultAdd = await this.app.service.CustomerService.add({ email });

      if (!resultAdd.success) {
        return { success: false, message: 'Customer Creation Error' };
      }

      resultCustomer = await this.app.service.CustomerService
        .getOne({ customerId: resultAdd.data.customerId });

      if (!resultCustomer.success) {
        return { success: false, message: 'Customer Fetch Error' };
      }
    }

    const { customerId } = resultCustomer.data;

    if (accessToken !== customerShopAccount.token) {
      customerShopAccount = await customerShopAccount.update({
        token: accessToken,
      }, {
        fields: ['token'],
      });
    }

    this.app.logger.info('ShopService (authorize): %s', shop);

    return {
      success: true,
      data: {
        customerId,
        customerShopAccountId: customerShopAccount.customerShopAccountId,
      },
    };
  }

  async initShopify({ customerShopAccountId }) {
    const customerShopAccount = await this.app.sequelize.models.CustomerShopAccounts
      .findOne({
        attributes: ['shop', 'token'],
        where: {
          customerShopAccountId,
        },
      });

    if (!customerShopAccount) {
      return { success: false, message: 'Customer Shop Account Not Found' };
    }

    const { shop, token: accessToken } = customerShopAccount;

    return new Shopify({
      shopName: shop,
      accessToken,
    });
  }
}

module.exports = ShopService;
