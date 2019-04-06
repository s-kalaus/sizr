const { readdirSync } = require('fs');
const moment = require('moment');

module.exports = async function loadFixtures(fixtures) {
  const processJson = data => JSON.parse(JSON.stringify(data).replace(/%NOW%/g, moment().format()));

  const loadFixture = async (fixture) => {
    if (fixture.indexOf('/') === -1) {
      const files = await readdirSync(`${__dirname}/../fixture/${fixture}`)
        .map(path => `${fixture}/${path.replace(/\.json$/i, '')}`);
      for (const path of files) {
        await loadFixture(path);
      }
      return;
    }

    const name = fixture.split('/').pop().split('-').shift();
    const data = require(`${__dirname}/../fixture/${fixture}`);

    for (const item of data) {
      try {
        await this.sequelize.models[name].create(processJson(item));
      } catch (err) {
        this.logger.error(err);
      }
    }
  };

  for (const fixture of fixtures) {
    await loadFixture(fixture);
  }
};
