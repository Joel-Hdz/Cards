// Import the Deck class from deck.js
import Deck from "./deck.js";

// DOM Elements
// These are the HTML elements used to display the game state and interact with the player
const dealerSlot = document.querySelector('.dealerSlot'); // Slot for dealer's cards
const playerSlot = document.querySelector('.playerSlot'); // Slot for player's cards
const hitMe = document.querySelector('.hitButton'); // Button for the player to "Hit"
const standButton = document.querySelector('.standButton'); // Button for the player to "Stand"
const letsPlay = document.querySelector('.text'); // Text area for game messages
const discard = document.querySelector('.discard'); // Area for discarded cards

// Deck Initialization
// Create a new shuffled deck and assign it to the mainDeck variable
const freshDeck = new Deck();
freshDeck.shuffle();
let mainDeck = freshDeck;

// Game State Variables
// Variables to track the state of the game
let time = 10; // Countdown timer for placing bets
let playerCard, dealerCard, dealerSecondCard; // Temporary variables for cards being dealt
let trash = []; // Array to hold discarded cards
let dealerHand = []; // Array to hold the dealer's current hand
let playerHand = []; // Array to hold the player's current hand
let isGameActive = true; // Boolean to track if the game is active

// Start the game
// This promise resolves when the game starts
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
// Represents the overall game state
class Game {
    constructor() {
        this.isActive = false; // Tracks if the game is active
    }
    start() {
        this.isActive = true; // Starts the game
        console.log("Game started!");
    }
}

// Slot Class
// Represents the slots for the player and dealer
class Slot {
    constructor(player, dealer) {
        this.player = player; // Player's slot
        this.dealer = dealer; // Dealer's slot
    }
}

// Money Class
// Represents the player's money
class Money {
    constructor(amount) {
        this.amount = amount; // Initial amount of money
    }
    get howMuch() {
        return this.amount; // Getter for the amount
    }
    set howMuch(value) {
        this.amount = value; // Setter for the amount
    }
}

const playerMoney = new Money(100); // Start with $100


// Main Game Logic
// This function starts the game and handles the main game loop
async function play() {
    return new Promise((resolve) => {
        if (isGameActive) {
            letsPlay.addEventListener(
                'click',
                async () => {
                    cleanBeforeRound(); // Reset the board for a new round
                    resolve(); // Resolve the promise to indicate the game has started
                    announce(); // Announce the game status
                    await beginRound(); // Set up the round (deal cards, etc.)
                    score(); // Calculate and log the scores
                    hit(); // Handle player actions (Hit or Stand)
                },
                { once: true } // Ensure the event listener is only triggered once
            );
        }
    });
}

// Reset the board for a new round
// Clears the cards from the board and prepares for the next round
function cleanBeforeRound() {
    // Clear the dealer's and player's card slots
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

    console.log("Preparing for the next round...");

    // If the deck is empty, create a new shuffled deck
    if (mainDeck.length === 0) {
        updateDeck();
    }
}

// Announce the game status
// Displays a countdown timer and updates the game message
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
// Creates a new shuffled deck
function updateDeck() {
    mainDeck = new Deck();
    mainDeck.shuffle();
    console.log("Deck updated and shuffled.");
}

// Discard cards
// Moves cards from the dealer's and player's hands to the discard pile
function throwAway(dealer, player) {
    trash.push(...dealer, ...player);
}

// Delay execution with a promise
// Used to add delays between actions (e.g., dealing cards)
function order(time, doThis) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(doThis());
        }, time);
    });
}

// Begin a new round
// Deals cards to the player and dealer and sets up the round
async function beginRound() {
    console.log("Starting a new round...");

    const burnCard = mainDeck.pull(); // Burn the top card
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
// Deals the dealer's second card and keeps it face down
function dealersSecondCard() {
    dealerSecondCard = mainDeck.pull();
    dealerSlot.appendChild(dealerSecondCard.getHTML());

    const secondCard = dealerSlot.children[1];
    secondCard.classList.add('faceDown');

    const value = dealerSecondCard.getValue();
    dealerHand.push(value);
}

// Give a card to the player
// Deals a card to the player and updates their hand
function givePlayerACard() {
    playerCard = mainDeck.pull();
    playerSlot.appendChild(playerCard.getHTML());

    const value = playerCard.getValue();
    playerHand.push(value);
}

// Give a card to the dealer
// Deals a card to the dealer and updates their hand
function giveCardToDealer() {
    dealerCard = mainDeck.pull();
    dealerSlot.appendChild(dealerCard.getHTML());

    const value = dealerCard.getValue();
    dealerHand.push(value);
}

// Handle player actions
// Adds event listeners for the "Hit" and "Stand" buttons
function hit() {
    hitMe.addEventListener('click', () => {
        givePlayerACard(); // Give the player another card
        updateScore(); // Update the score after hitting
    });

    standButton.addEventListener('click', () => {
        playersDone(); // Run the playersDone function when the stand button is clicked
    });
}

// Handle the end of the player's turn
// Reveals the dealer's second card and proceeds to the dealer's turn
function playersDone() {
    console.log("Player finished their turn.");
    const secondCard = dealerSlot.children[1];
    secondCard.classList.remove('faceDown'); // Reveal the dealer's second card

    const playerScore = calculateHandScore(playerHand);
    if (playerScore > 21) {
        console.log("Player busted! Dealer wins.");
        return;
    }

    DealersTurn(); // Proceed to the dealer's turn
}

// Dealer's turn
// Handles the dealer's actions (e.g., hitting until the score is 17 or higher)
function DealersTurn() {
    console.log("Dealer's turn...");
    let dealerScore = calculateHandScore(dealerHand);

    while (dealerScore < 17) {
        giveCardToDealer(); // Dealer hits until reaching 17 or higher
        dealerScore = calculateHandScore(dealerHand);
    }

    console.log("Dealer's final score:", dealerScore);
}

// Calculate the score of the player and dealer hands
// Logs the scores of both the player and dealer
function score() {
    const playerScore = calculateHandScore(playerHand);
    const dealerScore = calculateHandScore(dealerHand);

    console.log("Player score:", playerScore);
    console.log("Dealer score:", dealerScore);
}

// Calculate the score of a hand
// Handles Aces (1 or 11) and calculates the total score
function calculateHandScore(hand) {
    let total = 0;
    let aces = 0;

    hand.forEach((card) => {
        if (card === "A") {
            aces++;
            total += 11; // Initially treat Ace as 11
        } else {
            total += card; // Add the value of non-Ace cards
        }
    });

    while (total > 21 && aces > 0) {
        total -= 10; // Convert an Ace from 11 to 1
        aces--;
    }

    return total;
}

// Update the player's score
// Logs the player's updated score and checks if they busted
function updateScore() {
    const playerScore = calculateHandScore(playerHand);
    console.log("Updated Player score:", playerScore);

    if (playerScore > 21) {
        console.log("Player busted!");
    }
}


// placing bets
function placeBet(amount) {
    if (amount > playerMoney.howMuch) {
        console.log("Not enough money to place this bet.");
        return false;
    }
    playerMoney.howMuch -= amount;
    console.log(`Bet placed: $${amount}. Remaining balance: $${playerMoney.howMuch}`);
    return true;
}

function payout(amount) {
    playerMoney.howMuch += amount;
    console.log(`You won $${amount}! New balance: $${playerMoney.howMuch}`);
}