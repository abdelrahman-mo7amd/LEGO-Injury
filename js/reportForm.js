function fillReportForm() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'});
    const caseNum = 'LEGO-' + Math.floor(Math.random() * 90000+ 10000);

    const diag = pick(DIAGNOSES);
    const icd = pick(ICD_CODES);
    let rx = [], pool = [...PRESCRIPTIONS];
    while (rx.length < 3 && pool.length) {
        const i = Math.floor(Math.random() * pool.length);
        rx.push(pool.slice(i,1)[0]);
    }

    state._diag = diag;
    state._icd = icd;
    state._rx = rx;
    state._date = dateStr;
    state._case = caseNum;
    state._score = state.brickPain * 100 + Math.floor(Math.random() * 500);

    document.getElementById('fi-name').textContent = state.name;
    document.getElementById('fi-date').textContent = state.time.split('-')[0].trim() + ', ' + dateStr;
    document.getElementById('fi-brick').textContent = state.brick;
    document.getElementById('fi-case').textContent = caseNum;
    document.getElementById('fi-sock').textContent = state.sock;
    document.getElementById('fi-blame').textContent = state.blame;
    document.getElementById('fi-diagnosis').textContent = diag;
    document.getElementById('fi-icd').textContent = icd;
    document.getElementById('fi-treatment').textContent = rx.slice(0, 2).join(' | ');
    document.getElementById('fi-story').value = STORIES[state.brick] || 'A LEGO brick was involved. The victim suffered.';
    document.getElementById('fi-cost-med').textContent = '£' + (Math.floor(Math.random() * 400) + 80).toLocaleString();
    document.getElementById('fi-cost-emo').textContent = '£' + (Math.floor(Math.random() * 2000) + 500).toLocaleString();
    document.getElementById('fi-cost-dig').textContent = '£' + (Math.floor(Math.random() * 5000) + 1000).toLocaleString();
    document.getElementById('sig-text').textContent = state.name;

    state.signed = false;
    document.getElementById('btn-submit').disabled = true;
}

function signReport(el) {
    state.signed = true;
    el.querySelector('.sig-text').style.opacity = '1';
    spawnFloatingEmoji(el, '✍️');
    showToast('Document Signed! ✍️');
    document.getElementById('btn-submit').disabled = false;
    soundSuccess();
}

