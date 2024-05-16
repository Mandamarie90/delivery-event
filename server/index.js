'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
console.log('Listening on port:', PORT);
const io = require('socket.io')(PORT);

// Save the orders in a queue
const Queue = require('./lib/queue');
const orders = new Queue();

io.on('connection', handleClientConnection);

function handleClientConnection(socket) {
  console.log('New Connection:', socket.id);

  socket.on('driver-ready', () => {
    console.log('Driver is ready, checking for orders...');
    let nextOrder = orders.dequeue();
    if (nextOrder) {
      console.log('HUB: Sending Order to Driver', nextOrder);
      console.log('Orders in the queue:', orders.length());
      console.log('---------------');
      socket.emit('pickup', nextOrder);
    } else {
      console.log('HUB: No Orders in Queue');
      console.log('---------------');
    }
  });

  socket.on('ready-for-pickup', (payload) => {
    payload.status = 'queued for pickup';
    orders.enqueue(payload);

    console.log('HUB: Order Queued for Pickup', payload);
    console.log('Orders in the queue:', orders.length());
    console.log('---------------');
  });

  socket.on('package-in-transit', (payload) => {
    payload.status = 'in transit';
    console.log('HUB: Package in Transit', payload);
    console.log('---------------');
    io.emit('in-transit', payload);
  });

  socket.on('package-delivered', (payload) => {
    payload.status = 'delivered';
    console.log('HUB: Package Delivered', payload);
    console.log('---------------');
    io.emit('delivered', payload);
  });
}
