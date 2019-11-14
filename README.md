# TicTacToe JS

#### An obnoxiously complicated Tic Tac Toe Game for two players.

##### Highly Topical Tenatious People: Gregory (Azure-Wizard) Dukes, Jon (Not-As-Bald-As-John-But-Still-Awesome) Gentry, Cory (Hip-Socket.IO) Henderson, Aaron (Dungeon-Master) Ferris

# Getting Started
## 1.	Installation process
    - Download the npm package for our web client here: (URL)
    - Run the client - this connects to our server and initializes the game
## 2.	Software dependencies
    - socket.io: runs socket connections to server
    - socket.io-client: sets up clients for web socket server
    - express: runs the socket.io server
    - readline: enables CLI input for the game
    - jest: runs the test suite
    - chalk: adds color to the game
## 3.	Latest releases
    - Version 1.0.0
## 4.	API references
    - No API's were used for this application.

# Build and Test
The code consists primarily of three parts:

## - The server (server.js)
The server which runs using socket.io will detect and maintain client connections. It also assists in running the game logic for our chosen module. Upon input from the client, the server utilizes event driven logic to deliver data to the game module which updates game state. Once state has been changed, the server will emit the new state back to the client and turns continue in this fashion.

## - The client (client.js)
The client listens for event emitted from the server. It is interested in server 'output' and 'clear' events which are then logged to the user's console.

## - Game module (ticTacClass.js)
The game module contains all logic for the game. It is a unique class with built in methods to control the state of the board. The server instantiates a new instance of the game module once playes have connected. Methods of the game module are utilized by the server to control game flow and actions.

# Contribute
If you want to contribute, build more simple console line games and set them up according to our template!

Build stuff and make it awesome!



- [Visual Studio Code](https://github.com/Microsoft/vscode)