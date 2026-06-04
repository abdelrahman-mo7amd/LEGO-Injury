function fillResultDocs() {
    document.getElementById('rxp-patient').textContent = state.name;
    document.getElementById('rxp-date').textContent = state._date;
    document.getElementById('rxp-diagnosis').textContent = state._diag;
    document.getElementById('rxp-license').textContent = Math.floor(Math.random() * 90000 + 10000);
    const list = document.getElementById('rxp-items');
    list.innerHTML = '';
    state._rx.forEach(r=> {
        const li = document.createElement('li');
        li.textContent = r;
        list.appendChild(li);
    });

    document.getElementById('cert-name').textContent = state.name;
    document.getElementById('cert-body-text').textContent = 'survived a direct encounter with a ' + state.brick.split('(')[0].trim() + ', completed an official Brickland NHS injury report, endured the waiting room, and displayed extraordinary resilience in the face of completely avoidable suffering.';

    const rankIdx = Math.min(RANKS.length-1, Math.floor(state.brickPain/20));
    state._rank = RANKS[rankIdx];
    document.getElementById('cert-rank').textContent = RANKS[rankIdx]; 
}

function addToHall() {
    if (!state.name) {
        return;
    }

    sessionSurvivors.push({
        name: state.name,
        brick: state.brick,
        rank: state._rank, 
        emoji: state.brickEmoji || '🧱',
        score: state._score,
        isYou: true
    });
}

function buildHallOfShame() {
    const all = [...FAKE_PATIENTS.map(p => ({ ...p, isYou: false })), ...sessionSurvivors].sort((a, b) => b.score - a.score);
    const list = document.getElementById('hall-entries');
    list.innerHTML = '';
    all.slice(0,9).forEach((e,i) => {
        const rc = i === 0 ? 'hall-rank-1' : i === 1?'hall-rank-2':i===2? 'hall-rank-3':'hall-rank';
        const div = document.createElement('div');
        div.className = 'hall-entry';
        if (e.isYou) {
            div.style.outline='2px solid var(--red)';
            div.style.borderRadius='4px';
        }

        div.innerHTML = `
            <div class="hall-rank ${rc}">#${i + 1}</div>
            <div class="hall-avatar">${e.emoji}</div>
            <div class="hall-info">
                <div class="hall-name">${e.name}${e.isYou ? ' ⭐' : ''}</div>
                <div class="hall-brick">${e.brick || 'Unknown brick'}</div>
            </div>
            <div class="hall-pts">${e.score.toLocaleString()}</div>`;

            list.appendChild(div);
    });

    const yourEntry = document.getElementById('hall-your-entry');
    const my = sessionSurvivors[sessionSurvivors.length-1];
    if (my) {
        yourEntry.classList.remove('hidden');
        const myRank = all.findIndex(e=>e.isYou && e.name===my.name)+1;
        document.getElementById('hall-your-entry-text').innerHTML = `You are ranked <strong style="color:var(--yellow)">#${myRank}</strong> out of ${all.length} survivors. <br>` + 
        `Rank: <strong style="color:var(--red)">${my.rank}</strong> | Pain score: <strong>${my.score.toLocaleString()}</strong>`;
    } else {
        yourEntry.classList.add('hidden');
    }
}

function downloadCertificate() {
    showToast('Preparing your certificate...');
    const cert = document.getElementById('certificate');
    html2canvas(cert, {
        scale:2,
        backgroundColor: '#fef9f0',
        useCORS: true,
        onclone: (doc) => {
            const c = doc.getElementById('certificate');
            if (c) {
                c.style.transform='none';
                c.style.opacity = '1';
            }
        }
    }).then(canvas=>{
        const link = document.createElement('a');
        link.download = 'LEGO Survivor Certificate - ('+(state.name || 'survivor').replace(/\s+/g,'-') + ').png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Certificate Downloaded!!');
    }).catch(() => showToast('Right-click the certificate to save it'));
}

function shareResult() {
    const text = 'I stepped on a LEGO brick and got an official Brickland NHS Certificate. \n' + state.name + '-' + state._rank + '\n' + 'Brick: ' + state.brick + '\n🧱 LEGO Injury Report';

    if (navigator.share) {
        navigator.share({ title: 'LEGO Survivor Certificate', text });
    } else {
        navigator.clipboard.writeText(text)
            .then(() => showToast('Copied! ✓'))
            .catch(() => showToast('Share this with your friends! 🧱'))
    }
}

// Brick ID Card 

function buildBrickIdCard() {
    const b = state.brick || 'Unknown Brick';
    document.getElementById('bic-photo').textContent = state.brickEmoji || '🧱';
    document.getElementById('bic-name').textContent = b.split('(')[0].trim();

    const classMap = {
        'Classic 2x4 Red Brick': 'Standard Brick | Type B',
        'Tiny 1x1 Transparent Plate': 'Micro Plate | Transparent',
        'Gray Technic Connector':'Technic | Cross Connector',
        'Giant Duplo Brick':'Duplo | Oversized Brick',
        'Sharp Technic Axle':  'Technic | Axle Rod',
        'Unknown Brick (it was dark)': 'Unknown | Classification Pending',
        'Multiple Bricks in Ambush Formation': 'Multi-Element | Formation Config',
        'LEGO Wheel (rolling hazard)': 'Vehicle | Wheel Assembly'
    };

    document.getElementById('bic-class').textContent = classMap[b] || 'Unclassified';
    document.getElementById('bic-danger').textContent = BRICK_DANGER[b] || 'UNKNOWN';
    document.getElementById('bic-serial').textContent = 'LG-' + Math.floor(Math.random() * 9000000 + 1000000);
    document.getElementById('bic-location').textContent = state.time ? state.time.split('-')[0].trim(): 'Unknown';

    const bc = document.getElementById('bic-barcode');
    bc.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const bar = document.createElement('div');
        bar.className = 'bic-bar';
        bar.style.height=(Math.random() * 20 + 8) + 'px';
        bar.style.width=(Math.random() > 0.7 ? 3:2) + 'px';
        bar.style.opacity=Math.random() >0.3 ? '1': '0.3';
        bc.appendChild(bar);
    }

    const statusEl = document.getElementById('bic-status');
    const pain = state.brickPain || 0;
    if (pain >= 90) {
        statusEl.style.background = '#8b0000';
        statusEl.textContent = 'EXTREME HAZARD';
    } else if (pain >=60 ) {
        statusEl.style.background = '#e3000b';
        statusEl.textContent = 'ACTIVE HAZARD';
    } else {
        statusEl.style.background = '#ff8c00';
        statusEl.textContent = 'MODERATE HAZARD';
    }
}

