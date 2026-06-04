//NAVIGATION

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s=> s.classList.remove('active'));
    const el = document.getElementById(id);
    el.classList.add('active');
    el.scrollTop = 0;
}

function goToIntro() {
    state.name = '';
    state.brick = '';
    state.brickPain = 0;
    state.signed = false;
    state.sock = '';
    state.blame = '';
    document.querySelectorAll('.brick-card,.choice-card,.eq-chip').forEach(c=> c.classList.remove('selected'));
    document.getElementById('vic-name').value = '';
    document.getElementById('btn-next-setup').disabled = true;
    resetPainMeter();
    showScreen('screen-intro');
    updateProgress(0);
}

function goToSetup() {
    showScreen('screen-setup');
    updateProgress(12);
}

function goToCrimeScene() {
    if (!checkSetupReady()) {
        return;
    }

    updateTicker();
    checkAndAwardBadges();
    showScreen('screen-911');
    updateProgress(22);
    setTimeout(() => build911Screen(), 300);
    soundAlarm();
}

function goToReport() {
    buildCrimeScene();
    showScreen('screen-crime');
    updateProgress(40);
    setTimeout(()=>typeText('crime-notes-text', STORIES[state.brick] || 'A LEGO brick was involved. That is all we know.', 22), 400);
    soundBrickDrop();
}

function goToReportForm() {
    fillReportForm();
    showScreen('screen-report');
    updateProgress(58);
    soundClick();
}

function goToWaiting() {
    if (!state.signed) {
        return;
    }

    buildWaitingRoom();
    showScreen('screen-waiting');
    updateProgress(72);
    startWaitingAnimation();
}

function showResults() {
    fillResultsDocs();
    buildBadgesPanel();
    buildBrickIdCard();
    addToHall();
    checkAndAwardBadges();
    showScreen('screen-result');
    updateProgress(100);
    updateTicker();
    setTimeout(() => {
        document.getElementById('certificate').classList.add('show');
        document.getElementById('rx-stamp').classList.add('show');
        launchConfetti();
        soundCertificate();
    }, 300);
}

function goToHall() {
    state._prevScreen = document.querySelector('.screen.active')?.id || 'screen-intro';
    buildHallOfShame();
    showScreen('screen-hall');
}

function goBack() {
    showScreen(state._prevScreen || 'screen-intro');
}