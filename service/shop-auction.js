const { promisify } = require('util');
const ShopService = require('./shop');

class ShopAuctionService extends ShopService {
  static getPageHtml({ auctionId }) {
    const { start, end } = ShopAuctionService.getPageHtmlWrap();
    return `${start}<!-- Do not delete or modify code between "TOKDECK: start" and "TOKDECK: end" comments. This will break auction logic or link between this page and auction will be lost -->Hello ${auctionId}${end}`;
  }

  static getPageHtmlWrap() {
    return {
      start: '<!-- TOKDECK: start -->',
      end: '<!-- TOKDECK: end -->',
    };
  }

  async getOne({
    oid,
    customerShopAccountId,
  }) {
    const shopify = await this.initShopify({ customerShopAccountId });
    const shopifyGet = promisify(shopify.get.bind(shopify));

    const { page: { body_html: bodyHtml } } = await shopifyGet(`/admin/pages/${oid}.json`);

    return { bodyHtml };
  }

  async add({
    auctionId,
    title,
    handle,
    customerShopAccountId,
  }) {
    const shopify = await this.initShopify({ customerShopAccountId });
    const shopifyPost = promisify(shopify.post.bind(shopify));

    const page = {
      title,
      handle,
      body_html: ShopAuctionService.getPageHtml({ auctionId }),
      metafields: [
        {
          key: 'auctionId',
          value: auctionId,
          value_type: 'integer',
          namespace: 'tokdeck',
        },
      ],
    };

    const { page: { id: oid } } = await shopifyPost('/admin/pages.json', { page });

    return { oid };
  }

  async update({
    auctionId,
    oid,
    title,
    handle,
    customerShopAccountId,
  }) {
    const shopify = await this.initShopify({ customerShopAccountId });
    const shopifyPut = promisify(shopify.put.bind(shopify));
    const { start, end } = ShopAuctionService.getPageHtmlWrap();
    const bodyHtmlInner = ShopAuctionService.getPageHtml({ auctionId });
    let bodyHtml;

    try {
      [{ bodyHtml }] = [await this.getOne({ oid, customerShopAccountId })];
    } catch (err) {
      if (err.code !== 404) {
        throw err;
      }

      return this.add({
        auctionId,
        title,
        handle,
        customerShopAccountId,
      });
    }

    const found = bodyHtml.match(new RegExp(`${start}.*${end}`, 'i'));
    bodyHtml = found
      ? bodyHtml.replace(`${start}.*${end}`, bodyHtmlInner)
      : `${bodyHtml}${bodyHtmlInner}`;

    const page = {
      title,
      handle,
      body_html: bodyHtml,
    };

    await shopifyPut(`/admin/pages/${oid}.json`, { page });

    return { oid };
  }

  async remove({
    oid,
    customerShopAccountId,
  }) {
    const shopify = await this.initShopify({ customerShopAccountId });
    const shopifyDelete = promisify(shopify.delete.bind(shopify));

    try {
      await shopifyDelete(`/admin/pages/${oid}.json`);
    } catch (err) {
      if (err.code !== 404) {
        throw err;
      }
    }
  }
}

module.exports = ShopAuctionService;
