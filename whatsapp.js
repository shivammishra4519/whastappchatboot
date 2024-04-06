const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: "sessions" }),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    },
    puppeteer: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
    }
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    
    // Send a test message after client is ready
   

});

// Listen for incoming messages
client.on('message_create', message => {
    console.log('Incoming message:', message.body);

    // Example: Reply "pong" if message is "!ping"
    if (message.body === '!ping') {
        client.sendMessage(message.from, 'pong')
            .then(() => {
                console.log('Reply sent: pong');
            })
            .catch((error) => {
                console.error('Error sending reply:', error);
            });
    }
});

// client.initialize();


module.exports = client;