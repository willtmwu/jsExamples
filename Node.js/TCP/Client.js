var net = require('net');
var sys = require("sys");

var HOST = '127.0.0.1';
var PORT = 7031;

var client = new net.Socket();
var stdin = process.openStdin();

client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    //client.write('I am Chuck Norris!' + "\n");

    stdin.addListener("data", function(d) {
    	client.write(d);
    });

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('Reply: ' + data);
    // Close the client socket completely
    //client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});



