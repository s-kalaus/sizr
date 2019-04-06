const customerGetOne = async (
  { customerId: parentCustomerId } = {},
  { customerId } = {},
  { dataSources },
) => dataSources.customerDS.getOne({ customerId: customerId || parentCustomerId });

module.exports = customerGetOne;
