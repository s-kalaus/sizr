const productUpdate = async (
  _,
  { productId },
  { dataSources },
) => dataSources.productDS.update({ productId });

module.exports = productUpdate;
