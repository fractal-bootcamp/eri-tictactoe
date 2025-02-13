import { useEffect, useState } from 'react'
import '../gameSet.ts'
import './App.css'
import { GameState, initialGameState, Card, } from '../gameSet.ts'
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
  // const [score, setScore] = //...........................................................

  // const player: Player = 'P1' //needs uuid function?  

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
    socket.emit('playerMove', newSelection);
  };


  //restart game
  // const handleReset = () => {
  //   socket.emit('newGame');
  // };





  return (



    <div className='flex flex-col items-center justify-center min-h-screen min-w-screen border-pink-400 bg-purple-100'>
      <p className='text-xl font-bold mb-4'>Game Board</p>

      <div className='grid grid-cols-3 gap-4'>
        {game.field.map((card, index) => (
          <div
            key={index}
            className='w-48 h-32 border border-gray-300 rounded shadow hover:shadow-lg cursor-pointer flex items-center justify-center'
            onClick={() => handleCardSelect(card)}
          >
            <p className='text-center'>
              {card.howMany}<br />
              {card.color}<br />
              {card.shape}<br />
              {card.pattern}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}






export default App
