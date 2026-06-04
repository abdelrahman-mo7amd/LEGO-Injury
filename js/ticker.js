function updateTicker () {
    const n =state.name || "Unknown Victim";
    const b = state.brick || "Unknown Brick";
    const t = state.time ? state.time.split('-')[0].trim() : "unknown hours";

    const all = TICKER_TEMPLATES.map(tp => tp.replace('{name}', n.toUpperCase())
    .replace('{brick}', b.toUpperCase())
    .replace('{time}', t.toUpperCase())
    ).join('  |  ');

    document.getElementById('ticker-text').textContent = all;
}