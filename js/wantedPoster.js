function buildWantedPoster() {
  const b = state.brick || 'Unknown Brick';
  const emoji = state.brickEmoji || '🧱';

  document.getElementById('wp-mugshot-emoji').textContent = emoji;
  document.getElementById('wp-name').textContent = b.split('(')[0].trim().toUpperCase();
  document.getElementById('wp-aka').textContent  = 'AKA: ' + (BRICK_ALIASES[b] || '"The Brick"');

  const reward = (state.brickPain * 23 + Math.floor(Math.random() * 1000) + 500).toLocaleString();
  document.getElementById('wp-reward-amt').textContent = reward;

  const fields = [
    ['Height', '9.6mm (standard) / 3.2mm (plate)'],
    ['Weight', 'Negligible (that is the problem)'],
    ['Material', 'ABS Plastic — Grade A Foot Destroyer'],
    ['Origin', 'Billund, Denmark'],
    ['Last Seen', state.time ? state.time.split('—')[0].trim() : 'Unknown'],
    ['Victim', state.name || 'Unknown']
  ];

  document.getElementById('wp-fields').innerHTML = fields.map(([l, v]) =>
    `<div class="wp-field">
       <div class="wp-field-label">${l}</div>
       <div class="wp-field-value">${v}</div>
     </div>`
  ).join('');

  const rawCharges = BRICK_CHARGES[b];
  const charges = Array.isArray(rawCharges)
    ? rawCharges
    : ['Aggravated foot assault', 'Domestic hazard creation', 'General menace to humanity'];

  document.getElementById('wp-charges-list').innerHTML = charges.map(c =>
    `<div class="wp-charge-item">${c}</div>`
  ).join('');
}