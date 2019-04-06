const auctionGetAll = async (_, __, { dataSources }) => dataSources.auctionDS.getAll();

module.exports = auctionGetAll;
