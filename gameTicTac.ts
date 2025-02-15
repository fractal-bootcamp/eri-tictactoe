
// define types
export type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Cell = 'x' | 'o' | '' | null;
export type Player = 'x' | 'o';
export type GameState = {
    cells: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell],
    currentPlayer: Player,
    winner: Player | "tie" | null,
    message: string | null
};

//define starting point of the screen or BOARD
export const initialGameState: GameState = {
    cells: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'x',
    winner: null,
    message: null,
};

//define the function to check if a game is won
const calculateWin = (cells: GameState['cells']) => {
    //define the winning patterns to end the game
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < winningPatterns.length; i++) {
        const [a, b, c] = winningPatterns[i];
        //checks if position A has a value, then if the second & third values are a match to the first
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a]
        }
    }
    //if no one wins return continue game    
    return null
};


//how does a player make a move ? have to define relationship between position and player into cells(Gamestate) as new GameState
export function makeMove(position: Position, game: GameState): GameState {
    //check if move is valid
    if (game.cells[position] !== '') {
        return game;
    }
    //game is player plus current cells so updating to new cells would = game.cells
    const newCells = structuredClone(game.cells) as GameState["cells"];
    //update value at cells[position] with game.current GameState
    newCells[position] = game.currentPlayer;
    // check if winner
    const winner = calculateWin(newCells)
    if (winner) {
        // const winMessage = `${game.currentPlayer} wins!`

        console.log(`${game.currentPlayer} wins!!!`)
        //time delay before restart

        return {
            ...game,
            cells: newCells,
            winner: game.currentPlayer,
            message: `${game.currentPlayer} wins!!!`
        };  //returns a winner message
    }
    if (!newCells.includes(null)) {
        console.log("Tie");
    }

    //otherwise if no winner and after a valid move, we go to next player
    const nextPlayer: Player = game.currentPlayer === "x" ? "o" : "x";

    // return to game state with next player's turn to have fun
    return { cells: newCells, currentPlayer: nextPlayer, winner: null, message: null }

};





export function newGame(): GameState {
    return structuredClone(initialGameState)
}






