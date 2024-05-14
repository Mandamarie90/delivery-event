const { createVendorOrder } = require('./vendorClient');
require('../hub');

const storeName = 'Awesome Store';
createVendorOrder(storeName);

