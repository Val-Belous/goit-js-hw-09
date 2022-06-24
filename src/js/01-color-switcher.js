function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.body;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
startBtn.addEventListener('click', startClick);
stopBtn.addEventListener('click', stopClick);
stopBtn.disabled = true;
function startClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopClick() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
}

// commit
