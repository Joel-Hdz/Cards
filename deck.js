const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Mapping of card ranks to their values in blackjack
const blackjackCardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10, // Jack
    "Q": 10, // Queen
    "K": 10, // King
    "A": [1, 11] // Ace can be 1 or 11
};

export default class Deck {
    constructor() {
        this.cards = []; // Array of card objects
        this.initializeDeck();
    }

    // Initialize the deck with 8 decks by default
    initializeDeck(numDecks = 8) {
        this.cards = Array(numDecks)
            .fill()
            .flatMap(() => this.createSingleDeck());

        // Validate deck size
        const expectedCards = numDecks * SUITS.length * VALUES.length;
        if (this.cards.length !== expectedCards) {
            throw new Error(`Deck initialization failed. Expected ${expectedCards} cards, but got ${this.cards.length}.`);
        }

        console.log(`${numDecks} decks initialized with ${this.cards.length} cards.`);
    }

    createSingleDeck() {
        return SUITS.flatMap((suit) =>
            VALUES.map((rank) => new Card(rank, suit))
        );
    }
    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    pull() {
        return this.cards.shift(); // Remove and return the first card
    }
}

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    getHTML() {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
            <div class="top">${this.rank} ${this.suit}</div>
            <div class="center">${this.suit}</div>
            <div class="bottom">${this.rank} ${this.suit}</div>
        `;
        return cardDiv;
    }

    getValue(currentTotal = 0) {
        const value = blackjackCardValues[this.rank];

        if (Array.isArray(value)) {
            // Handle Ace: Return 11 if it doesn't cause a bust, otherwise return 1
            return currentTotal + 11 <= 21 ? 11 : 1;
        }

        return value; // Return the numerical value for other cards
    }
}