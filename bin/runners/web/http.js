// const { logger } = require('logger');

const http = require('http');
const port = require('config').get('server:port');
const expressCallback = require('./expressCallback');


const init = () => new Promise((resolve) => {
  // logger.info(' - init http server');
  console.info(' - init http server');

  const server = http.createServer(expressCallback);

  server.on('listening', () => {
    // logger.info(` - - http server listening on ${port}`);
    console.info(` - - http server listening on ${port}`);
    resolve(server);
  });

  server.on('error', (error) => {
    switch (error.code) {
    case 'EACCES':
      throw `Port ${port} requiresolve elevated privileges`;
    case 'EADDRINUSE':
      throw `Port ${port} is already in use`;
    default:
      throw error;
    }
  });

  server.listen(port);
  return server;
});

const enableRoutes = () => {
  expressCallback.enableRoutes();
  // logger.info(' - enable http routes');
  console.info(' - enable http routes');
};

module.exports = init;
module.exports.enableRoutes = enableRoutes;
