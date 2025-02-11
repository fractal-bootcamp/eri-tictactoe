import { useEffect, useState, useRef, useMemo } from 'react'
import '../game.ts'
import './App.css'
import { GameState, initialGameState, makeMove, Position, newGame } from '../game.ts'
import { io, Socket } from 'socket.io-client';
// import { v4 as uuidv4 } from 'uuid'



// const clientId = uuidv4()

const socket = io('http://localhost:3001')

function App() {
  const [game, setGame] = useState<GameState>(initialGameState);

  //useEffect
  useEffect(() => {
    // socketRef.current = socket;
    //recieving data/current state of the game
    socket.on('gameUpdate', (gameState) => {
      setGame(gameState);
    });
    //closes web socket after player makes move
    return () => {
      socket.off('gameUpdate');
    };

  }, [socket]);


  //handle move
  const handleMove = (position: Position) => {
  //send move to server
    socket.emit('playerMove', position);
  };

  //restart game
  const handleReset = () => {
    socket.emit('newGame');
  };

  //keep track of score (need axios)

  //highlight which player has their move

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen min-w-screen border-pink-400 bg-purple-100'>
          
          <div className="board">
            {game.cells.map((cell, index) => (
              <button
                key={index}
                className="square"
                onClick={() => handleMove(index as Position)}
              >
                {cell}
              </button>
            ))}
          </div>
          <div>
            <button 
              onClick={handleReset} 
              className="text-3xl font-bold text-lime-400 bg-gray-500 border border-pink-400 inline-block px-10 py-2 rounded-2xl hover:bg-gray-800 hover:border transition-colors duration-800 font-stretch-extra-expanded"
              > 
              New Game 
            </button>
          </div>
        
        </div>
          
        </>
  )
} 

export default App;

