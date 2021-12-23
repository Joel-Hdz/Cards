const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

function makeEight() {
    let eightSuits = []
    for (let i = 0; i < 8; i++) {
        eightSuits.push(SUITS)
    }
    return eightSuits.flat(8);
}

const EIGHT = makeEight();

export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length;
    }

    pull() {
        return this.cards.shift();
    }

    add2Deck() {
        this.shuffle()
        return this.cards.push()
    }
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newindex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newindex];
            this.cards[newindex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit === '♠' || this.suit === '♣' ? 'black' : 'red'
    }
    getHTML() {
        const cardDiv = document.createElement('div');
        const topDiv = document.createElement('div');
        const centerDiv = document.createElement('div');
        const bottomDiv = document.createElement('div');
        cardDiv.classList.add("card", this.color);
        topDiv.classList.add("top");
        centerDiv.classList.add("center");
        bottomDiv.classList.add("bottom");
        cardDiv.append(topDiv, centerDiv, bottomDiv);
        topDiv.innerHTML = `<p>${this.value}</p><p>${this.suit}</p>`;
        centerDiv.innerText = `${this.suit}`;
        bottomDiv.innerHTML = `<p>${this.value}</p><p>${this.suit}</p>`;
        return cardDiv;
    }
    getValue() {
        return this.value
    }
}

function freshDeck() {
    return EIGHT.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value);
        });
    });
}