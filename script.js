let currentColor = 'black';
let isDrawing = false;
let currentPage = 0;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let alpha = 'a';  // Start with 'a'

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

document.getElementById('speaker').addEventListener('click', speakLetter);

function changeColor(color) {
  currentColor = color;
}

function startDrawing(e) {
  isDrawing = true;
  ctx.lineWidth = 20;  // Set the width to 20
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  ctx.beginPath();
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  let x, y;
  if (e.touches) {
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  } else {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function stopDrawing() {
  if (isDrawing) {
    isDrawing = false;
    ctx.closePath();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function nextPage() {
  if (currentPage < 25) {
    currentPage++;
    alpha = alphabet[currentPage].toLowerCase();  // Update alpha with the next letter
    loadPage();
  } else {
    document.getElementById('app').style.display = 'none';
  }
}

function loadPage() {
  const letter = alphabet[currentPage];
  document.getElementById('letter').innerText = letter;
  clearCanvas();
}

function speakLetter() {
  const letter = alpha;
  const audio = new Audio(`/${letter}.mp3`);  // Assuming audio files are stored in 'audio' directory
  console.log(`Playing audio for letter: ${letter}`);  // Debug log
  audio.play().then(() => {
    console.log(`Audio for ${letter} is playing`);
  }).catch(error => {
    console.error('Error playing audio:', error);
  });
}

// Load the first page
loadPage();

