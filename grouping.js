const GROUP_TOTAL_BLOCKS = 16;
const GROUP_SIZE = 4;
const GROUP_HEADS = 4;
const GROUP_MEMBERS = 3;

const groupingContainer = document.createElement('div');
groupingContainer.classList.add('container');
groupingContainer.style.flexDirection = 'column';
document.body.appendChild(groupingContainer);

const groupBlocks = [];
let groupAllocIndex = -1;

function initGrouping() {
  const section = document.getElementById('grouping');
  if (!section) return;

  section.innerHTML = '<h2>🧱 Grouping Simulation</h2>';
  section.appendChild(groupingContainer);
  groupingContainer.innerHTML = '';
  groupBlocks.length = 0;
  groupAllocIndex = -1;

  for (let g = 0; g < GROUP_HEADS; g++) {
    const groupBox = document.createElement('div');
    groupBox.style.display = 'flex';
    groupBox.style.alignItems = 'center';
    groupBox.style.border = '2px dashed #aaa';
    groupBox.style.padding = '10px';
    groupBox.style.margin = '10px';
    groupBox.style.borderRadius = '10px';
    groupBox.style.justifyContent = 'center';

    const head = createBlock(`H${g}`, 'head');
    groupingContainer.appendChild(head);
    groupingContainer.appendChild(document.createTextNode('→'));

    for (let m = 0; m < GROUP_MEMBERS; m++) {
      const blockId = `B${g * GROUP_MEMBERS + m}`;
      const member = createBlock(blockId, 'member');
      groupBox.appendChild(member);
      groupBlocks.push({ element: member, used: false, group: g });
    }

    // Add arrow from last member to next head (except last group)
    if (g < GROUP_HEADS - 1) {
      const arrow = document.createElement('span');
      arrow.classList.add('arrow');
      arrow.textContent = '→';
      groupBox.appendChild(arrow);

      const nextHead = document.createElement('div');
      nextHead.classList.add('bit-block');
      nextHead.textContent = `H${g + 1}`;
      nextHead.style.background = '#777';
      nextHead.style.color = 'white';
      nextHead.style.marginLeft = '10px';
      nextHead.style.pointerEvents = 'none';
      groupBox.appendChild(nextHead);
    }

    groupingContainer.appendChild(groupBox);
  }

  const btns = document.createElement('div');
  btns.classList.add('btn-group');
  btns.innerHTML = `
    <button onclick="allocateGroup()">Allocate Group</button>
    <button onclick="freeGroup()">Free Group</button>
    <button onclick="resetGroup()">Reset</button>
  `;
  section.appendChild(btns);
}

function createBlock(text, type) {
  const div = document.createElement('div');
  div.classList.add('bit-block');
  div.style.margin = '0 5px';
  div.textContent = text;
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
  const groupStart = groupAllocIndex * GROUP_MEMBERS;
  for (let i = groupStart; i < groupStart + GROUP_MEMBERS; i++) {
    groupBlocks[i].used = true;
    groupBlocks[i].element.classList.add('used');
  }
}

function freeGroup() {
  if (groupAllocIndex < 0) {
    alert("No groups to free!");
    return;
  }
  const groupStart = groupAllocIndex * GROUP_MEMBERS;
  for (let i = groupStart; i < groupStart + GROUP_MEMBERS; i++) {
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
