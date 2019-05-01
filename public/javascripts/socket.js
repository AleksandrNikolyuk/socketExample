const button = document.querySelector('button');

window.addEventListener('load', () => {
  const socket = io(); 

  socket.on('connected', function (msg) {
      console.log(msg);
      socket.emit('receiveHistory');
  });

  socket.on('message', addMessage);

  socket.on('history', messages => {
      for (let message of messages) {
          addMessage(message);
      }
  });

  button.addEventListener('click', (e) => {
      e.preventDefault();

      const selecMessage = document.querySelector("textarea[name='message']");
      const selecName = document.querySelector("input[name='name']");

      let messageContent = {
        message: selecMessage.value,
        name: selecName.value
      }
      console.log(messageContent);
      if(messageContent !== '') {
          socket.emit('msg', messageContent);
          selecMessage.value = '';
          selecName.value = '';
      }
  });

  function addMessage(message) {
    message.date      = (new Date(message.date)).toLocaleString();
    message.username  = message.username;
    message.content   = message.content;

    
    let chathistory = document.querySelector('.chat-history ul');
    let itemMessage = document.createElement('li');
    itemMessage.innerHTML = `
        <div class="message-data">
            <span class="message-data-name">${message.username}</span>
            <span class="message-data-time">${message.date}</span>
        </div>
        <div class="message my-message" dir="auto">${message.content}</div>
    `;
    chathistory.appendChild(itemMessage);
  }
});