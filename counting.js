const COUNT_TOTAL_BLOCKS = 20;
const countingContainer = document.getElementById('counting-container');
const countingBlocks = [];

function initCounting() {
  if (!countingContainer) return;

  countingContainer.innerHTML = '';
  countingBlocks.length = 0;

  // Create 20 free blocks (initially all are free)
  for (let i = 0; i < COUNT_TOTAL_BLOCKS; i++) {
    const block = document.createElement('div');
    block.classList.add('bit-block');
    block.dataset.index = i;
    block.textContent = ''; // Will be filled with count
    countingContainer.appendChild(block);

    countingBlocks.push({ element: block, used: false });
  }

  updateCountingDisplay();
}

function updateCountingDisplay() {
  let i = 0;
  while (i < COUNT_TOTAL_BLOCKS) {
    if (countingBlocks[i].used) {
      countingBlocks[i].element.classList.add('used');
      countingBlocks[i].element.textContent = '';
      i++;
    } else {
      // Count contiguous free blocks
      let count = 0;
      while (i + count < COUNT_TOTAL_BLOCKS && !countingBlocks[i + count].used) {
        count++;
      }
      for (let j = 0; j < count; j++) {
        countingBlocks[i + j].element.classList.remove('used');
        countingBlocks[i + j].element.textContent = j === 0 ? count : '';
      }
      i += count;
    }
  }
}

function allocateCounting() {
  const needed = 3; // example: always try to allocate 3 blocks

  let i = 0;
  while (i < COUNT_TOTAL_BLOCKS) {
    if (!countingBlocks[i].used) {
      let count = 0;
      while (i + count < COUNT_TOTAL_BLOCKS && !countingBlocks[i + count].used) {
        count++;
      }

      if (count >= needed) {
        for (let j = 0; j < needed; j++) {
          countingBlocks[i + j].used = true;
        }
        updateCountingDisplay();
        return;
      } else {
        i += count;
      }
    } else {
      i++;
    }
  }

  alert("No sufficient free block group found.");
}

function freeCounting() {
  const usedIndices = countingBlocks
    .map((b, i) => (b.used ? i : -1))
    .filter(i => i !== -1);

  if (usedIndices.length === 0) {
    alert("No blocks to free!");
    return;
  }

  // Free a random used block group of 3
  const rand = usedIndices[Math.floor(Math.random() * usedIndices.length)];
  const base = rand - (rand % 3); // try to free 3-aligned group

  for (let i = base; i < base + 3 && i < COUNT_TOTAL_BLOCKS; i++) {
    if (countingBlocks[i].used) {
      countingBlocks[i].used = false;
    }
  }

  updateCountingDisplay();
}

function resetCounting() {
  for (let i = 0; i < COUNT_TOTAL_BLOCKS; i++) {
    countingBlocks[i].used = false;
  }
  updateCountingDisplay();
}
