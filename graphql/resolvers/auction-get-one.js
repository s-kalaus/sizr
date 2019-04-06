const auctionGetOne = async (
  { auctionId: parentAuctionId } = {},
  { auctionId },
  { dataSources },
) => dataSources.auctionDS.getOne({ auctionId: auctionId || parentAuctionId });

module.exports = auctionGetOne;
