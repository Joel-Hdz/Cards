import Deck from "./deck.js"

const dealerCards = document.querySelector('.dealerCards');
const myCards = document.querySelector('.myCards');
const hitMe = document.querySelector('.hit');

startGame()
function startGame() {
    for (let i = 0; i < 8; i++) {
        new Deck();
    }
}

hitMe.addEventListener('click', () => {
    myCards.appendChild(deck.cards.getHTML());
})
dealerCards.appendChild(deck.cards[0].getHTML());