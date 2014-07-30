//var app = require('express')();

var express = require('express');
 
var server = express();
server.use(express.static(__dirname + '/coin_game'));
var http = require('http').Server(server);
var io = require('socket.io')(http);
//http.use(app.static(__dirname + '/'));

//app.get('/', function(req, res){
//  res.sendfile('index_coin.html');
//});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});