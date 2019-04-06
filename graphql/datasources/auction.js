const { ApolloError } = require('apollo-server');

class AuctionDS {
  constructor(app) {
    this.app = app;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAll({ customerId = this.context.customerId, ext = this.context.ext } = {}) {
    const resultAuction = await this.app.service.AuctionService.getAll({ customerId, ext });

    if (!resultAuction.success) {
      throw new ApolloError(resultAuction.message, 500, resultAuction);
    }

    return resultAuction.data;
  }

  async getOne({ customerId = this.context.customerId, auctionId, ext = this.context.ext }) {
    const resultAuction = await this.app.service.AuctionService
      .getOne({ customerId, auctionId, ext });

    if (!resultAuction.success) {
      throw new ApolloError(resultAuction.message, 500, resultAuction);
    }

    return resultAuction.data;
  }

  async add({
    title,
    path,
    customerId = this.context.customerId,
    ext = this.context.ext,
  }) {
    const resultAdd = await this.app.service.AuctionService.add({
      title,
      path,
      customerId,
      ext,
    });

    if (!resultAdd.success) {
      throw new ApolloError(resultAdd.message, 500, resultAdd);
    }

    return resultAdd.data;
  }

  async update({
    auctionId,
    title,
    path,
    customerId = this.context.customerId,
    ext = this.context.ext,
  }) {
    const resultUpdate = await this.app.service.AuctionService.update({
      auctionId,
      title,
      path,
      customerId,
      ext,
    });

    if (!resultUpdate.success) {
      throw new ApolloError(resultUpdate.message, 500, resultUpdate);
    }

    const { auctionId: theAuctionId } = resultUpdate.data;

    return { auctionId: theAuctionId };
  }

  async remove({
    auctionId,
    customerId = this.context.customerId,
    ext = this.context.ext,
  }) {
    const resultRemove = await this.app.service.AuctionService.remove({
      auctionId,
      customerId,
      ext,
    });

    if (!resultRemove.success) {
      throw new ApolloError(resultRemove.message, 500, resultRemove);
    }

    return { success: true };
  }
}

module.exports = AuctionDS;
