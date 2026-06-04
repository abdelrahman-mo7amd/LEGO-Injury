function selectBrick(el) {
    document.querySelectorAll('#brick-grid .brick-grid').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    state.brick = el.dataset.brick;
    state.brickPain = parseInt(el.dataset.pain);
    state.brickEmoji = el.dataset.emoji;
    animatePainMeter(state.brickPain);
    spawnFloatingEmoji(el, el.dataset.emoji);
    checkSetupReady();
    soundBrickDrop();
    updateTicker();
}

function selectTime(el) {
    document.querySelectorAll('#time-grid .choice-card').forEach(c=> c.classList.remove('selected'));
    el.classList.add('selected');
    state.time = el.dataset.time;
    checkSetupReady();
}

function selectChip(el, rowId) {
    document.querySelectorAll('#' + rowId + ' .eq-chip').forEach(c=> c.classList.remove('selected'));
    el.classList.add('selected');
    if (rowId === 'sock-row') {
        state.sock = el.dataset.sock;
    } 
    if (rowId === 'blame-row') {
        state.blame = el.dataset.blame;
    }

    checkSetupReady();
}

function checkSetupReady() {
    state.name = document.getElementById('vic-name').value.trim();
    const ready = state.name && state.brick && state.time && state.sock && state.blame;
    document.getElementById('btn-next-setup').disabled = !ready;
    return ready;
}

function resetPainMeter() {
    document.getElementById('pain-fill').style.width = '0%';
    document.getElementById('pain-emoji').textContent = '';
    document.getElementById('pain-verdict').textContent = '';
}

function animatePainMeter(pain) {
    const fill = document.getElementById('pain-fill');
    fill.style.width = pain + '%';
    fill.style.background = pain >= 90 ? '#8b0000':
        pain >= 70 ? 'var(--red)':
        pain >= 45 ? '#ff8c00':
        'var(--green)';
    const tier = pain >= 90 ? 'max' : pain >= 70? 'high' : pain >= 45? 'mid': 'low';
    document.getElementById('pain-emoji').textContent = { low: '😐', mid: '😬', high: '😭', max: '💀' }[tier];
    document.getElementById('pain-verdict').textContent = pick(PAIN_VERDICTS[tier]);
}

