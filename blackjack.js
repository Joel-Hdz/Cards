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
    "A": {
        ten: 11,
        less: 1
    }
}
const dealerSlot = document.querySelector('.dealerSlot');
const playerSlot = document.querySelector('.playerSlot');
const hitMe = document.querySelector('.hitButton');
const stand = document.querySelector('.standButton');
const letsPlay = document.querySelector('.text');
const discard = document.querySelector('.discard');
const deck = new Deck();
deck.shuffle();
let mainDeck = deck
let time = 10;

let playerCard, dealerCard, dcard;
let trash = [];
let dealerHand = []
let playerHand = []
let want2play = true

const gameStart = new Promise((resolve) => {
    resolve(
        play()
    )
})
class Game {
    constructor(blackjack) {

    }

}
class Slot {
    constructor(player, dealer)
}
class Money {
    constructor(amount, earnings) {
        this.amount = amount;
        this.earnings = earnings;
    }
    get howMuch() {
        return
    }
}


async function play() {
    return new Promise((resolve, reject) => {
        if (want2play) {
            resolve(
                letsPlay.addEventListener('click', () => {
                    cleanBeforRound();
                }, { once: true })
            )
        }
    });
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
    let interval = setInterval(() => {
        if (time <= 0) {
            letsPlay.innerText = 'Good Luck!'
            clearInterval(interval);
        } else {
            timer.innerHTML = `${time}`
            time--;
        }
    }, 1000)
}

function updateDeck() {

}

function throwAway(dealer, player) {
    dealer = dealerSlot
    player = playerSlot
}

let order = (time, doThis) => {
    return new Promise((resolve, reject) => {
        if (want2play) {
            setTimeout(() => {
                resolve(doThis());
            }, time);
        };
    })
}
async function beginRound() {
    const burnCard = mainDeck.pull();

    trash.push(burnCard);
    const burned = document.createElement('div')
    burned.classList.add('discardStack')
    discard.appendChild(burned)

    dealerSlot.innerHTML = ''
    playerSlot.innerHTML = ''


    await order(1000, giveCard2Player)
    await order(1000, giveCard2Dealer)
    await order(1000, giveCard2Player)
    await order(1000, dealers2ndCard)
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
    stand.addEventListener('click', () => {
        let secondCard = dealerSlot.children[1];
        secondCard.classList.remove('faceDown');
    })
}
