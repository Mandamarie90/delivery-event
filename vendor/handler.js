const eventEmitter = require('../eventPool');

eventEmitter.on('pickup', (payload) => {
  // console.log(`Package ready for pickup: ${payload.orderId}`);
  eventEmitter.emit('in-transit', payload);
});

eventEmitter.on('notify-vendor', (payload) => {
  // console.log(`Vendor notified of delivery: ${payload.orderId}`);
});
