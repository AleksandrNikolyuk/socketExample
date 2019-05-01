module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/chats',
    connect: {
      config: {
        autoIndex: false,
      },
      useNewUrlParser: true,
    },
  },
};
