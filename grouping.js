const GROUP_TOTAL_BLOCKS = 16;
const GROUP_HEADS = 4;
const GROUP_MEMBERS = 3;

const groupBlocks = [];
let groupAllocIndex = -1;

function initGrouping() {
  const container = document.getElementById('grouping-container');
  if (!container) return;

  container.innerHTML = '';
  groupBlocks.length = 0;
  groupAllocIndex = -1;

  for (let g = 0; g < GROUP_HEADS; g++) {
    // Head block (outside dashed box)
    const head = createBlock(`H${g}`, 'head');
    container.appendChild(head);

    const headArrow = document.createElement('span');
    headArrow.classList.add('arrow');
    headArrow.textContent = '→';
    container.appendChild(headArrow);

    const groupWrapper = document.createElement('div');
    groupWrapper.classList.add('group-wrapper');

    for (let m = 0; m < GROUP_MEMBERS; m++) {
      const id = `B${g * GROUP_MEMBERS + m}`;
      const member = createBlock(id, 'member');
      groupWrapper.appendChild(member);
      groupBlocks.push({ element: member, used: false, group: g });
    }

    // arrow to next head (for all but last)
    if (g < GROUP_HEADS - 1) {
      const arrow = document.createElement('span');
      arrow.classList.add('arrow');
      arrow.textContent = '→';
      groupWrapper.appendChild(arrow);

      const nextHead = document.createElement('div');
      nextHead.classList.add('bit-block', 'head');
      nextHead.textContent = `H${g + 1}`;
      nextHead.style.opacity = '0.5';
      nextHead.style.pointerEvents = 'none';
      groupWrapper.appendChild(nextHead);
    }

    container.appendChild(groupWrapper);
  }
}

function createBlock(label, type) {
  const div = document.createElement('div');
  div.classList.add('bit-block');
  div.textContent = label;
  div.style.margin = '0 5px';

  if (type === 'head') {
    div.classList.add('head');
  } else if (type === 'member') {
    div.classList.add('member');
  }

  return div;
}

function allocateGroup() {
  if (groupAllocIndex >= GROUP_HEADS - 1) {
    alert("All groups allocated!");
    return;
  }

  groupAllocIndex++;
  const start = groupAllocIndex * GROUP_MEMBERS;
  const end = start + GROUP_MEMBERS;

  for (let i = start; i < end; i++) {
    groupBlocks[i].used = true;
    groupBlocks[i].element.classList.add('used');
  }
}

function freeGroup() {
  if (groupAllocIndex < 0) {
    alert("No groups to free!");
    return;
  }

  const start = groupAllocIndex * GROUP_MEMBERS;
  const end = start + GROUP_MEMBERS;

  for (let i = start; i < end; i++) {
    groupBlocks[i].used = false;
    groupBlocks[i].element.classList.remove('used');
  }

  groupAllocIndex--;
}

function resetGroup() {
  groupBlocks.forEach(block => {
    block.used = false;
    block.element.classList.remove('used');
  });
  groupAllocIndex = -1;
}
