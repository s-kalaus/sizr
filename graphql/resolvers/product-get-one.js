const productGetOne = async (
  { productId: parentAuctionId } = {},
  { productId },
  { dataSources },
) => dataSources.productDS.getOne({ productId: productId || parentAuctionId });

module.exports = productGetOne;
