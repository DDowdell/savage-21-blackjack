/*-------------- Constants -------------*/
const maxPlayers = 2;
const maxBet = 100;
const minBet = 10;
const cardValues = {
    'Ace': 11,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'Jack': 10,
    'Queen': 10,
    'King': 10
};

/*---------- Variables (state) ---------*/
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let deck = [];
let gameState = 'waiting';
let currentBet = 0;

/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/


/*----------- Event Listeners ----------*/

