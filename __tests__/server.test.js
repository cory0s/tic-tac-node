'use strict';

let {socket, onInput, game, isEndGame} = require('../mocks/servermock.js');



describe('On input mock tests', () => {
 
  it('testing environment: SOCKET.ID is game.user1.socket, USER1.TURN is false, USER2.TURN is true, GAME.PROCESSOUTPUT is false, ENDGAME is false', () =>{
    socket.id = 1;
    game.user1.turn = false;
    game.user2.turn = true;
    game.processOutput = false;
    game.endgame = false
    expect(onInput('stuff')).toEqual('breaking');
    expect(game.user1.turn).toEqual(false)
    expect(game.user2.turn).toEqual(true)
    expect(game.moves).toEqual([]);
  })


  it('testing environment: SOCKET.ID is game.user1.socket, USER1.TURN is true, USER2.TURN is false, GAME.PROCESSOUTPUT is true, ENDGAME is false', () =>{
    socket.id = 1;
    game.user1.turn = true;
    game.user2.turn = false;
    game.processOutput = true;
    game.endgame = false;
    expect(onInput('stuff')).toEqual('playing');
    expect(game.user1.turn).toEqual(false)
    expect(game.user2.turn).toEqual(true)
    expect(game.moves).toEqual(['stuff']);
  })



  it('testing environment: SOCKET.ID is game.user1.socket, USER1.TURN is true, USER2.TURN is false, GAME.PROCESSOUTPUT is true, ENDGAME is true', () =>{
    socket.id = 1;
    game.user1.turn = true;
    game.user2.turn = false;
    game.processOutput = true;
    game.endgame = true
    expect(onInput('stuff')).toEqual('end');
    expect(game.user1.turn).toEqual(false)
    expect(game.user2.turn).toEqual(false)
    expect(game.moves).toEqual(['stuff','stuff']);
  })

  
  it('testing environment: SOCKET.ID is game.user1.socket, USER1.TURN is true, USER2.TURN is flase, GAME.PROCESSOUTPUT is false, ENDGAME is false', () =>{
    socket.id = 1;
    game.user1.turn = true;
    game.user2.turn = false;
    game.processOutput = false;
    game.endgame = false
    expect(onInput('stuff')).toEqual('stuff');
    expect(game.user1.turn).toEqual(true)
    expect(game.user2.turn).toEqual(false)
    expect(game.moves).toEqual(['stuff','stuff']);
  })




  it('testing environment: SOCKET.ID is game.user2.socket, USER1.TURN is true, USER2.TURN is false, GAME.PROCESSOUTPUT is false, ENDGAME is false', () =>{
    socket.id = 2;
    game.user1.turn = true;
    game.user2.turn = false;
    game.processOutput = false;
    game.endgame = false
    expect(onInput('things')).toEqual('breaking');
    expect(game.user1.turn).toEqual(true)
    expect(game.user2.turn).toEqual(false)
    expect(game.moves).toEqual(['stuff','stuff']);
  })


  it('testing environment: SOCKET.ID is game.user2.socket, USER1.TURN is false, USER2.TURN is true, GAME.PROCESSOUTPUT is true, ENDGAME is false', () =>{
    socket.id = 2;
    game.user1.turn = false;
    game.user2.turn = true;
    game.processOutput = true;
    game.endgame = false;
    expect(onInput('things')).toEqual('playing');
    expect(game.user1.turn).toEqual(true)
    expect(game.user2.turn).toEqual(false)
    expect(game.moves).toEqual(['stuff', 'stuff', 'things']);
  })



  it('testing environment: SOCKET.ID is game.user2.socket, USER1.TURN is false, USER2.TURN is true, GAME.PROCESSOUTPUT is true, ENDGAME is true', () =>{
    socket.id = 2;
    game.user1.turn = false;
    game.user2.turn = true;
    game.processOutput = true;
    game.endgame = true;
    expect(onInput('things')).toEqual('end');
    expect(game.user1.turn).toEqual(false)
    expect(game.user2.turn).toEqual(false)
    expect(game.moves).toEqual(['stuff','stuff','things','things']);
  })

  
  it('testing environment: SOCKET.ID is game.user2.socket, USER1.TURN is false, USER2.TURN is true, GAME.PROCESSOUTPUT is false, ENDGAME is false', () =>{
    socket.id = 2;
    game.user1.turn = false;
    game.user2.turn = true;
    game.processOutput = false;
    game.endgame = false;
    expect(onInput('things')).toEqual('things');
    expect(game.user1.turn).toEqual(false)
    expect(game.user2.turn).toEqual(true)
    expect(game.moves).toEqual(['stuff','stuff','things','things']);
  })

})