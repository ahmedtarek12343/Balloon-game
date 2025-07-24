const startScreen = document.getElementById("start-screen");
const runningScreen = document.getElementById("running-game");
const endScreen = document.getElementById("end-screen");
const startGame = document.getElementById("start-game");
const ballonContainer = document.getElementById("ballon-container");
const scoreBoard = document.getElementById("score-board");
const time = document.getElementById("time");
const score = document.getElementById("score");
const restartGame = document.getElementById("restart");
const finalScore = document.getElementById("final_score");

let gameScore = 0;
let gameTime = 30;
let gameStarted = false;
let gameInterval;
let timeInterval;

startGame.addEventListener("click", function () {
  runningScreen.classList.add("active");
  startScreen.classList.remove("active");
  gameStarted = true;
  startingGame();
});

const createBallons = function () {
  if (!gameStarted) return;
  const markupBallon = `
  <div class="ballon">🎈</div>`;
  ballonContainer.insertAdjacentHTML("beforeend", markupBallon);
  const ballon = ballonContainer.lastElementChild;
  const x = Math.random() * (ballonContainer.clientWidth - 50);
  ballon.style.left = `${x}px`;
  const duration = Math.random() * 2 + 4;
  ballon.style.animationDuration = duration + "s";
  ballon.addEventListener("click", () => {
    ballon.remove();
    gameScore++;
  });
  score.textContent = gameScore;
  ballon.addEventListener("animationend", () => {
    ballon.remove();
  });
};

const startingGame = function () {
  gameStarted = true;

  gameInterval = setInterval(createBallons, 350);

  timeInterval = setInterval(() => {
    if (gameTime <= 0) {
      endGame();
    }
    gameTime--;
    time.textContent = gameTime;
  }, 1000);
};

const endGame = function () {
  gameStarted = false;
  runningScreen.classList.remove("active");
  endScreen.classList.add("active");
  clearInterval(gameInterval);
  clearInterval(timeInterval);
  finalScore.textContent = gameScore;
};

restartGame.addEventListener("click", function () {
  gameScore = 0;
  gameTime = 30;
  gameStarted = false;
  score.textContent = gameScore;
  time.textContent = gameTime;
  ballonContainer.innerHTML = "";
  endScreen.classList.remove("active");
  runningScreen.classList.add("active");
  if (gameInterval) clearInterval(gameInterval);
  if (timeInterval) clearInterval(timeInterval);
  startingGame();
});
