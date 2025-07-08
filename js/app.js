/*-------------- Constants -------------*/
const maxPlayers = 2;
const maxBet = 100;
const minBet = 10;
const cardValues = [
    ["Ace", 11],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["10", 10],
    ["Jack", 10],
    ["Queen", 10],
    ["King", 10]
];

/*---------- Variables (state) ---------*/
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let deck = [];
let cards = [];
let gameState = 'waiting';
let currentBet = 0;

/*----- Cached Element References  -----*/
const playerScoreEl = document.querySelector(".player-score");
const dealerScoreEl = document.querySelector(".dealer-score");
const placeBet = document.querySelector(".place-bet");
const startButton = document.querySelector(".start-button")

/*-------------- Functions -------------*/
function startGame() {
    const deck = shuffleDeck();
}

function shuffleDeck() {
    for (let value of cardValues) {
        cards.push(value);
    }
    //Fisher-Yates shuffle algorithm info sourced from google search
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards; // shuffled deck
}
// shuffleDeck()
console.log(cards)


playerHand.push(deck.pop(), deck.pop());
dealerHand.push(deck.pop(), deck.pop());
//dealing two cards each
console.log("Player's Hand:", playerHand);
console.log("Dealer's Hand:", dealerHand[0]) //with one card hidden


function getCardValue(cardName) {
    for (let card of cardValues) {
        if (card[0] === cardName) {
            return card[1];
        }
    }
    return 0; //if card is not found
}


function countCards(hand) { //counting the total value of each hand
    let total = 0;
    let aceCount = 0;

    for (let card of hand) {
        if (card) {
            const cardName = card.split(" ")[0];
            total += getCardValue(cardName);
            if (cardName === "Ace") {
                aceCount++;
            }
        }
    }
    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount--;
    }
    return total;
}


const playerCards = countCards(playerHand);
const dealerCards = countCards(dealerHand);
//counting and diplaying cards
console.log("Player's Cards:", playerCards);
console.log("Dealer's Cards", dealerCards);

startGame()

/*----------- Event Listeners ----------*/
function init() {
    startButton.addEventListener("click",)
}
