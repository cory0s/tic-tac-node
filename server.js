'use strict';

// Socket.io setup
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Game = require('./games/ticTacClass.js');

const users = [];
let game;

// app.use('/docs', express.static('docs'));

io.on('connection', (socket) => {

  console.log('CONNECTED AS:', socket.id);
  let user = {
    socket: socket.id,
    turn: false,
    val: false,
  };

  users.push(user);
  console.log(users);
  io.emit('output', 'Thanks for choosing Tic-Tac-Node with Friends!')
  io.emit('output', 'Waiting for another player. Please stand by...' );

  // initiate game when (2) users join
  if(users.length >= 2){
    game = new Game(users[0], users[1]);
    game.makeGrid();
    game.initializePlayers();
    io.emit('clear', '');
    printBoard(game.gameGrid.Board);
    sendPrompt();
    users.shift();
    users.shift();
  }

  // on player input, update board
  socket.on('input', payload => {
    //The bulk of the game logic.  Listens for input from a socket, decides what to do with it.
    switch(socket.id){
      case game.user1.socket:
        if(game.user1.turn === true && game.processInput(payload) === true){
          game.runGame(payload, game.user1.val);
          io.emit('clear', '');
          printBoard(game.gameGrid.Board);        
          game.moves.push(payload);
          game.user1.turn = false;
          game.user2.turn = true;
          if (isEndGame(game.gameGrid.Board) === false) {
            sendPrompt();
          }
          else {
            game.user2.turn = false;
            io.emit('output', 'Please type "/exit" to quit the game, or "/lobby" to return to chat lobby.')
          }
          break;
        } else if(game.user1.turn === true){
          io.to(game.user1.socket).emit('output', game.processInput(payload));
        }
        else{
          break;
        }
      case game.user2.socket:
      if(game.user2.turn === true && game.processInput(payload) === true){
        game.runGame(payload, game.user2.val);
        io.emit('clear', '');
        printBoard(game.gameGrid.Board);
        game.moves.push(payload);
        game.user1.turn = true;
        game.user2.turn = false;
        if (isEndGame(game.gameGrid.Board) === false){
          sendPrompt();
        }
        else{
          game.user1.turn = false;
          io.emit('output', 'Please press "/exit" to quit the game.')
        }
        break;
        } else if(game.user2.turn === true){
          io.to(game.user2.socket).emit('output', game.processInput(payload));
        }
        else{
          break;
        }
      }
    });
    
    socket.on('close', (socket) => {
    console.log('Goodbye, ', socket.id);
    users.shift();
  });
  // Prints the message to each player prompting for a move or waiting for next turn.
  function sendPrompt(){
    if(game.user1.turn === true){
      io.to(game.user1.socket).emit('output', 'You are Xs. Please select a number on the board');
      io.to(game.user2.socket).emit('output', 'Waiting for opponent...');
    } else {
      io.to(game.user1.socket).emit('output', 'Waiting for opponent...');
      io.to(game.user2.socket).emit('output', 'You are Os. Please select a number on the board');
    }
  }
  //Prints loops thru the board array and prints the values to the client
  function printBoard(board) {
    for (let i = 0; i < board.length; i++) {
      io.emit('output', "|" + board[i][0] + "|" + board[i][1] + "|" + board[i][2] + "|");
    }
  };
  // Runs the two game state checkers as one function
  function isEndGame(board){
    if(game.winChecker(board) !== false){
      io.emit('output', game.winChecker(board));
    }
    else if(game.tieChecker(board)===true){
      io.emit('output', 'Looks like we have a tie game, No winners.');
    }
    else{
      return ('output', game.winChecker(board));
    }
  };
  
});

module.exports = {
  app, // Express app
  server, // Integrated Express/Socket.io server
  start: port =>
    server.listen(port, err => {
      if (err) {
        console.error('There was an error starting the server...');
      } else {
        console.log(`You are connected to the Express server on port ${port}...`);
        console.log(`Socket.io server up and running!`);
      }
    }),
};

