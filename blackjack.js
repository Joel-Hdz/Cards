import Deck from "./deck.js"

let cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": 11,
}
const dealerSlot = document.querySelector('.dealerSlot');
const playerSlot = document.querySelector('.playerSlot');
const hitMe = document.querySelector('.hit');
const letsPlay = document.querySelector('.text');
const discard = document.querySelector('.discard');


let time = 10;
let mainDeck, playerCard, dealerCard, dcard;
let trash = [];
let dealerHand = []
let playerHand = []

startGame();

function startGame() {
    const deck = new Deck();
    deck.shuffle();

    letsPlay.addEventListener('click', async () => {
        cleanBeforRound();
        announce();
        setTimeout(beginRound, 11000);
    })

    hit();
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

function announce() {
    letsPlay.innerText = 'Place Your Bets!';
    let timer = document.createElement('div');
    timer.setAttribute("id", "countdown");
    letsPlay.appendChild(timer);
    setInterval(clock, 1000);
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
    let value = dcard.getValue();
    dealerHand.push(value);
}

function giveCard2Player() {
    playerCard = mainDeck.pull();

    playerSlot.appendChild(playerCard.getHTML());
    let value = playerCard.getValue();
    playerHand.push(value);
}

function giveCard2Dealer() {
    dealerCard = mainDeck.pull();

    dealerSlot.appendChild(dealerCard.getHTML());
    let value = dealerCard.getValue();
    dealerHand.push(value);
}

function hit() {
    hitMe.addEventListener('click', () => {
        giveCard2Player();
    })
}

function clock() {
    const countdownEl = document.getElementById('countdown');
    if (time <= 0) {
        letsPlay.innerText = 'Good Luck!'
    } else {
        countdownEl.innerHTML = `${time}`
        time--;
    }
}