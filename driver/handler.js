const eventEmitter = require('../eventPool');

// Driver notified of package to be delivered
eventEmitter.on('in-transit', (payload) => {
  console.log(`Package is in transit: ${payload.orderId}`);
  // Delay to simulate transit
  setTimeout(() => {
    eventEmitter.emit('delivered', payload);
  }, 1000);
});

// Driver alerts system when package is delivered
eventEmitter.on('delivered', (payload) => {
  console.log(`Package delivered: ${payload.orderId}`);
  eventEmitter.emit('notify-vendor', payload);
});
