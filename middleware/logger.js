require ('../hub')
require('../driver');

const logEvent = (event, payload) => {
  const timestamp = new Date().toISOString();
  console.log(`EVENT { event: '${event}', time: ${timestamp}, payload: ${JSON.stringify(payload, null, 2)} }`);
};

module.exports = { logEvent };
