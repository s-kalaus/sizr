const auctionRemove = async (
  _,
  { auctionId },
  { dataSources },
) => dataSources.auctionDS.remove({ auctionId });

module.exports = auctionRemove;
