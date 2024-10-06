const socket = io();

let username = document.getElementById("username");
let message = document.getElementById("message");
let send = document.getElementById("send");
let chat = document.getElementById("chat");
let broadCast = document.getElementById("broadCast");

function autoScroll() {
  chat.scrollTop = chat.scrollHeight;
}

socket.on('message', (data) => {
  broadCast.innerHTML = '';
  chat.innerHTML += `<div class="container">
        <strong>${data.username}:</strong> ${data.message}
      </div>`;
  autoScroll();
});

send.addEventListener('click', () => {
  if (username.value.length > 0 && message.value.length > 0) {
    socket.emit('message', {
      username: username.value,
      message: message.value
    });
    message.value = '';
    autoScroll();
  }
});

message.addEventListener("input", () => {
  if (message.value.length > 0 && username.value.length > 0) {
    socket.emit('broad', {
      username: username.value
    });
  } else {
    socket.emit('stop typing');
  }
});

socket.on('newBroad', (data) => {
  broadCast.innerHTML = `<strong>${data.username}</strong> is typing <img style="width: 40px;height: 30px;" src="write.gif">`;
});

socket.on('stop typing', () => {
  broadCast.innerHTML = '<p></p>';
});