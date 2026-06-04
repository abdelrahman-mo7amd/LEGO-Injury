// App Initialising
const LOADING_MESSAGES = [
    "Scattering bricks on the floor...",
    "Confirming no shows were present...",
    "Preparing official paperwork...",
    "Hiring a LEGO pain specialist...",
    "Filing case with Brickland NHS...",
    "Initialising Certificate Printer™...",
];

function boot() {
    let msgIdx = 0;
    const msgEl = document.getElementById('loading-msg');
    const msgInterval = setInterval(() => {
        msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
        if (msgEl) msgEl.textContent = LOADING_MESSAGES[msgIdx];
    }, 280);

    setTimeout(() => {
        clearInterval(msgInterval);
        const overlay = document.getElementById('loading-overlay');
        overlay.classList.add('fade');
        setTimeout(() => overlay.remove(), 600);
    }, 1900);

    buildIntroBricks();

    showScreen('screen-intro');
    updateTicker();

    const vicName = document.getElementById('vic-name');
    if (vicName) {
        vicName.addEventListener('input', checkSetupReady);
        vicName.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !document.getElementById('btn-next-setup').disabled) {
                goToCrimeScene();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', boot);