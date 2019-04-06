module.exports = {
  apps: [{
    name: 'graphql',
    script: './bin/graphql.js',
    instances: 2,
    autorestart: true,
    watch: false,
  }, {
    name: 'express',
    script: './bin/express.js',
    instances: 2,
    autorestart: true,
    watch: false,
  }],
};
