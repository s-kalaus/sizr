const createDbStructure = require('./createDbStructure');
const loadFixtures = require('./loadFixtures');
const {
  createPubSub,
  permissions,
  permissionsGroups,
  validator,
  auth,
} = require('./graphql');

module.exports = {
  createDbStructure,
  loadFixtures,
  graphql: {
    createPubSub,
    permissions,
    permissionsGroups,
    validator,
    auth,
  },
};
