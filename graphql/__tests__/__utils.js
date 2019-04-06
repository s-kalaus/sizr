const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const { execute } = require('apollo-link');

const startTestServer = async (server) => {
  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch,
  });

  const executeOperation = ({ query, variables = {} }) => execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};

module.exports = {
  startTestServer,
};
