let scripts = {};
let currentMap = {};
let entries = [];

window.onload = () => {
  loadScripts();
  document.getElementById('toggleViewBtn').addEventListener('click', toggleView);
  document.addEventListener('keydown', handleKeyPress);
};

function toggleView() {
  const typing = document.getElementById('typingView');
  const creator = document.getElementById('creatorView');
  const btn = document.getElementById('toggleViewBtn');
  if (typing.style.display === 'none') {
    typing.style.display = '';
    creator.style.display = 'none';
    btn.textContent = 'Switch to Script Creator';
  } else {
    typing.style.display = 'none';
    creator.style.display = '';
    btn.textContent = 'Switch to Typing Interface';
  }
}

function loadScripts() {
  const saved = localStorage.getItem('conlang_scripts');
  if (saved) scripts = JSON.parse(saved);

  const selector = document.getElementById('scriptSelector');
  selector.innerHTML = '';

  for (const name in scripts) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    selector.appendChild(option);
  }

  if (selector.options.length > 0) {
    selector.value = Object.keys(scripts)[0];
    selector.dispatchEvent(new Event('change'));
  }

  selector.addEventListener('change', () => {
    const selected = selector.value;
    currentMap = {};
    scripts[selected].forEach(entry => {
      currentMap[entry.key.toLowerCase()] = entry.alphabet;
    });
  });
}

function handleKeyPress(event) {
  const textarea = document.getElementById('outputArea');
  const key = event.key.toLowerCase();

  if (event.key === 'Backspace') {
    textarea.value = textarea.value.slice(0, -1);
    return;
  }

  if (currentMap[key]) {
    textarea.value += currentMap[key];
  }

  event.preventDefault();
}

function addEntry() {
  const key = document.getElementById('keyInput').value.trim();
  const alphabet = document.getElementById('alphabetInput').value.trim();
  const ipa = document.getElementById('ipaInput').value.trim();

  if (!key || !alphabet) return alert('Key and Alphabet are required.');

  entries.push({ key, alphabet, ipa });
  updateEntryTable();

  document.getElementById('keyInput').value = '';
  document.getElementById('alphabetInput').value = '';
  document.getElementById('ipaInput').value = '';
}

function updateEntryTable() {
  const table = document.getElementById('entryTableBody');
  table.innerHTML = '';
  entries.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.key}</td>
      <td>${entry.alphabet}</td>
      <td>${entry.ipa || ''}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteEntry(${index})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

function deleteEntry(index) {
  entries.splice(index, 1);
  updateEntryTable();
}

function saveScript() {
  const name = document.getElementById('scriptName').value.trim();
  if (!name) return alert('Please enter a script name.');
  if (entries.length === 0) return alert('No entries to save.');

  scripts[name] = entries;
  localStorage.setItem('conlang_scripts', JSON.stringify(scripts));

  entries = [];
  updateEntryTable();
  loadScripts();
  alert(`Script "${name}" saved!`);
}
