module.exports = async function createDbStructure() {
  let tables;
  if (this.config.get('db.dialect') === 'sqlite') {
    tables = await this.sequelize.query('SELECT * FROM sqlite_master WHERE type="table"');
    tables = tables.filter(table => table !== 'sqlite_sequence').map(TABLE_NAME => ({ TABLE_NAME }));
  } else {
    [tables] = await this.sequelize.query(`SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = "${this.config.get('db.database')}"`);
  }
  tables.forEach(async table => this.sequelize.query(`DROP TABLE IF EXISTS ${table.TABLE_NAME}`));
  await this.dbSync(true);
  this.logger.info('Database structure created');
};
