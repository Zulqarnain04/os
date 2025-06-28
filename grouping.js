const GROUP_TOTAL_BLOCKS = 16;
const GROUP_HEADS = 4;
const GROUP_MEMBERS = 3; // Per group (excluding head)

const groupBlocks = [];
let groupAllocIndex = -1;

function initGrouping() {
  const container = document.getElementById('grouping-container');
  if (!container) return;

  container.innerHTML = '';
  groupBlocks.length = 0;
  groupAllocIndex = -1;

  for (let g = 0; g < GROUP_HEADS; g++) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.margin = '15px 0';

    // Head block
    const head = createBlock(`H${g}`, 'head');
    row.appendChild(head);

    // Arrow to group
    const headArrow = document.createElement('span');
    headArrow.classList.add('arrow');
    headArrow.textContent = '→';
    row.appendChild(headArrow);

    // Group box (dashed)
    const groupWrapper = document.createElement('div');
    groupWrapper.classList.add('group-wrapper');

    for (let m = 0; m < GROUP_MEMBERS; m++) {
      const id = `B${g * GROUP_MEMBERS + m}`;
      const member = createBlock(id, 'member');
      groupWrapper.appendChild(member);
      groupBlocks.push({ element: member, used: false, group: g });

      // If last member and not last group, show arrow to next head
      if (m === GROUP_MEMBERS - 1 && g < GROUP_HEADS - 1) {
        const arrow = document.createElement('span');
        arrow.classList.add('arrow');
        arrow.textContent = '→';
        groupWrapper.appendChild(arrow);

        const nextHeadTag = document.createElement('div');
        nextHeadTag.classList.add('bit-block', 'head');
        nextHeadTag.style.background = '#aaa';
        nextHeadTag.textContent = `H${g + 1}`;
        nextHeadTag.style.pointerEvents = 'none';
        nextHeadTag.style.opacity = 0.6;
        groupWrapper.appendChild(nextHeadTag);
      }
    }

    row.appendChild(groupWrapper);
    container.appendChild(row);
  }
}

function createBlock(label, type) {
  const div = document.createElement('div');
  div.classList.add('bit-block');
  div.style.margin = '0 5px';
  div.textContent = label;

  if (type === 'head') {
    div.style.backgroundColor = '#6a1b9a';
    div.style.color = 'white';
    div.style.fontWeight = 'bold';
  } else if (type === 'member') {
    div.style.backgroundColor = '#29b6f6';
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
