const fixtures = require('minimist')(process.argv.slice(2))._;
const App = require('../lib/app');
const { loadFixtures } = require('../lib');

const app = new App();

app
  .dbConnect()
  .then(() => loadFixtures.call(app, fixtures))
  .then(() => app.dbDisconnect());
