
const socketio = require('socket.io');

module.exports.init = async (server) => {
  const options = {};

  const io = socketio(server, options);
  io.origins([
    'http://localhost:5000',
    'http://localhost:3000',
  ]);

  io.on('connection', async (socket) => {
    console.debug(`connect: ${socket.id}`);
    socket.emit('connected', 'You are connected');

    socket.emit('take country', 'Ukraine');

    socket.on('disconnect', (reason) => {
      console.debug(`disconnect: ${socket.id} ${reason}`);
    });
  });
};
