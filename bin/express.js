const App = require('../lib/app');

const app = new App();

app
  .dbConnect()
  .then(() => app.expressStart());
