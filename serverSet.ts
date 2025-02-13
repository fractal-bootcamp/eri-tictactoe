import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import { initialGameState, cardSelect, Set, Player } from './gameSet';
// import { connectToLobby, createLobby, GameId, lobbies } from './lobby';

// Create HTTP server to attach socket.io

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// app.get('/', (req, res) => {
//     res.send('Hello, World!!!')
// });


const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

var game = initialGameState

//ws://localhost:3000/
//http://localhost:3000/

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true, //cookies
    },
});

io.on('connection', (socket) => {

    // send current gameState to connected player
    socket.emit('gameUpdate', game);

    //
    socket.on('submitSet', (data: { player: Player, selectedCards: Set }) => {
        // verify that this player is actually valid for that GameId
        // get the game they are in from their socket.id
        game = cardSelect(game, data.player, data.selectedCards);

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


