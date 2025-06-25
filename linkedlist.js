const linkedContainer = document.getElementById('linked-container');
const linkedBlocks = [];
const linkedArrows = [];

function initLinked() {
  linkedContainer.innerHTML = '';
  linkedBlocks.length = 0;
  linkedArrows.length = 0;
  for (let i = 0; i < TOTAL_BLOCKS; i++) {
    const block = document.createElement('div');
    block.classList.add('link-block');
    block.textContent = i;
    linkedContainer.appendChild(block);
    linkedBlocks.push({ element: block, used: false });

    if (i < TOTAL_BLOCKS - 1) {
      const arrow = document.createElement('span');
      arrow.classList.add('arrow');
      arrow.textContent = '→';
      linkedContainer.appendChild(arrow);
      linkedArrows.push(arrow);
    }
  }
}

function updateArrows() {
  for (let i = 0; i < linkedArrows.length; i++) {
    const currUsed = linkedBlocks[i].used;
    const nextUsed = linkedBlocks[i + 1]?.used;
    linkedArrows[i].style.display = (!currUsed && !nextUsed) ? 'inline-block' : 'none';
  }
}

function allocateLinked() {
  const head = linkedBlocks.find(b => !b.used);
  if (head) {
    head.used = true;
    head.element.classList.add('used');
    updateArrows();
  } else alert("No free blocks available!");
}

function freeLinked() {
  const headIndex = linkedBlocks.findIndex(b => !b.used);
  if (headIndex > 0) {
    const toFree = linkedBlocks[headIndex - 1];
    toFree.used = false;
    toFree.element.classList.remove('used');
    updateArrows();
  } else if (headIndex === -1) {
    const lastUsed = [...linkedBlocks].reverse().find(b => b.used);
    if (lastUsed) {
      lastUsed.used = false;
      lastUsed.element.classList.remove('used');
      updateArrows();
    } else alert("Nothing to free!");
  } else alert("Nothing to free!");
}

function resetLinked() {
  linkedBlocks.forEach(b => {
    b.used = false;
    b.element.classList.remove('used');
  });
  updateArrows();
}
