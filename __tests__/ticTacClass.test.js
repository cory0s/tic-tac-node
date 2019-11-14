'use strict';

const ttt = require('../games/ticTacClass.js');
const chalk = require('chalk');

let player1 = {
  socket: 'Aaron',
  turn: false,
  val: false,
};

let player2 = {
  socket: 'Jon',
  turn: false,
  val: false,
};

const game = new ttt(player1, player2);

describe('makeGrid Method', () => {
  
  it('makes a grid using', () => {
    expect(game.makeGrid()).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });
})

describe('initialize Method', () => {

  it('will initiliaze players correctly using initialize method', () => {
    game.initializePlayers();
    expect(player1.val).toEqual(chalk.red('X'));
    expect(player1.turn).toEqual(true);
    expect(player2.val).toEqual(chalk.green('O'));
    expect(player2.turn).toEqual(false);
  });

})

describe('processInput Method', () => {

  it('will reject non-integer input using processInput method', () => {
    expect(game.processInput('a')).toEqual('You suck at this, please enter a NUMBER.  INTEGER.  NOT LETTER. 1-9.');
  });

  it('will reject input outside of parameters using processInput method', () => {
    expect(game.processInput('10')).toEqual('You suck at this, please enter a number between 1 - 9');
  });

  it('will reject repeat inputs using processInput method', () => {
    game.moves.push('2');
    expect(game.processInput('2')).toEqual('You suck at this, please select an OPEN space with a number');
  });

  it('will accept proper input using processInput method', () => {
    expect(game.processInput('1')).toEqual(true);
  });

})

describe('winChecker Method', () => {

  it('will check for horizontal win using winChecker method', () => {
    game.Board = [[chalk.red('X'), chalk.red('X'), chalk.red('X')], [4, 5, 6], [7, 8, 9]];
    expect(game.winChecker(game.Board)).toEqual('Congrats ' + chalk.red('X') + '! We have a winner!');
  });

  it('will check for vertical win using winChecker method', () => {
    game.Board = [[chalk.red('X'), 2, 3], [chalk.red('X'), 5, 6], [chalk.red('X'), 8, 9]];
    expect(game.winChecker(game.Board)).toEqual('Congrats ' + chalk.red('X') + '! We have a winner!');
  });

  it('will check for upper left to lower right win using winChecker method', () => {
    game.Board = [[chalk.red('X'), 2, 3], [4, chalk.red('X'), 6], [7, 8, chalk.red('X')]];
    expect(game.winChecker(game.Board)).toEqual('Congrats ' + chalk.red('X') + '! We have a winner!');
  });

  it('will check for lower left to upper right win using winChecker method', () => {
    game.Board = [[1, 2, chalk.red('X')], [4, chalk.red('X'), 6], [chalk.red('X'), 8, 9]];
    expect(game.winChecker(game.Board)).toEqual('Congrats ' + chalk.red('X') + '! We have a winner!');
  });

  it('will check for X win using winChecker method', () => {
    game.Board = [[chalk.red('X'), chalk.red('X'), chalk.red('X')], [4, 5, 6], [7, 8, 9]];
    expect(game.winChecker(game.Board)).toEqual('Congrats ' + chalk.red('X') + '! We have a winner!');
  });

  it('will check for O win using winChecker method', () => {
    game.Board = [[1, 2, chalk.green('O')], [2, 5, chalk.green('O')], [7, 8, chalk.green('O')]];
    expect(game.winChecker(game.Board)).toEqual('Congrats ' + chalk.green('O') + '! We have a winner!');
  });

  it('will return false if no win using winChecker method', () => {
    game.Board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(game.winChecker(game.Board)).toEqual(false);
  });


})

describe('tieChecker Method', () => {

  it('will return true if board is full using tieChecker method', () => {
    game.Board = [[chalk.red('X'),chalk.green('O'),chalk.red('X')],[chalk.red('X'),chalk.green('O'),chalk.red('X')],[chalk.red('X'),chalk.green('O'),chalk.red('X')]];
    expect(game.tieChecker(game.Board)).toEqual(true);
  });

  it('will return false if board is not full using tieChecker method', () => {
    game.Board = [['1', chalk.red('X'), chalk.green('O')], [chalk.red('X'), chalk.red('X'), chalk.green('O')], [chalk.green('O'), chalk.green('O'), chalk.red('X')]];
    expect(game.tieChecker(game.Board)).toEqual(false);
  });

})

describe('Game Grid Change method', () => {

  it('will change game grid using grid class\' change method', () => {
    game.gameGrid.Change(1, chalk.red('X'));
    expect(game.gameGrid.Board[0][0]).toEqual(chalk.red('X'));
  });

  it('will change game grid using grid class\' change method', () => {
    game.gameGrid.Change(1, chalk.red('X'));
    expect(game.gameGrid.Board[0][0]).toEqual(chalk.red('X'));
  });

});

