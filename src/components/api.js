import openSocket from 'socket.io-client';
const socket = openSocket('/');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export {
  subscribeToTimer
};