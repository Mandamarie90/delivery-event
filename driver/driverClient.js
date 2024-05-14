const eventEmitter = require('../eventPool');

eventEmitter.on('pickup', (payload) => {
  console.log('Payload received in pickup event:', payload);
  console.log(`DRIVER: picked up ${payload.orderId}`);
  eventEmitter.emit('in-transit', payload);

  
  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    eventEmitter.emit('delivered', payload);
  }, 1000); 
});


