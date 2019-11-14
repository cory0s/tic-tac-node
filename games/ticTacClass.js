'use strict';
const chalk = require('chalk');

/**
 * This is a ticTacToe game class
 */
class ticTacToe{
    
    constructor(user1, user2){
        this.user1 = user1;
        this.user2 = user2;
        this.moves = [];
        this.gameGrid;
    }

    /**
     * Instatiates a new instance of grid(), returns it to the server
     *
     * @returns {Array} Returns new game board
     * @memberof ticTacToe
     */
    makeGrid(){
        this.gameGrid = new grid();
        return this.gameGrid.Board;
    };

    /**
     * A helper method that adds game specific properties to the player object
     *
     * @memberof ticTacToe
     */
    initializePlayers(){
        this.user1.val = chalk.red('X');
        this.user1.turn = true;
        this.user1.player = 'user1';
        this.user2.val = chalk.green('O');
        this.user2.turn = false;
        this.user2.player = 'user2';
    }

    /**
     * Executes the change board logic
     *
     * @param {int} input
     * @param {string} value
     * @memberof ticTacToe
     */
    runGame(input, value){        
        this.gameGrid.Change(input, value);
    };
    
    /**
     * Validates the user input, check for integer 1-9 and not already selected.
     *
     * @param {*} input
     * @returns {true} Returns "true" if the input passes all the valid input checks
     * @returns {string} Returns message if input fails a valid input check
     * @memberof ticTacToe
     */
    processInput(input) {

        if((/[\D]/).test(input)){
            return ('You suck at this, please enter a NUMBER.  INTEGER.  NOT LETTER. 1-9.')
        }
        if (input < 0 || input > 9) {
            return ('You suck at this, please enter a number between 1 - 9');
        }
        if (this.moves.includes(input)) {
            return ('You suck at this, please select an OPEN space with a number');
        }        
        return true;
    };

    
    /**
     * Checks the board for win scenarios.
     *
     * @param {array} board
     * @returns {false} Returns "false" when no win condition is met
     * @returns {string} Returns win message if a win condition is met
     * @memberof ticTacToe
     */
    winChecker(board) {
        let players = [chalk.red('X'), chalk.green('O')];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < players.length; j++) {
                let check = players[j];
                //horizontals
                if (board[i][0] === check && board[i][1] === check && board[i][2] === check) {                    
                    return 'Congrats ' + check + '! We have a winner!';
                }
                //verticals
                if (board[0][i] === check && board[1][i] === check && board[2][i] === check) {
                    return 'Congrats ' + check + '! We have a winner!';
                }
                //upper left to lower right diagonals
                if (board[0][0] === check && board[1][1] === check && board[2][2] === check) {
                    return 'Congrats ' + check + '! We have a winner!';
                }
                //lower left to upper right diagonals
                if (board[0][2] === check && board[1][1] === check && board[2][0] === check) {
                    return 'Congrats ' + check + '! We have a winner!';
                }
            }
        }
        return false;
    };

    //checks the board for a tie scenario. returns bool
    /**
     *
     *
     * @param {array} board
     * @returns Boolean to determine game state
     * @memberof ticTacToe
     */
    tieChecker(board){
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if ((/^[1-9]/).test(board[i][j])) {
                    return false
                }
            }
        }
        return true;
    };
};
    
/**
 * This is a helper class that gets used by the game, this handles the move logic
 */
class grid {
    constructor(){
        this.Board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    }
    /**
     *
     *
     * @param {int} num
     * @param {string} val
     * @memberof grid
     */
    Change(num, val) {        
        for (let i = 0; i < this.Board.length; i++) {
            for (let j = 0; j < this.Board[0].length; j++) {                
                if (this.Board[i][j] == num) {
                    this.Board[i][j] = val;
                }
            }
        }
    }
};


module.exports = ticTacToe;