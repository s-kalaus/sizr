const productGetAll = async (
  _,
  { auctionId },
  { dataSources },
) => dataSources.productDS.getAll({ auctionId });

module.exports = productGetAll;
