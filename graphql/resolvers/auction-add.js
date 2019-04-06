const auctionAdd = async (
  _,
  { title, path },
  { dataSources },
) => dataSources.auctionDS.add({ title, path });

module.exports = auctionAdd;
