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
const playerScoreEl = document.querySelector(".player-score");
const dealerScoreEl = document.querySelector(".dealer-score");
const placeBet = document.querySelector(".place-bet-input");
const startButton = document.querySelector(".start-button");
const hitButton = document.querySelector(".hit-button");
const leaveTable = document.querySelector(".leave-table");

/*-------------- Functions -------------*/

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
    }
    // console.log("Dealer has", playerHand.value);
    // console.log("Player has", dealerHand.value);
};


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
            let card = `${value[0]} of ${suit}}`;
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



function dealCards() {
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    //dealing two cards each
    playerScore = countCards(playerHand);
    dealerScore = countCards(dealerHand);
}
dealCards();
console.log("Player's Hand:", playerHand);
console.log("Dealer's Hand:", dealerHand);

// console.log("Dealer's hand with last card hidden:", dealerHand[0]);


function showHands() { //corrected code using `` instead of + with help from google/AI and .join from MDN
    playerScoreEl.textContent = `Player Hand: ${playerHand.join(", ")} - Value: ${playerScore}`;
    dealerScoreEl.textContent = `Dealer Hand: ${dealerHand.join(", ")} - Value: ${dealerScore}`;
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

// countCards();
// console.log();


const playerCards = countCards(playerHand);
const dealerCards = countCards(dealerHand);
//counting and diplaying cards
console.log("Player's Cards:", playerCards);
console.log("Dealer's Cards", dealerCards);


//     PlayerTurn
//         REPEAT
//             IF player chooses to hit
//                 (playerHand ADD (DealCard deck)
//                 (DisplayHand updated playerHand)
//                 IF playerHand (CalculateScore > 21)
//                     LOG (player "busts!")
//                     (RETURN False)
               
//         UNTIL player chooses to leave table
//         (RETURN True)
    
  

//   DealerTurn
//         REPEAT
//             (dealerHand ADD (DealCard deck)
//         UNTIL dealerHand (CalculateScore >= 17)
//         DisplayHand (updated dealerHand)
    

//     DetermineWinner (playerScore vs dealerScore)
//         IF (playerScore > 21)
//             (RETURN "Dealer wins!")
        
//         ELSE IF (or (dealerScore > 21) OR (playerScore >= dealerScore)
//             (RETURN "Player wins!")
        
//         ELSE IF (playerScore < dealerScore)
//             (RETURN "Dealer wins!")
        


/*----------- Event Listeners ----------*/

startButton.addEventListener(
    'click', init
)

newGame();

init()

//=======TempGraveYard=======================

// const handleClick = () => {}

// const render = () => {}

//=======References========================

// https://generalassembly.instructure.com/courses/821/pages/card-game-starter?module_item_id=75327
// https://www.google.com/search?q=why+wont+my+init+function+reset+my+game+state&rlz=1C5LTRN_enUS1157US1167&sourceid=chrome&ie=UTF-8
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
//Fisher-Yates shuffle algorithm info sourced from google search
