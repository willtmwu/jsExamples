var net = require('net');
var sys = require("sys");
var dgram = require('dgram');

var HOST = '127.0.0.1';
var PORT = 7032;

var client = dgram.createSocket('udp4');

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    var message = new Buffer(d);
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        //console.log('UDP message sent to ' + HOST +':'+ PORT);
        //client.close();
    });
});

client.on('message', function(msg, rinfo) {
  //console.log('Received %s from %s:%d',msg, rinfo.address, rinfo.port);
  console.log('%s', msg);
});


