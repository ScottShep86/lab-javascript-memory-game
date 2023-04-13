const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
let pairsClickedElement = document.querySelector("#pairs-clicked");
let pairsGuessedElement = document.querySelector("#pairs-guessed");
let gameoverScreen = document.querySelector("#gameover-container");
let movesElement = document.querySelector("#moves");
let restartBtn = document.querySelector("#restartBtn");
let waiting = false;
let pairs = [];

window.addEventListener("load", (event) => {
  gameoverScreen.style.display = "none";
  memoryGame.shuffleCards(cards);

  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;
  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      let cardName = card.getAttribute("data-card-name");
      pairs.push(cardName);
      if (waiting === false) {
        card.classList.add("turned");
        //when two cards have been flipped over, check if they match
        if (pairs.length === 2) {
          waiting = true;
          //use method from memory.js to check the names of the cards
          let match = memoryGame.checkIfPair(pairs[0], pairs[1]);
          //update the DOM for the cards clicked
          pairsClickedElement.innerText = memoryGame.pairsClicked;
          //update the DOM to reflect the pairs correctly matched
          pairsGuessedElement.innerText = memoryGame.pairsGuessed;

          if (match === false) {
            setTimeout(() => {
              document.querySelectorAll(".card").forEach((card) => {
                if (pairs.includes(card.getAttribute("data-card-name"))) {
                  card.classList.remove("turned");
                  waiting = false;
                }
              });
              pairs = [];
            }, 2000);
          } else {
            waiting = false;
            pairs = [];
          }
        }
        let gameFinished = memoryGame.checkIfFinished();
        if (gameFinished) {
          movesElement.innerText = memoryGame.pairsClicked;
          gameoverScreen.style.display = "flex";
        }
      }
    });
  });

  restartBtn.addEventListener("click", () => {
    memoryGame.pairsClicked = 0;
    memoryGame.pairsGuessed = 0;
    pairs = [];
    //update the DOM for the cards clicked
    pairsClickedElement.innerText = memoryGame.pairsClicked;
    //update the DOM to reflect the pairs correctly matched
    pairsGuessedElement.innerText = memoryGame.pairsGuessed;
    gameoverScreen.style.display = "none";
    memoryGame.shuffleCards(cards);

    let html = "";
    memoryGame.cards.forEach((pic) => {
      html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
    });

    // Add all the divs to the HTML
    document.querySelector("#memory-board").innerHTML = html;
    // Bind the click event of each element to a function
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("turned");
    });

    //start over
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        let cardName = card.getAttribute("data-card-name");
        pairs.push(cardName);
        if (waiting === false) {
          card.classList.add("turned");
          //when two cards have been flipped over, check if they match
          if (pairs.length === 2) {
            waiting = true;
            //use method from memory.js to check the names of the cards
            let match = memoryGame.checkIfPair(pairs[0], pairs[1]);
            //update the DOM for the cards clicked
            pairsClickedElement.innerText = memoryGame.pairsClicked;
            //update the DOM to reflect the pairs correctly matched
            pairsGuessedElement.innerText = memoryGame.pairsGuessed;

            if (match === false) {
              setTimeout(() => {
                document.querySelectorAll(".card").forEach((card) => {
                  if (pairs.includes(card.getAttribute("data-card-name"))) {
                    card.classList.remove("turned");
                    waiting = false;
                  }
                });
                pairs = [];
              }, 2000);
            } else {
              waiting = false;
              pairs = [];
            }
          }
          let gameFinished = memoryGame.checkIfFinished();
          if (gameFinished) {
            movesElement.innerText = memoryGame.pairsClicked;
            gameoverScreen.style.display = "flex";
          }
        }
      });
    });
  });
});
