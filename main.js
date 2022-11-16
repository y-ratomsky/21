//-------------------События-------------------

const btnStart = document.querySelector(".btn__start");

btnStart.addEventListener("click", function () {
  const gameArea = document.querySelector(".game__area");
  gameArea.classList.remove("hidden");

  const startArea = document.querySelector(".start__area");
  startArea.classList.add("hidden");

  const btnGameStart = document.querySelector(".btn__game-start");
  btnGameStart.addEventListener("click", function () {
    btnGameStart.classList.add("hidden");

    generateDeck();
    generateCountDeck();
    for (i = 0; i < 2; i++) {
      giveCard();
      giveFakeCards();
    }

    const btnTakeCard = document.querySelector(".btn__take-card");
    btnTakeCard.classList.remove("hidden");

    const btnFinishGame = document.querySelector(".btn__finish-game");
    btnFinishGame.classList.remove("hidden");

    btnTakeCard.addEventListener("click", function () {
      giveCard();
    });

    btnFinishGame.addEventListener("click", function () {
      for (i = 0; i < 2; i++) {
        cardsForComp();
      }

      setCardComp();

      const fakeCards = document.querySelectorAll(".fake__comp-card");
      for (i = 0; i < fakeCards.length; i++) {
        fakeCards[i].classList.add("hidden");
      }

      const compCards = document.querySelectorAll(".comp__card");
      for (i = 0; i < compCards.length; i++) {
        compCards[i].classList.remove("hidden");
      }

      // setCardComp();

      countCards();

      const result = document.querySelector(".result");
      result.textContent = res;

      const compCountArea = document.querySelector(".comp__count");
      compCountArea.textContent = cardCompValue;
      const playerCountArea = document.querySelector(".player__count");
      playerCountArea.textContent = cardPlayerValue;
    });
  });
});

//-------------------Переменные-------------------

const cardSet = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "валет",
  "дама",
  "король",
];

const suitSet = ["черви", "буби", "крести", "пики"];

const setForCount = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];

const deck = [];
const deckForCount = [];

const playerCards = [];
const compCards = [];

let cardPlayerValue = 0;
let cardCompValue = 0;
let res = "";

//-------------------Функции-------------------

function generateDeck() {
  for (i = 0; i < 4; i++) {
    for (let key in cardSet) {
      deck.push(cardSet[key] + " " + suitSet[i]);
    }
  }
}

function generateCountDeck() {
  for (i = 0; i < 4; i++) {
    for (let key in setForCount) {
      deckForCount.push(setForCount[key]);
    }
  }
}

function giveCard() {
  let numOne = Math.floor(Math.random() * deck.length);
  let cardOne = deck[numOne];
  cardPlayerValue += +deckForCount[numOne];
  deckForCount.splice(numOne, 1);
  deck.splice(numOne, 1);

  playerCards.push(cardOne);

  const playerCardsList = document.querySelector(".player__card-list");
  const itemCard = document.createElement("li");
  itemCard.classList.add("player__card");
  itemCard.textContent = playerCards[playerCards.length - 1];
  playerCardsList.appendChild(itemCard);
}

function cardsForComp() {
  let numTwo = Math.floor(Math.random() * deck.length);
  let cardTwo = deck[numTwo];

  cardCompValue += +deckForCount[numTwo];
  deckForCount.splice(numTwo, 1);
  deck.splice(numTwo, 1);

  compCards.push(cardTwo);

  const compCardsList = document.querySelector(".comp__card-list");
  const itemCard = document.createElement("li");
  itemCard.classList.add("comp__card");
  itemCard.classList.add("hidden");
  itemCard.textContent = compCards[compCards.length - 1];
  compCardsList.appendChild(itemCard);
}

function giveFakeCards() {
  const compCardsList = document.querySelector(".comp__card-list");
  const fakeCard = document.createElement("li");
  fakeCard.classList.add("fake__comp-card");
  fakeCard.textContent = "???";
  compCardsList.appendChild(fakeCard);
}

function setCardComp() {
  let compThink = Math.floor(Math.random() * 3);

  for (i = 0; i < compThink; i++) {
    cardsForComp();
  }
}

function countCards() {
  if (cardPlayerValue > cardCompValue && cardPlayerValue <= 21) {
    res = "Поздравляем! Вы выиграли!";
  } else if (cardPlayerValue < cardCompValue && cardCompValue > 21) {
    res = "Поздравляем! Вы выиграли!";
  } else if (cardCompValue > cardPlayerValue && cardCompValue <= 21) {
    res = "Какая неудача! Вы проиграли =(";
  } else if (cardCompValue < cardPlayerValue && cardPlayerValue > 21) {
    res = "Какая неудача! Вы проиграли =(";
  } else if (cardCompValue == cardPlayerValue) {
    res = "Какая редкость! Ничья =|";
  }
}
