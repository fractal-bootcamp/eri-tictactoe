import { useState } from 'react'
import './game.tsx'
import './App.css'
import { GameState, initialGameState, makeMove, Position, newGame } from './game.tsx'

function App() {
  const [game, setGame] = useState<GameState>(initialGameState)


  //handle move
  const handleMove = (position: Position) => {
    setGame(makeMove(position, game))
  }

  //restart game
  const handleReset = () => {
    setGame(newGame())
  }



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

export default App
