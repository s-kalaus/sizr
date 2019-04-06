const productRemove = async (
  _,
  { productId },
  { dataSources },
) => dataSources.productDS.remove({ productId });

module.exports = productRemove;
