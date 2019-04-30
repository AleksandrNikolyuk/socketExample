const socket = io(); //для фронта

const button = document.querySelector('.button');
const field = document.querySelector('.field');
const chat = document.querySelector('.chat');

button.addEventListener('click', function(){
  socket.emit('chat', {
    name: field.value
  });
});

socket.on('chat', function(data){
  chat.innerHTML = `Hello ${data.name}`;
});