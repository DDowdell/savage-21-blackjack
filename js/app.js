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
let playerActive = true;

/*----- Cached Element References  -----*/
const playerScoreEl = document.querySelector("#player-score");
const dealerScoreEl = document.querySelector("#dealer-score");
const playerHandEl = document.querySelector("#player-hand");
const dealerHandEl = document.querySelector("#dealer-hand");
const placeBet = document.querySelector(".place-bet-input");
const hitButton = document.querySelector(".hit-button");
const leaveTable = document.querySelector(".leave-table");
const displayMessage = document.querySelector(".display-message");
const startButton = document.querySelector(".start-button");

/*-------------- Functions -------------*/

const showMessage = (message) => {
    displayMessage.textContent = message;
    displayMessage.style.opacity = 1;
    displayMessage.style.animation = 'slideIn 0.5s forwards';

    setTimeout(() => {
        displayMessage.style.animation = 'slideOut 0.9s forwards';
        setTimeout(() => displayMessage.style.opacity = 0, 500);
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
    currentBet = '';
    playerHandEl.innerHTML = '';
    dealerHandEl.innerHTML = '';
    playerScoreEl.textContent = '0';
    dealerScoreEl.textContent = '0';
    displayMessage.textContent = '';
    playerActive = true;
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
    checkWinner();
};

const showHands = () => {
    playerHandEl.innerHTML = '';
    dealerHandEl.innerHTML = '';

    playerHand.forEach(card => {
        const cardElement = createCardElement(card);
        playerHandEl.appendChild(cardElement);
    });
    playerScoreEl.textContent = `Player Hand: ${playerHand.join(", ")} - Total: ${playerScore}`;

    dealerHand.forEach(card => {
        const cardElement = createCardElement(card);
        dealerHandEl.appendChild(cardElement);
    });
    dealerScoreEl.textContent = `Dealer Hand: ${dealerHand.join(", ")} - Total: ${dealerScore}`;
};

const getCardValue = (cardName) => {
    for (let card of cardValues) {
        if (card[0] === cardName) {
            return card[1];
        }
    }
    return 0;
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
    if (playerActive && playerScore < 21) {
        showMessage("Hit or Stand?");
    }
};

const hit = () => {
    if (playerScore < 21) {
        playerHand.push(deck.pop());
        updateScores();
        showHands();
        checkWinner();
    }
};

const stand = () => {
    if (playerActive) {
        playerActive = false;
        dealerTurn();
    }
};

const dealerTurn = () => {
    while (dealerScore < 20) {
        dealerHand.push(deck.pop());
        updateScores();
        showHands();
        setTimeout(dealerTurn, 1000); // 1 sec card flip delay
        
        if (dealerScore > 21) {
            return;
        }
    }
    checkWinner();
};

const checkWinner = () => {
    if (playerScore > 21) {
        showMessage("You're Busted! Dealer Wins!");
    } else if (dealerScore > 21) {
        showMessage("Dealer's Busted! Player Wins!");
    } else if (playerScore === 21) {
        showMessage("BlackJack! You Win!!!");
    } else if (dealerScore === 21) {
        showMessage("Dealer Has BlackJack! You Lose!");
    } else if (playerScore === 21 && dealerScore === 21) {
        showMessage("Both have BlackJack! Pushed!");
    } else if (playerScore < 21 && dealerScore < 21) {
        playerTurn();
    } else if (dealerScore < 21) {
        if (dealerScore > playerScore) {
            showMessage("Dealer Wins!");
        } else if (dealerScore < playerScore) {
            showMessage("You Win!");
        } else {
            showMessage("Pushed!");
        }
    } else {
        playerTurn();
    }
};

const createCardElement = (card) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const [value, suit] = card.split(' of ');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardValue = document.createElement('div');
    cardValue.classList.add('card-value');
    cardValue.textContent = value;

    const cardSuit = document.createElement('div');
    cardSuit.classList.add('card-suit');
    cardSuit.textContent = suit;

    cardFront.appendChild(cardValue);
    cardFront.appendChild(cardSuit);

    cardDiv.appendChild(cardFront);

    return cardDiv;
};

/*----------- Event Listeners ----------*/

startButton.addEventListener('click', init);
hitButton.addEventListener('click', hit);
leaveTable.addEventListener('click', stand);
document.querySelector('.reset-button').addEventListener('click', newGame);