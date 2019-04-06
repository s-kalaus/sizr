const tokenGetOne = async (
  _,
  { customerId } = {},
  { dataSources },
) => dataSources.authDS.createToken({ customerId });

module.exports = tokenGetOne;
