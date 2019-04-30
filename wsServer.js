// const { logger } = require('logger');
const socketio = require('socket.io');

module.exports.init = async (server) => {
  const options = {};

  const io = socketio(server, options);
  io.origins(['http://localhost:3000']);

  io.on('connection', (socket) => {
    // logger.debug(`connect: ${socket.id}`);
    console.debug(`connect: ${socket.id}`);

    socket.on('chat', (data) => {
      console.log(data);
      io.sockets.emit('chat', data);
    });

    socket.on('disconnect', (reason) => {
      // logger.debug(`disconnect: ${socket.id} ${reason}`);
      console.debug(`disconnect: ${socket.id} ${reason}`);
    });
  });
}
