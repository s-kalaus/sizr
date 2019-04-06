const productCount = async (
  { auctionId },
  __,
  { dataSources },
) => dataSources.productDS.getCount({ auctionId });

module.exports = productCount;
