import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import { initialGameState, makeMove, Position } from './gameTicTac';
// import { connectToLobby, createLobby, GameId, lobbies } from './lobby';

// Create HTTP server to attach socket.io

const app = express();
app.use(cors({ origin: ['https://cozy-malasada-607564.netlify.app/', 'http://localhost:5173'], allowedHeaders: ['Content-Type', 'Authorizaion'], credentials: true }));


const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

var game = initialGameState

//ws://localhost:3000/
//http://localhost:3000/

const io = new Server(httpServer, {
    cors: {
        origin: ['https://cozy-malasada-607564.netlify.app/', 'http://localhost:5173'],
        methods: ['GET', 'POST'],
        credentials: true, //cookies
    },
});


io.on('connection', (socket) => {

    // send the available lobbies to anyone who connects to the server
    // io.emit('gameLobby', lobbies)

    // socket.on('connectToGame', (data: GameId) => {
    //     // what game are you trying to connect to??c
    //     const gameId = data
    //     const lobby = lobbies[gameId]
    //     if (!lobby) {
    //         const newLobby = createLobby(gameId)
    //         const connectedLobby = connectToLobby(newLobby, socket.id)
    //         lobbies[gameId] = connectedLobby

    //         io.emit('gameUpdate', connectedLobby.game)
    //     }
    //     // if this socket already connected to a particular game?
    //     // if so, just send them the game update for THAT game.
    //     // if not, what game are they TRYING to connect to?
    //     // does that game exist?

    // })

    socket.on('playerMove', (data: Position) => {
        // verify that this player is actually valid for that GameId
        // get the game they are in from their socket.id
        game = makeMove(data, game)
        io.emit('gameUpdate', game);
    });

    socket.on('newGame', () => {
        game = initialGameState
        io.emit('gameUpdate', game);
    });

    socket.on('disconnect', () => {
        // disconnect them from the lobby
        console.log('Player Disconnected:', socket.id);
    })
})

httpServer.listen(PORT, () => {
    console.log(`🦊 Backend is running on http://localhost:${PORT}`)
})


