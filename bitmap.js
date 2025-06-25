const TOTAL_BLOCKS = 20;
const bitmapContainer = document.getElementById('bitmap-container');
const bitmapBlocks = [];

function initBitmap() {
  bitmapContainer.innerHTML = '';
  bitmapBlocks.length = 0;
  for (let i = 0; i < TOTAL_BLOCKS; i++) {
    const block = document.createElement('div');
    block.classList.add('bit-block');
    block.textContent = '1';
    bitmapContainer.appendChild(block);
    bitmapBlocks.push({ element: block, used: false });
  }
}

function allocateBit() {
  const free = bitmapBlocks.find(b => !b.used);
  if (free) {
    free.used = true;
    free.element.classList.add('used');
    free.element.textContent = '0';
  } else alert("No free blocks available!");
}

function freeBit() {
  const usedBlocks = bitmapBlocks.filter(b => b.used);
  if (usedBlocks.length > 0) {
    const randomIndex = Math.floor(Math.random() * usedBlocks.length);
    const block = usedBlocks[randomIndex];
    block.used = false;
    block.element.classList.remove('used');
    block.element.textContent = '1';
  } else alert("All blocks are free!");
}

function resetBits() {
  bitmapBlocks.forEach(b => {
    b.used = false;
    b.element.classList.remove('used');
    b.element.textContent = '1';
  });
}
