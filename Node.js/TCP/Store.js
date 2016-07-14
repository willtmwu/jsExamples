var net = require('net');

var server = net.createServer(function (socket) {
    socket.on('data', function(data) {
        console.log('DATA ' + socket.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        socket.write('You said "' + data + '"');
    });
  //socket.pipe(socket);
});

server.listen(8880, '127.0.0.1');
console.log('Store Server running at http://127.0.0.1:7032/');