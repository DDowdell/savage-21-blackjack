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

// console.log(maxBet);
// console.log(minBet);

/*---------- Variables (state) ---------*/
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let deck = [];
// let gameState = 'waiting';
let currentBet = 0;

/*----- Cached Element References  -----*/
const playerScoreEl = document.querySelector("#player-score");
const dealerScoreEl = document.querySelector("#dealer-score");
const playerHandEl = document.querySelector("#player-hand");
const dealerHandEl = document.querySelector("#dealer-hand");
const placeBet = document.querySelector(".place-bet-input");
const startButton = document.querySelector(".start-button");
const hitButton = document.querySelector(".hit-button");
const leaveTable = document.querySelector(".leave-table");
const displayMessage = document.querySelector(".display-message");

/*-------------- Functions -------------*/

const showMessage = (message) => {
    displayMessage.textContent = message;
    displayMessage.style.animation = 'slideIn 0.5s forwards';
    displayMessage.classList.remove('slideOut');
    
    setTimeout(() => {
        displayMessage.style.animation = 'slideOut 0.5 forwards';
    }, 3000);
}

function init() {
    let currentBet = Number(placeBet.value);

    // console.log(placeBet.value);

    if (currentBet >= minBet && currentBet <= maxBet) {
        newGame();
        createDeck();
        shuffleDeck();
        dealCards();
        showHands();
    } else {
        return console.log("Invalid Bet");
        showMessage("Invalid Bet");
    }

    if (playerScore < 21 && playerScore > dealerScore) {
        console.log("Player Wins!");
    }
    // console.log("Dealer has", playerHand.value);
    // console.log("Player has", dealerHand.value);
};

init();

const newGame = () => {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    deck = [];
}            // resetting game state


function createDeck() {
    const suits = ['spades', 'hearts', 'diamonds', 'clubs']
    for (const suit of suits) {
        for (const value of cardValues) {
            let card = `${value[0]} of ${suit}`;
            deck.push(card);
        }
    }
}

createDeck();
// console.log(deck);


function shuffleDeck() {
    //Fisher-Yates shuffle algorithm info sourced from google search
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck; // shuffled deck
}
shuffleDeck();
// console.log(deck);

const updateScore = () => {
    playerScore = countCards(playerHand);
    dealerScore = countCards(dealerHand);
}

function dealCards() {
    for (let i = 0; i < 2; i++) {
        playerHand.push(deck.pop());
        dealerHand.push(deck.pop());
    }
}
dealCards();
showHands();
updateScore();


// console.log("Player's Hand:", playerHand);
// console.log("Dealer's Hand:", dealerHand);

// console.log("Dealer's hand with last card hidden:", dealerHand[0]);


function showHands() { //corrected code using `` instead of + with help from google/AI and .join from MDN
    playerScoreEl.textContent = `Player Hand: ${playerHand.join(", ")} - Total: ${playerScore}`;
    dealerScoreEl.textContent = `Dealer Hand: ${dealerHand.join(", ")} - Total: ${dealerScore}`;
}

// showHands();
// console.log();


function getCardValue(cardName) {
    for (let card of cardValues) {
        if (card[0] === cardName) {
            return card[1];
        }
    }
    return 0; //if card is not found
}

// getCardValue();
// console.log();

function countCards(hand) { //counting the total value of each hand
    let total = 0;
    let aceCount = 0;

    for (const card of hand) {
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


// countCards();
// console.log();


const playerCards = countCards(playerHand);
const dealerCards = countCards(dealerHand);
//counting and diplaying cards
console.log("Player's Cards:", playerCards);
console.log("Dealer's Cards", dealerCards);

const playerTurn = () => {
    if (playerScore < 21) {
        playerHand.push(deck.pop());
        // playerScore = countCards(playerHand);
        updateScore();
        showHands();

        if (playerScore > 21) {
            console.log("Player Busts!");
            showMessage("Busted!");
        } else if (playerScore === 21) {
            console.log("BlackJack!!!");
            showMessage("BlackJack!");
            dealerTurn();
            // } else if (playerScore < 21 && playerScore > dealerScore) {
            // console.log("Player Wins!");
            // showMessage("Player Wins!");
        } else {
            showMessage("Hit!?");
        }
    }
}

const dealerTurn = () => {
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        // dealerScore = countCards(dealerHand);
        updateScore();
    }
    showHands();
    checkWinner();
}
showHands();

// if (dealerScore > 21) {
// console.log("Dealer Busts!, Player Wins!")
// showMessage("Dealer Busts!, Player Wins!")
// } else if (dealerScore === 21) {
// console.log("Dealer BlackJack!!!")
// showMessage("Dealer BlackJack!!!")
// } else if (dealerScore > playerScore && dealerScore > 18) {
// console.log("Dealer Wins!, Let's Go Again?");
// showMessage("Dealer Wins!, Let's Go Again?");
// }

const checkWinner = () => {
    if (playerScore > 21) {
        showMessage("Busted! Dealer Wins!");
    } else if (dealerScore > 21) {
        showMessage("Busted! Player Wins!");
    } else if (playerScore > dealerScore) {
        showMessage("You Win!");
    } else {
        // showMessage("Its Even!");
    }
}


/*----------- Event Listeners ----------*/

startButton.addEventListener(
    'click', init
);

hitButton.addEventListener(
    'click', playerTurn
);

leaveTable.addEventListener(
    'click', dealerTurn
)
newGame();
init();
checkWinner();

//=======TempGraveYard=======================

// const handleClick = () => {}

// const render = () => {}

//=======References========================

// https://generalassembly.instructure.com/courses/821/pages/card-game-starter?module_item_id=75327
// https://www.google.com/search?q=why+wont+my+init+function+reset+my+game+state&rlz=1C5LTRN_enUS1157US1167&sourceid=chrome&ie=UTF-8
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
//Fisher-Yates shuffle algorithm info sourced from google search