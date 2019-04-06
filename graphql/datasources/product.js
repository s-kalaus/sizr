const { ApolloError } = require('apollo-server');

class ProductDS {
  constructor(app) {
    this.app = app;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAll({
    customerId = this.context.customerId,
    auctionId,
    ext = this.context.ext,
  } = {}) {
    const resultProduct = await this.app.service.ProductService
      .getAll({ customerId, auctionId, ext });

    if (!resultProduct.success) {
      throw new ApolloError(resultProduct.message, 500, resultProduct);
    }

    return resultProduct.data;
  }

  async getCount({
    customerId = this.context.customerId,
    auctionId,
    ext = this.context.ext,
  } = {}) {
    const resultProduct = await this.app.service.ProductService
      .getCount({ customerId, auctionId, ext });

    if (!resultProduct.success) {
      throw new ApolloError(resultProduct.message, 500, resultProduct);
    }

    return resultProduct.data;
  }

  async getOne({
    customerId = this.context.customerId,
    productId,
    ext = this.context.ext,
  }) {
    const resultAuction = await this.app.service.ProductService
      .getOne({ customerId, productId, ext });

    if (!resultAuction.success) {
      throw new ApolloError(resultAuction.message, 500, resultAuction);
    }

    return resultAuction.data;
  }

  async add({
    title,
    oid,
    customerId = this.context.customerId,
    auctionId,
    ext = this.context.ext,
  }) {
    const resultAdd = await this.app.service.ProductService.add({
      oid,
      title,
      customerId,
      auctionId,
      ext,
    });

    if (!resultAdd.success) {
      throw new ApolloError(resultAdd.message, 500, resultAdd);
    }

    return resultAdd.data;
  }

  async update({
    productId,
    customerId = this.context.customerId,
    ext = this.context.ext,
  }) {
    const resultUpdate = await this.app.service.ProductService.update({
      productId,
      customerId,
      ext,
    });

    if (!resultUpdate.success) {
      throw new ApolloError(resultUpdate.message, 500, resultUpdate);
    }

    return resultUpdate.data;
  }

  async remove({
    productId,
    customerId = this.context.customerId,
    ext = this.context.ext,
  }) {
    const resultRemove = await this.app.service.ProductService.remove({
      productId,
      customerId,
      ext,
    });

    if (!resultRemove.success) {
      throw new ApolloError(resultRemove.message, 500, resultRemove);
    }

    return { success: true };
  }
}

module.exports = ProductDS;
