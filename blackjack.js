import Deck from "./deck.js"

const dealerSlot = document.querySelector('.dealerSlot');
const playerSlot = document.querySelector('.playerSlot');
const hitMe = document.querySelector('.hit');
const letsPlay = document.querySelector('.text');
const discard = document.querySelector('.discard');

let mainDeck
let trash = []

startGame()
function startGame() {
    const deck = new Deck();
    deck.shuffle();

    letsPlay.addEventListener('click', () => {
        cleanBeforRound();
        letsPlay.innerText = 'Place Your Bets!'
    })
    mainDeck = deck;
}
function cleanBeforRound() {
    dealerSlot.innerHTML = '<div class="placeHolder"></div><div class="placeHolder"></div>'
    playerSlot.innerHTML = '<div class="placeHolder"></div><div class="placeHolder"></div>'
    discard.innerHTML = ''

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
function beginRound() {
    const burnCard = mainDeck.pull();

    trash.push(burnCard);

    giveCard2Player();
    giveCard2Dealer();
    giveCard2Player();
    dealers2ndCard();
}
function dealers2ndCard() {
    dcard = dealerCard.getHTML()
    dealerSlot.appendChild(ddcard.classList.add('faceDown'));
}
function giveCard2Player() {
    playerCard = mainDeck.pull();

    playerSlot.appendChild(playerCard.getHTML());
}
function giveCard2Dealer() {
    dealerCard = mainDeck.pull();

    dealerSlot.appendChild(dealerCard.getHTML());
}
function hit() {
    hitMe.addEventListener('click', () => {
        giveCard2Player();
    })
}