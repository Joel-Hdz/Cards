import Deck from "./deck.js";

// DOM Elements
const dealerSlot = document.querySelector('.dealerSlot');
const playerSlot = document.querySelector('.playerSlot');
const hitMe = document.querySelector('.hitButton');
const stand = document.querySelector('.standButton');
const letsPlay = document.querySelector('.text');
const discard = document.querySelector('.discard');

// Deck Initialization
const freshDeck = new Deck();
freshDeck.shuffle();
let mainDeck = freshDeck;

// Game State Variables
let time = 10;
let playerCard, dealerCard, dealerSecondCard;
let trash = [];
let dealerHand = [];
let playerHand = [];
let isGameActive = true;

// Start the game
const gameStart = new Promise((resolve) => {
    resolve(
        play()
            .then(() => {
                console.log('Game started successfully');
            })
            .catch((error) => {
                console.error('Error starting the game:', error);
            })
    );
});

// Game Class
class Game {
    constructor() {
        this.isActive = false;
    }
    start() {
        this.isActive = true;
        console.log("Game started!");
    }
}

// Slot Class
class Slot {
    constructor(player, dealer) {
        this.player = player;
        this.dealer = dealer;
    }
}

// Money Class
class Money {
    constructor(amount) {
        this.amount = amount;
    }
    get howMuch() {
        return this.amount;
    }
    set howMuch(value) {
        this.amount = value;
    }
}

// Main Game Logic
async function play() {
    return new Promise((resolve) => {
        if (isGameActive) {
            letsPlay.addEventListener(
                'click',
                async () => {
                    cleanBeforeRound(); // Reset the board
                    resolve(); // Resolve the Promise
                    announce(); // Announce the game status
                    await beginRound(); // Wait for the round setup to complete
                    score(); // Calculate and log the scores
                    hit(); // Handle player actions
                },
                { once: true }
            );
        }
    });
}

// Reset the board for a new round
function cleanBeforeRound() {
    // Clear only the cards in the dealer and player slots
    while (dealerSlot.firstChild) {
        dealerSlot.removeChild(dealerSlot.firstChild);
    }
    while (playerSlot.firstChild) {
        playerSlot.removeChild(playerSlot.firstChild);
    }

    // Add placeholder elements to maintain the appearance of card outlines
    for (let i = 0; i < 2; i++) {
        const dealerPlaceholder = document.createElement('div');
        dealerPlaceholder.classList.add('card', 'placeholder');
        dealerSlot.appendChild(dealerPlaceholder);

        const playerPlaceholder = document.createElement('div');
        playerPlaceholder.classList.add('card', 'placeholder');
        playerSlot.appendChild(playerPlaceholder);
    }

    // Keep the discard pile intact
    console.log("Preparing for the next round...");

    // Check if the deck is empty and update it if necessary
    if (mainDeck.length === 0) {
        updateDeck();
    }
}

// Announce the game status
function announce() {
    letsPlay.innerText = 'Place Your Bets!';
    const timer = document.createElement('div');
    timer.setAttribute('id', 'countdown');
    letsPlay.appendChild(timer);

    const interval = setInterval(() => {
        if (time <= 0) {
            letsPlay.innerText = 'Good Luck!';
            clearInterval(interval);
        } else {
            timer.innerHTML = `${time}`;
            time--;
        }
    }, 1000);
}

// Update the deck when it runs out
function updateDeck() {
    mainDeck = new Deck();
    mainDeck.shuffle();
    console.log("Deck updated and shuffled.");
}

// Discard cards
function throwAway(dealer, player) {
    trash.push(...dealer, ...player);
}

// Delay execution with a promise
function order(time, doThis) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(doThis());
        }, time);
    });
}

// Begin a new round
async function beginRound() {
    console.log("Starting a new round...");

    const burnCard = mainDeck.pull();
    console.log("Burn card:", burnCard);
    trash.push(burnCard);

    dealerSlot.innerHTML = '';
    playerSlot.innerHTML = '';

    console.log("Dealing cards...");
    await order(1000, givePlayerACard); // Player's first card
    await order(1000, giveCardToDealer); // Dealer's first card
    await order(1000, givePlayerACard); // Player's second card
    await order(1000, dealersSecondCard); // Dealer's second card (face down)

    console.log("Round setup complete.");
}

// Dealer's second card
function dealersSecondCard() {
    dealerSecondCard = mainDeck.pull();
    dealerSlot.appendChild(dealerSecondCard.getHTML());

    const secondCard = dealerSlot.children[1];
    secondCard.classList.add('faceDown');

    const value = dealerSecondCard.getValue();
    dealerHand.push(value);
}

// Give a card to the player
function givePlayerACard() {
    playerCard = mainDeck.pull();
    playerSlot.appendChild(playerCard.getHTML());

    const value = playerCard.getValue();
    playerHand.push(value);
}

// Give a card to the dealer
function giveCardToDealer() {
    dealerCard = mainDeck.pull();
    dealerSlot.appendChild(dealerCard.getHTML());

    const value = dealerCard.getValue(); // Map rank to value
    dealerHand.push(value);
}

// Handle player actions
function hit() {
    hitMe.addEventListener('click',
        () => {
            givePlayerACard(); // Give the player another card
            updateScore(); // Update the score after hitting
        });

    stand.addEventListener('click', () => {
        const secondCard = dealerSlot.children[1];
        secondCard.classList.remove('faceDown');
    });
}

// Calculate the score of the player and dealer hands
function score() {
    const playerScore = calculateHandScore(playerHand);
    const dealerScore = calculateHandScore(dealerHand);

    console.log("Player score:", playerScore);
    console.log("Dealer score:", dealerScore);
}

function calculateHandScore(hand) {
    let total = 0;
    let aces = 0;

    // Calculate the total score and count the number of Aces
    hand.forEach((card) => {
        if (card === "A") {
            aces++;
            total += 11; // Initially treat Ace as 11
        } else {
            total += card; // Add the value of non-Ace cards
        }
    });

    // Adjust for Aces if the total exceeds 21
    while (total > 21 && aces > 0) {
        total -= 10; // Convert an Ace from 11 to 1
        aces--;
    }

    return total;
}

function updateScore() {
    const playerScore = calculateHandScore(playerHand);
    console.log("Updated Player score:", playerScore);

    // Check if the player has busted
    if (playerScore > 21) {
        console.log("Player busted!");
        // Handle player bust logic here (e.g., end the round, declare dealer as winner)
    }
}
