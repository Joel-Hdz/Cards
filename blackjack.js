import Deck from "./deck.js"

const dealerSlot = document.querySelector('.dealerSlot');
const playerSlot = document.querySelector('.playerSlot');
const hitMe = document.querySelector('.hit');
const letsPlay = document.querySelector('.text');
const discard = document.querySelector('.discard');

let mainDeck

startGame()
function startGame() {
    const deck = new Deck();
    deck.shuffle();

    letsPlay.addEventListener('click', () => {
        cleanBeforRound();

    })
    mainDeck = deck;
}
function cleanBeforRound() {
    dealerSlot.innerHTML = '<div class="placeHolder"></div><div class="placeHolder"></div>'
    playerSlot.innerHTML = '<div class="placeHolder"></div><div class="placeHolder"></div>'

    if (mainDeck.length = 0) {
        updateDeck();
    };
}
function updateDeck() {

}
function throwAway(dealer, player) {
    dealer = dealerSlot
    player = playerSlot

}
function giveCard() {
    const playerCard = mainDeck.pop()
    const dealerCard = mainDeck.pop()

    playerSlot.appendChild(playerCard.getHTML())
    dealerSlot.appendChild(dealerCard.getHTML())
}
function hit() {
    hitMe.addEventListener('click', () => {
        giveCard();
    })
}