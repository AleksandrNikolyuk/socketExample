// const { logger } = require('logger');

const httpServer = require('./http');
const wsServer = require('./ws');

const init = async () => {
  // logger.info('Init web servers');
  console.info('Init web servers');
  const server = await httpServer();
  await wsServer(server);
  httpServer.enableRoutes();
};

module.exports = init;
