//type definitions

import { stringify } from "node:querystring";

type HowMany = '1' | '2' | '3';
type Color = 'R' | 'B' | 'G';
type Shape = 'a' | 'b' | 'c';
type Pattern = 'x' | 'y' | 'z';
type Card = {
    howMany: HowMany,
    color: Color,
    shape: Shape,
    pattern: Pattern,
};
type Selection = number[]
type Set = [Card, Card, Card];
type Player = 'P1' | 'P2';
type Field = Card[];
type Score = [Player[], Player[]];
type GameState = {
    field: Field,
    players: [Player, Player],
    score: [number, number],
    selected: Selection
};


//defining the deck of 81 cards

const theDeck: Card[] = [];

const cardNumber: HowMany[] = ['1', '2', '3'];
const cardColor: Color[] = ['R', 'B', 'G'];
const cardShape: Shape[] = ['a', 'b', 'c'];
const cardPattern: Pattern[] = ['x', 'y', 'z'];


for (const howMany of cardNumber) {
    for (const color of cardColor) {
        for (const shape of cardShape) {
            for (const pattern of cardPattern) {
                theDeck.push({ howMany, color, shape, pattern });
            }
        }
    }
};

//console.log(🌱 theDeck)


//draw single random card from deck to use in populateField function

function randomCard(theDeck: Card[]): Card | undefined {
    if (theDeck.length > 0) {
        const randomIndex = Math.floor(Math.random() * theDeck.length);
        return theDeck.splice(randomIndex, 1)[0];
    }
    return undefined;
}


//draw card 9 times to populate the field
//keep count of deck length

function populateField(theDeck: Card[]): Field {
    const field: Field = [];
    for (let i = 0; i < 9; i++) {
        const card = randomCard(theDeck);
        if (card) {
            field.push(card);
        } else {
            //no more cards
            break;
        }
    }
    return field;
}


//initialGameState

const initialGameState: GameState = {
    field: populateField(theDeck),
    players: ['P1', 'P2'],
    score: [0, 0],
    selected: [0]
}


//what defines a winning set?
// They all have the same number or have three different numbers.
// They all have the same shape or have three different shapes.
// They all have the same shading or have three different shadings.
// They all have the same color or have three different colors.

const winningSet = ([c1, c2, c3]: [Card, Card, Card]): boolean => {
    const cardProps: (keyof Card)[] = ['howMany', 'color', 'shape', 'pattern'];

    for (const prop of cardProps) {
        if (!(
            (c1[prop] === c2[prop] && c2[prop] === c3[prop]) ||
            (c1[prop] !== c2[prop] && c2[prop] !== c3[prop] && c1[prop] !== c3[prop])
        )) {
            return false;
        }
    }
    return true;
}



//define how each player selects cards in a set

function cardSelect(gameState: GameState, player: Player, set: Set) {

    if (winningSet(set)) {
        console.log("Valid set!");

        const playerScore = gameState.players.indexOf(player);
        gameState.score[playerScore] += 3;

        for (const card of set) {
            const fieldIndex = gameState.field.indexOf(card);
            if (fieldIndex !== -1) {
                gameState.field.splice(fieldIndex, 1);
            }

        }

        while (gameState.field.length < 9 && theDeck.length > 0) {
            const newCard = randomCard(theDeck);
            if (newCard) {
                gameState.field.push(newCard);
            }
        }
    } else {
        console.log("Invalid set. Selections cleared.")
    }
    return gameState;
}






//if too much time passes, swap out cards in field for new / repopulate/new field button ==> diff from newGame

//reset game = back to initialGamestate

