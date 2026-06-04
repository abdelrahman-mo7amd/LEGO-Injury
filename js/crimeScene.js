function buildCrimeScene() {
    const colorMap = {
        "Classic 2x4 Red Brick": '#e3000b',
        "Tiny 1x1 Transparent Plate": 'rgba(200, 230, 255, 0.7)',
        "Gray Technic Connector": "#888",
        "Giant Duplo Brick": "#0055a5",
        "Sharp Technic Axle": "#999",
        "Unknown Brick (it was dark)": "#333",
        "Multiple Bricks in Ambush Formation": "multi",
        "LEGO Wheel (rolling hazard)": "#222", 
    };

    const col = colorMap[state.brick] || '#e3000b';
    let brickSVG = '';

    if (state.brick.includes('Ambush')) {
        const cs = ['#e3000b', '#0055a5', '#ffcc00', '#00a550', '#ff6b00'];
        [[80,100], [165,78], [245,102],[125,142],[205,128],[98,162]].forEach((p,i) => {
            brickSVG += `
            <rect x="${p[0]}" y="${p[1]}" width="44" height="24" rx="3"
                fill="${cs[i % cs.length]}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5"/>
            <circle cx="${p[0]+10}" cy="${p[1]+10}" r="4" fill="rgba(255,255,255,0.25)"/>
            <circle cx="${p[0]+22}" cy="${p[1]+10}" r="4" fill="rgba(255,255,255,0.25)"/>
            <circle cx="${p[0]+34}" cy="${p[1]+10}" r="4" fill="rgba(255,255,255,0.25)"/>
            `;
        });
    } else if (state.brick.includes('Wheel')) {
        brickSVG = `
        <circle cx="180" cy="128" r="40" fill="#1a1a1a" stroke="#444" stroke-width="3"/>
        <circle cx="180" cy="128" r="10" fill="#777"/>
        <circle cx="180" cy="128" r="28" fill="#333" stroke="#555" stroke-width="2"/>
        <line x1="152" y1="128" x2="208" y2="128" stroke="#555" stroke-width="2"/>
        <line x1="180" y1="100" x2="180" y2="156" stroke="#555" stroke-width="2"/>
        `;
    } else if (state.brick.includes('Axle')) {
        brickSVG = `
            <line x1="130" y1="90" x2="230" y2="168" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
            <polygon points="228,156 240,178 216,174" fill="#ddd"/>
            <circle cx="134" cy="94" r="6" fill="#999"/>`;
    } else {
        const small = state.brick.includes('1x1');
        const w = small ? 16 : state.brick.includes('Duplo') ? 80 : 56;
        const h = small ? 16 : state.brick.includes('Duplo') ? 32 : 26;
        const x = 180 - w / 2;
        const y = 120 - h / 2;
        const studs = small ? 1 : state.brick.includes('Duplo') ? 2 : 3;
        let s = '';
        for (let i = 0; i < studs; i++) {
            const sx = x + 10 + i * (w * 0.85 / studs);
            const studFill = col === 'rgba(200,230,255,0.7)' ? 'rgba(180, 210, 240, 0.8)' : col;
            s += `<circle cx ="${sx}" cy="${y - 5}" r="${small ? 4: 5}" fill="${studFill}" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>`;
        }
        brickSVG = `
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"
                fill="${col}" stroke="rgba(0,0,0,0.4)" stroke-width="2"/>
            ${s}`;
    }

    const labelFill = col === 'rgba(200,230,255,0.7)' ? '#cccccc' : '#ffcc00';
    const gridLines = Array.from({length:7}, (_,i) => `<line x1="${i * 60}" y1="200" x2="${i*60}" y2="260" stroke="#141414" stroke-width="1"/>`).join('');
    const hLines = Array.from({length: 3} , (_,i) => `<line x1="0" y1="${200+i*20}" x2="360" y2="${200+i*20}" stroke="#14144" stroke-width="1"/>`).join('');

    document.getElementById('crime-svg-wrap').innerHTML = `
    <svg viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg"
         style="width:100%;max-width:440px;display:block;margin:0 auto">
      <rect width="360" height="260" fill="#0a0a0a"/>
      <line x1="0" y1="200" x2="360" y2="200" stroke="#1a1a1a" stroke-width="1"/>
      ${gridLines}
      ${hLines}
      <ellipse cx="180" cy="197" rx="45" ry="7" fill="rgba(0,0,0,0.6)"/>
      <ellipse cx="180" cy="172" rx="40" ry="23" fill="none"
        stroke="rgba(255,255,255,0.1)" stroke-width="1.5" stroke-dasharray="4,3"/>
      ${brickSVG}
      <rect x="10" y="10" width="64" height="22" fill="${labelFill}" rx="2"/>
      <text x="42" y="25" text-anchor="middle" fill="#1a1a1a"
        font-size="10" font-family="'Bebas Neue',sans-serif" letter-spacing="1">EXHIBIT A</text>
      <rect x="288" y="213" width="40" height="8" fill="none" stroke="#333" stroke-width="1"/>
      <text x="308" y="208" text-anchor="middle" fill="#333" font-size="7" font-family="monospace">1:1 SCALE</text>
    </svg>
    `;
}