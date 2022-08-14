let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ['red', 'blue', 'green', 'yellow'];
let started = false;
let level = 0;
let arr = [...document.querySelectorAll('.btn')];
let title = document.querySelector('h1');
let body = document.querySelector('body');
let startButton = document.querySelector('.start-btn');
let restartButton = document.querySelector('.restart-btn');

document.addEventListener('keydown', function (e) {
  if (started == false) {
    title.innerHTML = `Level ${level}`;
    started = true;
    nextSequence();
  }
});

arr.forEach((elem) =>
  elem.addEventListener('click', function (e) {
    if (gamePattern.length !== 0) {
      userClickedPattern.push(e.currentTarget.id);
      animation(e.currentTarget.id);
      sound(e.currentTarget.id);
      checkAnswer(userClickedPattern.length - 1);
    }
  }),
);

startButton.addEventListener('click', function () {
  if (started == false) {
    title.innerHTML = `Level ${level}`;
    started = true;
    nextSequence();
  }
});

function locationreload() {
  location.reload();
}

const nextSequence = () => {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  userClickedPattern = [];
  level++;
  title.innerHTML = `Level ${level}`;
  animation(randomChosenColour);
  sound(randomChosenColour);
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    sound('wrong');
    body.classList.add('game-over');
    title.innerHTML = 'Game Over, Press any key to Restart';
    setTimeout(function () {
      body.classList.remove('game-over');
    }, 1000);
    startOver();
  }
}
const animation = (randomChosenColour) => {
  let button = document.querySelector(`#${randomChosenColour}`);
  button.classList.add('pressed');
  setTimeout(function () {
    button.classList.remove('pressed');
  }, 500);
};

const sound = (btnpressed) => {
  let audio1 = new Audio(`${btnpressed}.mp3`);
  audio1.volume = 0.1;
  audio1.play();
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
