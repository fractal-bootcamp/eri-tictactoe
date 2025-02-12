//type definitions
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
type Player = 'P1' | 'P2';
type Field = [Card, Card, Card, Card, Card, Card, Card, Card, Card];
type Score = [Player[], Player[]]
type GameState = {
    field: Field,
    players: [Player, Player],
    score: [number, number]
};

const theDeck: Card[] = [];

const cardNumber: HowMany[] = ['1', '2', '3'];
const cardColor: Color[] = ['R', 'B', 'G'];
const cardShape: Shape[] = ['a', 'b', 'c'];
const cardPattern: Pattern[] = ['x', 'y', 'z'];

for (const howMany of cardNumber) {
    for (const color of cardColor) {
        for (const shape of cardShape) {
            for (const pattern of cardPattern) {
                theDeck.push({ howMany, color, shape, pattern })
            }
        }
    }
};

console.log(theDeck)


//initialGameState === the field

// const initialGameState: GameState = {
//     field: [card, card, card, card, card, card, card, card, card],
//     players: 'P1', 'P2',
//     score: [0, 0],
// }



//function to define a Set win

//define how each player selects cards in a set

//define how Sets are kept by each player

//calculate score

//if too much time passes, add card to the field... or probably easier to shuffle new cards into field