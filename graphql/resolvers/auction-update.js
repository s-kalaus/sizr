const auctionUpdate = async (
  _,
  { auctionId, title, path },
  { dataSources },
) => dataSources.auctionDS.update({ auctionId, title, path });

module.exports = auctionUpdate;
