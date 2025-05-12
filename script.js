let currentMap = {};

async function loadScripts() {
  const res = await fetch('scripts.json');
  const data = await res.json();

  const selector = document.getElementById('scriptSelector');
  for (const lang in data) {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    selector.appendChild(option);
  }

  selector.addEventListener('change', () => {
    const selected = selector.value;
    currentMap = {};
    data[selected].forEach(entry => {
      currentMap[entry.key] = entry.alphabet;
    });
  });

  selector.value = Object.keys(data)[0];
  selector.dispatchEvent(new Event('change'));
}

document.addEventListener('DOMContentLoaded', () => {
  loadScripts();

  const input = document.getElementById('eyishInput');
  input.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    const key = event.key;
    if (currentMap[key]) {
      event.preventDefault();
      const cursor = input.selectionStart;
      const value = input.value;
      const replacement = currentMap[key];

      input.value = value.slice(0, cursor) + replacement + value.slice(cursor);
      input.selectionStart = input.selectionEnd = cursor + replacement.length;
    } else {
      event.preventDefault();
    }
  });
});
