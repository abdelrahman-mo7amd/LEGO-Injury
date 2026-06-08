let waitTimer = null;
function buildWaitingRoom() {
    const list = document.getElementById('queue-list');
    list.innerHTML = '';

    const youItem = {name: state.name, emoji: state.brickEmoji || '🧱', complaint: "That's you. Hang tight.", isYou: true};
    [...QUEUE_PATIENTS, youItem].forEach((p,i) => {
        const div = document.createElement('div');
        div.className = 'queue-item waiting';
        div.id = 'qi-' + i;
        div.innerHTML = `
        <div class="qi-num waiting" id="qin-${i}">#${i+1}</div>
        <div class="qi-avatar">${p.emoji}</div>
        <div class="qi-info">
            <div class="qi-name">${p.isYou ? '<strong>' + p.name + ' (YOU)</strong>': p.name}</div>
            <div class="qi-status waiting" id="qis-${i}">${p.complaint}</div>
        </div>
        <div class="qi-badge waiting" id="qib-${i}">WAITING</div>
        `;
        list.appendChild(div);
    });

    document.getElementById('queue-count').textContent= (QUEUE_PATIENTS.length+1)+" in queue";
    document.getElementById('you-turn-btn').style.display = 'none';
    document.getElementById('you-status-emoji').textContent = '⏳';
    document.getElementById('you-status-text').textContent = 'PLEASE WAIT';
    document.getElementById('you-status-sub').textContent = 'Your case is being reviewed by a certified LEGO pain expert. Average wait: 3-5 minutes. (We are very backed up.)';
    document.getElementById('waiting-fact').textContent = '🧱 Fun fact: '+ pick(WAIT_FACTS);
}

function startWaitingAnimation() {
    clearTimeout(waitTimer);
    let step = 0;
    const total = QUEUE_PATIENTS.length;

    function next() {
        if (step>=total) {
            yourTurn();
            return;
        }

        const i = step;
        const item = document.getElementById('qi-'+i);

        if (item){
            item.className = 'queue-item active';
            document.getElementById('qin-'+i).className = 'qi-num active';
            document.getElementById('qis-'+i).className = 'qi-status active';
            document.getElementById('qis-'+i).textContent = 'Being treated now...';
            document.getElementById('qib-'+i).className = 'qi-badge active';
            document.getElementById('qib-'+i).textContent = 'IN TREATMENT';
        }

        waitTimer = setTimeout(() => {
            if (item) {
                item.className = 'queue-item done';
                document.getElementById('qin-' + i).className= 'qi-num done';
                document.getElementById('qis-' + i).className = 'qi-status done';
                document.getElementById('qis-' + i).textContent = 'Treated & discharged ✓';
                document.getElementById('qib-' + i).className = 'qi-badge done';
                document.getElementById('qib-' + i).textContent = 'DONE'; 
            }

            step++;
            const rem = total - step;
            document.getElementById('queue-count').textContent = (rem+1)+' in queue';
            if (rem > 0) {
                document.getElementById('you-status-sub').textContent = rem + ' patient' + (rem > 1 ? 's':'')+ ' ahead of you. Hold tight.';
            }
            waitTimer = setTimeout(next, 1800)
        }, 2400);
    }

    waitTimer = setTimeout(next, 1000);
}

function yourTurn() {
    const youIdx = QUEUE_PATIENTS.length;
    const item = document.getElementById('qi-' + youIdx);

    if (item ) {
        item.className 
        document.getElementById('qin-' + youIdx).className = 'qi-num active';
        document.getElementById('qis-' + youIdx).className = 'qi-status active';
        document.getElementById('qis-' + youIdx).textContent = 'IT IS YOUR TURN!';
        document.getElementById('qib-' + youIdx).className = 'qi-badge active';
        document.getElementById('qib-' + youIdx).textContent = 'YOUR TURN';
    }

    document.getElementById('you-status-emoji').textContent = '🎉';
    document.getElementById('you-status-text').textContent = 'IT IS YOUR TURN!';
    document.getElementById('you-status-sub').textContent = 'The doctor is ready. Please proceed to the certificate collection window.';
    document.getElementById('you-turn-btn').style.display = 'block';
    document.getElementById('queue-count').textContent = '1 in queue (just you)';
    launchConfetti();
}

