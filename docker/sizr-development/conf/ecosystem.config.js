module.exports = {
  apps: [{
    name: 'frontend',
    script: 'npm',
    cwd: 'frontend',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
  }, {
    name: 'graphql',
    script: './bin/graphql.js',
    instances: 1,
    autorestart: true,
    watch: ['./config/**/*', './graphql/**/*', './lib/**/*', './model/**/*', './service/**/*'],
  }, {
    name: 'express',
    script: './bin/express.js',
    instances: 1,
    autorestart: true,
    watch: ['./config/**/*', './express/**/*', './lib/**/*', './model/**/*', './service/**/*', './view/**/*'],
  }],
};
