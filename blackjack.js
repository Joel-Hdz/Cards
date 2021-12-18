import Deck from "./deck.js"

const dealerCards = document.querySelector('.dealerCards');


const deck = new Deck()
deck.shuffle()
console.log(deck.cards);

dealerCards.appendChild(deck.cards[0].getHTML());