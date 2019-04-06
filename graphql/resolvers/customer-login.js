const customerLogin = async (
  _,
  { login, password },
  { dataSources },
) => dataSources.authDS.login({ login, password });

module.exports = customerLogin;
