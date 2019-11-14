'use strict'
let socket = {id:null} 
let game = {
  user1: {turn:null, socket: 1},
  user2: {turn:null, socket: 2},
  moves: [],
  processOutput:null,
  processInput : function(input){
    return this.processOutput;
  },
  endgame: null
}


let endgame=null;

const isEndGame = (input) => {
  return input  
}



let onInput = (payload) => {
    //The bulk of the game logic.  Listens for input from a socket, decides what to do with it.
    switch(socket.id){
      case game.user1.socket:
        if(game.user1.turn === true && game.processInput(payload) === true){
          game.moves.push(payload);
          game.user1.turn = false;
          game.user2.turn = true;
          if (isEndGame(game.endgame) === false) {
            return 'playing'
          }
          else {
            game.user2.turn = false;
            return 'end'
          }
          break;
        } else if(game.user1.turn === true){
          return payload
        }
        else{
          return 'breaking'
        }
      case game.user2.socket:
        if(game.user2.turn === true && game.processInput(payload) === true){
          game.moves.push(payload);
          game.user1.turn = true;
          game.user2.turn = false;
          if (isEndGame(game.endgame) === false){
            return 'playing'
          }
          else{
            game.user1.turn = false;
            return 'end'
          }
          break;
          } else if(game.user2.turn === true){
            return payload
          }
          else{
            return 'breaking';
          }
        }
  
}

module.exports = {
  onInput,
  socket,
  isEndGame,
  game,

}