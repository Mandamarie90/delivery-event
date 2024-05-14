const Chance = require('chance');
const chance = new Chance();
const eventEmitter = require('../eventPool');


const createVendorOrder = (storeName) => {
  const order = {
    store: storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };

  console.log(`Vendor: New order created for ${order.customer}`);
  eventEmitter.emit('pickup', order);
};

// Listen for delivered event
eventEmitter.on('delivered', (payload) => {
  console.log(`Thank you for your order, ${payload.customer}`);
});

module.exports = { createVendorOrder };

