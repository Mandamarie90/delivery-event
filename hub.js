const eventEmitter = require('./eventPool');
const { logEvent } = require('./middleware/logger');
require('./vendor/handler');
require('./driver/handler');



eventEmitter.on('pickup', (payload) => logEvent('pickup', payload));
eventEmitter.on('in-transit', (payload) => logEvent('in-transit', payload));
eventEmitter.on('delivered', (payload) => logEvent('delivered', payload));
eventEmitter.on('notify-vendor', (payload) => logEvent('notify-vendor', payload));



// const storeName = '1-206-flowers';
// const package = {
//   store: storeName,
//   orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
//   customer: 'Jamal Braun',
//   address: 'Schmittfort, LA'
// };
// eventEmitter.emit('pickup', package);

function eventLog(event, payload) {
  console.log(`EVENT: {
      event: '${event}',
      time: '${new Date().toISOString()}',
      payload: ${JSON.stringify(payload, null, 2)}
  }`);
}
module.exports = eventLog;
