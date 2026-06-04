// 911 call screen
let callStep = 0;
let callTimer = null;
let callSeconds = 0;
let callInterval = null;

function build911Screen() {
    const transcript = document.getElementById('s911-transcript');
    transcript.innerHTML = '';
    callStep = 0;
    callSeconds = 0;

    clearInterval(callInterval);
    clearTimeout(callTimer);

    document.getElementById('s911-call-dur').textContent = '00:00';
    document.getElementById('s911-next-btn').style.display = 'none';
    document.getElementById('s911-typing').style.display = 'none';

    callInterval = setInterval(() => {
        callSeconds++;
        const m = String(Math.floor(callSeconds/ 60)).padStart(2, '0');
        const s = String(callSeconds % 60).padStart(2, '0');
        document.getElementById('s911-call-dur').textContent = m + ':' + s;
    }, 1000);

    soundAlarm();
    playNextLine();
}


function playNextLine() {
    if (callStep >= CALL_SCRIPT.length) {
        clearInterval(callInterval);
        document.getElementById('s911-typing').style.display = 'none';
        document.getElementById('s911-next-btn').style.display = 'block';
        return;
    }

    const line = CALL_SCRIPT[callStep];
    const text = typeof line.text === 'function' ? line.text() : line.text;
    const transcript = document.getElementById('s911-transcript')
    const typing = document.getElementById('s911-typing');

    if (line.role === 'operator'){
        typing.style.display = 'flex';
        callTimer = setTimeout(() => {
            typing.style.display = 'none';
            addMessage(transcript, 'operator', 'OPERATOR', text);
            soundClick();
            callStep++;
            callTimer = setTimeout(playNextLine, 600);
        }, 1200 + Math.random() * 600);
    } else {
        typing.style.display = 'none';
        callTimer = setTimeout(() => {
            addMessage(transcript, 'caller', 'YOU', text);
            if (soundOn) {
                playTone(440, 0.04,'sine', 0.08);
            }
            callStep++;
            callTimer = setTimeout(playNextLine, 400);
        }, 800);
    }
}

function addMessage (container, role, label, text) {
    const div = document.createElement('div');
    div.classList='msg '+role;
    div.innerHTML = `<div class="msg-label">${label}</div><div class="msg-bubble">${text}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function go911Next() {
    clearInterval(callInterval);
    clearTimeout(callTimer);
    buildWantedPoster();
    showScreen('screen-wanted');
    updateProgress(40);
    soundBrickDrop();
}


