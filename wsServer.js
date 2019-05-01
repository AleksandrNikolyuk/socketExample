// const { logger } = require('logger');
const socketio = require('socket.io');
const messageModel = require('./models/messagesModel');

module.exports.init = async (server) => {
  const options = {};

  const io = socketio(server, options);
  io.origins(['http://localhost:3000']);

  io.on('connection', (socket) => {
    console.debug(`connect: ${socket.id}`);
    socket.emit('connected', 'You are connected') 

    socket.join('all');

    socket.on('msg', content => {
      const obj = {
        date: new Date(),
        content: content.message,
        username: content.name
      };

      messageModel.create(obj, err => {
        if(err) return console.error('messageModel', err);
        socket.emit('message', obj);
        socket.to('all').emit('message', obj);
      });
    });

    socket.on('receiveHistory', () => {
      messageModel.find({}).sort({date: -1}).limit(50).sort({date: 1}).lean()
      .exec((err, messages) => {
        if(!err){
        socket.emit('history', messages);
        socket.to('all').emit('message', messages);
        }
      });
    });

    socket.on('disconnect', (reason) => {
      // logger.debug(`disconnect: ${socket.id} ${reason}`);
      console.debug(`disconnect: ${socket.id} ${reason}`);
    });
  });
}
