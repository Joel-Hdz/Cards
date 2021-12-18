import Deck from "./deck.js"

const dealerCards = document.querySelector('.dealerCards');
const myCards = document.querySelector('.myCards');
const hitMe = document.querySelector('.hit');

const deck = new Deck()
console.log(deck.cards)
