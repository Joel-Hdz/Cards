const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length
    }
    pull() {

    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newindex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newindex]
            this.cards[newindex] = this.cards[i]
            this.cards[i] = oldValue
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
        const cardDiv = document.createElement('div')
        const topDiv = document.createElement('div')
        const centerDiv = document.createElement('div')
        const bottomDiv = document.createElement('div')
        cardDiv.classList.add("card", this.color)
        topDiv.classList.add("top")
        centerDiv.classList.add("center")
        bottomDiv.classList.add("bottom")
        cardDiv.append(topDiv, centerDiv, bottomDiv)
        topDiv.innerText(`${this.value}${this.suit}`)
        centerDiv.innerText(`${this.suit}`)
        bottomDiv.innerText(`${this.suit}${this.value}`)
        return cardDiv
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
} 