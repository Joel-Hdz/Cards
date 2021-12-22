import Deck from "./deck.js"

const dealerSlot = document.querySelector('.dealerSlot');
const playerSlot = document.querySelector('.playerSlot');
const hitMe = document.querySelector('.hit');
const letsPlay = document.querySelector('.text');
const discard = document.querySelector('.discard');


let mainDeck, playerCard, dealerCard, dcard
let trash = []

startGame()
function startGame() {
    const deck = new Deck();
    deck.shuffle();

    letsPlay.addEventListener('click', () => {
        cleanBeforRound();
        letsPlay.innerText = 'Place Your Bets!'
        setTimeout(beginRound, 10000);
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
    const burned = document.createElement('div')
    burned.classList.add('discardStack')
    discard.appendChild(burned)

    dealerSlot.innerHTML = ''
    playerSlot.innerHTML = ''

    setTimeout(giveCard2Player, 1000);
    setTimeout(giveCard2Dealer, 2000);
    setTimeout(giveCard2Player, 3000);
    setTimeout(dealers2ndCard, 4000);
}
function dealers2ndCard() {
    dcard = mainDeck.pull();

    dealerSlot.appendChild(dcard.getHTML());
    let secondCard = dealerSlot.children[1];
    secondCard.classList.add('faceDown');
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