const { withFilter } = require('apollo-server');

const messageAdded = {
  subscribe: withFilter(
    (_, __, { app }) => app.pubsub.asyncIterator('newMessage'),
    ({ messageAdded: theMessageAdded }, _, { customerId }) => customerId && `${theMessageAdded.customerId}` === `${customerId}`,
  ),
};

module.exports = messageAdded;
