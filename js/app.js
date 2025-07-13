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
    displayMessage.style.opacity = 1;
    displayMessage.style.animation = 'slideIn 0.5s forwards';

    setTimeout(() => {
        displayMessage.style.animation = 'slideOut 0.9s forwards';
        setTimeout(() => displayMessage.style.opacity = 0, 500); // Hide after animation
    }, 3000);
};

const init = () => {
    currentBet = Number(placeBet.value);

    if (currentBet >= minBet && currentBet <= maxBet) {
        newGame();
        createDeck();
        shuffleDeck();
        dealCards();
        updateScores();
        showHands();
    } else {
        console.log("Invalid Bet");
        showMessage("Invalid Bet");
    }
};

const newGame = () => {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    deck = [];
};

const createDeck = () => {
    const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    for (const suit of suits) {
        for (const value of cardValues) {
            let card = `${value[0]} of ${suit}`;
            deck.push(card);
        }
    }
};

const shuffleDeck = () => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck; // shuffled deck
};

const updateScores = () => {
    playerScore = countCards(playerHand);
    dealerScore = countCards(dealerHand);
};

const dealCards = () => {
    for (let i = 0; i < 2; i++) {
        playerHand.push(deck.pop());
        dealerHand.push(deck.pop());
    }
    updateScores();
    showHands();

    if (playerScore === 21) { // Check after dealing
        showMessage("You have BlackJack!");
    } else if (dealerScore === 21) {
        showMessage("Dealer has BlackJack!")
        return dealerTurn();
    }
};

const showHands = () => {
    playerScoreEl.textContent = `Player Hand: ${playerHand.join(", ")} - Total: ${playerScore}`;
    dealerScoreEl.textContent = `Dealer Hand: ${dealerHand.join(", ")} - Total: ${dealerScore}`;
};

const getCardValue = (cardName) => {
    for (let card of cardValues) {
        if (card[0] === cardName) {
            return card[1];
        }
    }
    return 0; //if card is not found
};

const countCards = (hand) => {
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
};

const playerTurn = () => {
    if (playerScore < 21) {
        playerHand.push(deck.pop());
        updateScores();
        showHands();

        if (playerScore > 21) {
            console.log("Player Busts!");
            showMessage("Busted!");
        } else if (playerScore === 21) {
            console.log("BlackJack!!!");
            showMessage("BlackJack!");
            dealerTurn();
        } else {
            showMessage("Hit!?");
        }
    }
};

const dealerTurn = () => {
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        updateScores();
    }
    showHands();
    checkWinner();
};

const checkWinner = () => {
    if (playerScore > 21) {
        showMessage("Busted! Dealer Wins!");
    } else if (dealerScore > 21) {
        showMessage("Busted! Player Wins!");
    } else if (playerScore === 21 && dealerScore === 21) {
        showMessage("Both have BlackJack! It's a tie!");
    } else if (playerScore === 21) {
        showMessage("You Win with BlackJack!");
    } else if (dealerScore === 21) {
        showMessage("Dealer Wins with BlackJack!");
    } else if (playerScore > dealerScore) {
        showMessage("You Win!");
    } else if (playerScore === dealerScore) {
        showMessage("It's Even!");
    } else {
        showMessage("Dealer Wins!");
    }
};

/*----------- Event Listeners ----------*/

startButton.addEventListener('click', init);
hitButton.addEventListener('click', playerTurn);
leaveTable.addEventListener('click', dealerTurn);