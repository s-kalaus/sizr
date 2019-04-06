const customerAdd = async (
  _,
  {
    email,
    password,
    firstName,
    lastName,
  },
  { dataSources },
) => dataSources.customerDS.add({
  email,
  password,
  firstName,
  lastName,
});

module.exports = customerAdd;
