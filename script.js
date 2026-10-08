const arena = document.querySelector('#arena');
const star = document.querySelector('#star');
const startButton = document.querySelector('#start');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');
const bestElement = document.querySelector('#best');
const message = document.querySelector('#message');
const status = document.querySelector('#status');

let score = 0;
let timeLeft = 30;
let timer;
let playing = false;
let best = Number(localStorage.getItem('star-best') || 0);
bestElement.textContent = best;

function moveStar() {
  const padding = 12;
  const maxX = arena.clientWidth - star.offsetWidth - padding;
  const maxY = arena.clientHeight - star.offsetHeight - padding;
  star.style.left = `${padding + Math.random() * Math.max(0, maxX)}px`;
  star.style.top = `${padding + Math.random() * Math.max(0, maxY)}px`;
}

function endGame() {
  playing = false;
  clearInterval(timer);
  star.style.display = 'none';
  message.style.display = 'grid';
  message.textContent = `時間到！你抓到 ${score} 顆星星`;
  startButton.textContent = '再玩一次';
  status.textContent = score > best ? '新紀錄！太厲害了！' : '再挑戰一次，打破最高紀錄吧！';
  if (score > best) { best = score; localStorage.setItem('star-best', best); bestElement.textContent = best; }
}

function startGame() {
  score = 0; timeLeft = 30; playing = true;
  scoreElement.textContent = score; timeElement.textContent = timeLeft;
  message.style.display = 'none'; star.style.display = 'block'; startButton.textContent = '遊戲進行中'; status.textContent = '快！點擊發光的星星！';
  moveStar(); clearInterval(timer);
  timer = setInterval(() => { timeLeft -= 1; timeElement.textContent = timeLeft; if (timeLeft <= 0) endGame(); }, 1000);
}

star.addEventListener('click', () => { if (!playing) return; score += 1; scoreElement.textContent = score; moveStar(); });
startButton.addEventListener('click', () => { if (!playing) startGame(); });
window.addEventListener('resize', () => { if (playing) moveStar(); });
