const productAdd = async (
  _,
  { auctionId, title, oid },
  { dataSources },
) => dataSources.productDS.add({ auctionId, title, oid });

module.exports = productAdd;
