function addRow(key = '', alphabet = '', ipa = '') {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input class="key" value="${key}"></td>
    <td><input class="alphabet" value="${alphabet}"></td>
    <td><input class="ipa" value="${ipa}"></td>
  `;
  document.getElementById('mappingTable').appendChild(row);
}

function saveScript() {
  const lang = document.getElementById('langName').value;
  const keys = [...document.querySelectorAll('.key')];
  const alphabets = [...document.querySelectorAll('.alphabet')];
  const ipas = [...document.querySelectorAll('.ipa')];

  const entries = keys.map((_, i) => ({
    key: keys[i].value,
    alphabet: alphabets[i].value,
    ipa: ipas[i].value || undefined
  }));

  const stored = JSON.parse(localStorage.getItem('scripts') || '{}');
  stored[lang] = entries;
  localStorage.setItem('scripts', JSON.stringify(stored));
  alert('Script saved to localStorage!');
}
