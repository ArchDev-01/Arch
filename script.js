// Tool Management
const tools = {
  current: null,
  switch(toolId) {
    document.querySelectorAll('.tool-container').forEach(container => {
      container.style.display = 'none';
    });
    const tool = document.getElementById(toolId);
    if (tool) {
      tool.style.display = 'block';
      this.current = toolId;
    }
  }
};

// Initialize Event Listeners
document.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    tools.switch(btn.dataset.tool);
  });
});

// Code Editor
const codeEditor = document.querySelector('.code-editor');
const editorPreview = document.querySelector('.editor-preview');

codeEditor?.addEventListener('input', () => {
  editorPreview.innerHTML = codeEditor.value;
});

// Coin Flip
let isFlipping = false;
const coin = document.querySelector('.coin-inner');
const flipBtn = document.querySelector('.flip-btn');

flipBtn?.addEventListener('click', () => {
  if (isFlipping) return;
  isFlipping = true;
  const random = Math.random() > 0.5;
  coin.style.transform = `rotateY(${random ? 720 : 900}deg)`;
  setTimeout(() => {
    isFlipping = false;
  }, 1000);
});

// Spin Wheel
const wheelCanvas = document.getElementById('wheelCanvas');
const wheelCtx = wheelCanvas?.getContext('2d');
const wheelItems = document.getElementById('wheelItems');
const spinBtn = document.querySelector('.spin-btn');

let wheelRotation = 0;
let isSpinning = false;

function drawWheel(items) {
  if (!wheelCtx) return;
  
  const center = wheelCanvas.width / 2;
  const radius = center - 10;
  const slice = (2 * Math.PI) / items.length;

  wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  wheelCtx.save();
  wheelCtx.translate(center, center);
  wheelCtx.rotate(wheelRotation);

  items.forEach((item, i) => {
    const angle = i * slice;
    wheelCtx.beginPath();
    wheelCtx.moveTo(0, 0);
    wheelCtx.arc(0, 0, radius, angle, angle + slice);
    wheelCtx.fillStyle = i % 2 ? '#1793d1' : '#2a2a2a';
    wheelCtx.fill();
    wheelCtx.save();
    wheelCtx.rotate(angle + slice / 2);
    wheelCtx.fillStyle = '#fff';
    wheelCtx.textAlign = 'right';
    wheelCtx.fillText(item, radius - 20, 0);
    wheelCtx.restore();
  });

  wheelCtx.restore();
}

spinBtn?.addEventListener('click', () => {
  if (isSpinning) return;
  isSpinning = true;
  const items = wheelItems.value.split(',').map(item => item.trim());
  const spins = 5 + Math.random() * 5;
  const duration = 3000;
  const start = wheelRotation;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    
    wheelRotation = start + (spins * 2 * Math.PI * eased);
    drawWheel(items);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
    }
  }

  requestAnimationFrame(animate);
});

// Bingo Card Generator
const bingoSize = document.getElementById('bingoSize');
const generateBtn = document.querySelector('.generate-btn');
const bingoCard = document.querySelector('.bingo-card');

function generateBingoCard(size) {
  if (!bingoCard) return;
  
  bingoCard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  bingoCard.innerHTML = '';

  const numbers = new Set();
  while (numbers.size < size * size) {
    numbers.add(Math.floor(Math.random() * 75) + 1);
  }

  [...numbers].forEach(num => {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    cell.textContent = num;
    cell.addEventListener('click', () => {
      cell.style.background = cell.style.background ? '' : '#1793d1';
    });
    bingoCard.appendChild(cell);
  });
}

generateBtn?.addEventListener('click', () => {
  generateBingoCard(parseInt(bingoSize.value));
});

// Initialize default tool
tools.switch('editor');