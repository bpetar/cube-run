var express = require('express');
var http = require('http');
var app = express();
app.use(express.static(__dirname + '/coin_game'));
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var games = []
var newGame = {}

io.on('connection', function(socket){
	console.log('a user connected');
	//get username
	var username = "pera";
	var myGame = games.length;
	var myNumber = 1;
	
	if(newGame.player1 == undefined)
	{
		//create new game
		newGame = {id:games.length, player1: username, player1socket: socket, player2: "", player2socket: null, dateCreated:Date.now(), started:false, playerTurn: username, totalMoves:0};
	}
	else
	{
		myNumber = 2;
		newGame.player2 = username;
		newGame.player2socket = socket;
		newGame.started = true;
		//TODO: send game id to both players
		games.push(newGame);
		newGame = {};
		console.log("games:"+games);
	}
	
	socket.on('game moved', function(direction){
		console.log("game moved, myGame" + myGame + ", myNumber:" + myNumber);
		if(games[myGame])
		{
			if (myNumber == 1)
				games[myGame].player2socket.emit('oponent move', direction);
			else
				games[myGame].player1socket.emit('oponent move', direction);
		}
	});
	
	socket.on('disconnect', function(){
		console.log('user disconnected');
		//TODO:remove from game queue?
	});
});

server.listen(3000, function(){
	console.log('listening on *:3000');
});