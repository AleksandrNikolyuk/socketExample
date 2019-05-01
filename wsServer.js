// const { logger } = require('logger');
const socketio = require('socket.io');
const messageModel = require('./models/messagesModel');
const Ajv = require('ajv');
const ProfileJsonSchema = require('schemes/profile');

module.exports.init = async (server) => {
  const options = {};

  const io = socketio(server, options);
  io.origins(['http://localhost:3000']);

  io.on('connection', (socket) => {
    console.debug(`connect: ${socket.id}`);
    socket.emit('connected', 'You are connected') 

    socket.join('all');  // в какие rooms отправлять сообщения. Так как у нас room одна пишем 'all'

    socket.on('msg', content => {
      const obj = {
        date: new Date(),
        content: content.message,
        username: content.name
      };

    let ajv = new Ajv({verbose: true});

    const validProfile = ajv.validate(ProfileJsonSchema, obj);

      // Если данные не соответствуют json схеме, тогда формируем ошибку и выбрасываем исключение
      if (!validProfile) {
          const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
          throw new Error(message);
      }
    
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
