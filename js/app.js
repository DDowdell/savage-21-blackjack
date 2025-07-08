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
const playerScoreEl = document.querySelector(".player-score");
const dealerScoreEl = document.querySelector(".dealer-score");
const placeBet = document.querySelector(".place-bet");
const startButton = document.querySelector(".start-button")

/*-------------- Functions -------------*/
function startGame() {

}

function shuffleDeck() { 
    let cards = [];
    for(let value of cardValues) {
        cards.push(value);
    }
    //Fisher-Yates shuffle algorithm info sourced from google search
    for(let i = cards.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return deck; // shuffled deck
}

/*----------- Event Listeners ----------*/
function init() {
    startButton.addEventListener("click", )
}
