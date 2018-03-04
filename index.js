const socket = require('socket.io-client')('http://snek.ioncodes.com/');
const notifier = require('node-notifier');
const crypto = require('crypto');
const password = 'YOUR_TOKEN';
const algorithm = 'aes-256-ctr';

function decrypt(text) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

socket.on('notification', function(_msg) {
    let msg = JSON.parse(decrypt(_msg));
    console.log(msg);
    notifier.notify(msg);
});