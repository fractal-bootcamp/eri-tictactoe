import { useEffect, useState, useRef, useMemo } from 'react'
import '../gameTicTac.ts'
import './App.css'
import { GameState, initialGameState, cardSelect, Card, Set as CardSet, Player } from '../gameSet.ts'
import { io } from 'socket.io-client';

// import { v4 as uuidv4 } from 'uuid'
// const clientId = uuidv4()


const socket = io('http://localhost:3001')

function App() {

  //gameState
  const [game, setGame] = useState<GameState>(initialGameState);

  //selectedCardState
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  //scoreState
  const [score, setScore] = //...........................................................

  const player: Player = 'P1' //needs uuid function?  

  //UseEffect for communicating selected cards over web sockets
  useEffect(() => {
    socket.on('gameUpdate', (gameState: GameState) => {
      setGame(gameState);
    });
    setSelectedCards([]);

    //closes web socket to refresh with gameUpdate
    return () => {
      socket.off('gameUpdate');
    };
  }, [socket]);


  //handle selecting cards
  const handleCardSelect = (card: Card) => {
    let newSelection = [...selectedCards];

    newSelection.push(card);

    setSelectedCards(newSelection)

    //send selection to server
    socket.emit('playerMove', position);
  };


  //restart game
  const handleReset = () => {
    socket.emit('newGame');
  };





  return (
    <>


      <div className='flex flex-col items-center justify-center min-h-screen min-w-screen border-pink-400 bg-purple-100'>

        <div className="board">
          {game.field.map((card, index) => (
            <button
              key={index}
              className="square"
              onClick={() => handleCardSelect(index as Position)}
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

