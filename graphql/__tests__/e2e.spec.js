process.env.NODE_ENV = 'test';
const gql = require('graphql-tag');
const { toPromise } = require('apollo-link');
const App = require('../../lib/app');
const { loadFixtures, createDbStructure } = require('../../lib');
const { startTestServer } = require('./__utils');

const app = new App();

const LOGIN = gql`
  mutation customerLogin($login: String!, $password: String!) {
    customerLogin(login: $login, password: $password) {
      customer {
        customerId
      }
    }
  }
`;

describe('Graphql - e2e', () => {
  let stop;
  let graphql;

  beforeEach(async () => {
    await app.dbConnect();
    await createDbStructure.call(app);
    await loadFixtures.call(app, ['common', 'test']);
    const { server } = await app.graphqlStart();
    const testServer = await startTestServer(server);
    [stop, graphql] = [testServer.stop, testServer.graphql];
  });

  afterEach(async () => {
    stop();
    await app.dbDisconnect();
  });

  it('login', async () => {
    const res = await toPromise(
      graphql({
        query: LOGIN,
        variables: { login: 'sergey.kalaus@gmail.com', password: '12345678' },
      }),
    );
    expect(res).toMatchSnapshot();
  });
});
