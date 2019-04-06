const App = require('../lib/app');
const { createDbStructure } = require('../lib');

const app = new App();

app
  .dbConnect()
  .then(() => createDbStructure.call(app))
  .then(() => app.dbDisconnect());
