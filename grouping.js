const GROUP_TOTAL_BLOCKS = 16;
const GROUP_HEADS = 4;
const GROUP_MEMBERS = 3; // Per group (excluding head)

const groupBlocks = [];
let groupAllocIndex = -1;

function initGrouping() {
  const container = document.getElementById('grouping-container');
  if (!container) return;

  container.innerHTML = ''; // Clear previous content if re-initializing
  groupBlocks.length = 0;
  groupAllocIndex = -1;

  for (let g = 0; g < GROUP_HEADS; g++) {
    const groupWrapper = document.createElement('div');
    groupWrapper.style.display = 'flex';
    groupWrapper.style.alignItems = 'center';
    groupWrapper.style.border = '2px dashed #aaa';
    groupWrapper.style.padding = '10px';
    groupWrapper.style.margin = '10px 0';
    groupWrapper.style.borderRadius = '10px';
    groupWrapper.style.justifyContent = 'center';

    // Create head block (outside the dashed group box)
    const head = createBlock(`H${g}`, 'head');
    container.appendChild(head);

    // Arrow from head to group
    const headArrow = document.createElement('span');
    headArrow.classList.add('arrow');
    headArrow.textContent = '→';
    container.appendChild(headArrow);

    // Group members
    for (let m = 0; m < GROUP_MEMBERS; m++) {
      const id = `B${g * GROUP_MEMBERS + m}`;
      const member = createBlock(id, 'member');
      groupWrapper.appendChild(member);
      groupBlocks.push({ element: member, used: false, group: g });
    }

    // For groups 0 to 2, last member points to next head
    if (g < GROUP_HEADS - 1) {
      const arrow = document.createElement('span');
      arrow.classList.add('arrow');
      arrow.textContent = '→';
      groupWrapper.appendChild(arrow);

      const nextHead = document.createElement('div');
      nextHead.classList.add('bit-block');
      nextHead.textContent = `H${g + 1}`;
      nextHead.style.background = '#777';
      nextHead.style.color = 'white';
      nextHead.style.marginLeft = '10px';
      nextHead.style.pointerEvents = 'none';
      groupWrapper.appendChild(nextHead);
    }

    container.appendChild(groupWrapper);
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
