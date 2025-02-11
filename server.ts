import express  from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import { initialGameState, makeMove, Position } from './game';

// Create HTTP server to attach socket.io

const app = express();
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

app.get('/', (req, res) => {
    res.send('Hello, World!!!')
});      


const httpServer = createServer(app);
const PORT = 3001

var game = initialGameState


const io = new Server(httpServer, { 
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true, //cookies
    },
 });

io.on('connection', (socket) => {
    // socket.emit("gameUpdate", "hello")
    socket.on('playerMove', (data: Position) => {
        game = makeMove(data, game)
        io.emit('gameUpdate', game);
    });

    socket.on('newGame', () => {
        game = initialGameState
        io.emit('gameUpdate', game);
    });

    socket.on('disconnect', () => {
        console.log('Player Disconnected:', socket.id);
    })
})

httpServer.listen(PORT, () => {
    console.log(`🦊 Backend is running on http://localhost:${PORT}`)
})


