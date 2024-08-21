const { Client } = require('whatsapp-web.js');
const path = require("path")

const client = new Client({
  puppeteer: {
    // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
    headless: true,
  },
  path: path.join(__dirname, "..", "assets/.wwebjs_cache"),
  stric: false
});

client.on('loading_screen', (percent, message) => {
  console.log('LOADING SCREEN', percent, message);
});

// Pairing code only needs to be requested once
let pairingCodeRequested = false;
client.on('qr', async (qr) => {
  // paiuting code example
  const pairingCodeEnabled = true;
  if (pairingCodeEnabled && !pairingCodeRequested) {
    const pairingCode = await client.requestPairingCode('6285183020580'); // enter the target phone number
    console.log('Pairing code enabled, code: ' + pairingCode);
    pairingCodeRequested = true;
  }
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessful
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', async () => {
  console.log('READY');
  const debugWWebVersion = await client.getWWebVersion();
  console.log(`WWebVersion = ${debugWWebVersion}`);

  client.pupPage.on('pageerror', function (err) {
    console.log('Page error: ' + err.toString());
  });
  client.pupPage.on('error', function (err) {
    console.log('Page error: ' + err.toString());
  });

});

module.exports = client