const state = {
    name: '',
    brick:'',
    brickPain:0,
    brickEmoji:'🧱',
    time:'',
    sock:'',
    blame:'',
    signed:false,
    _diag:'',
    _icd:'',
    _rx:[],
    _date:'',
    _case:'',
    _rank:'',
    _score:0,
    _prevScreen:'screen-intro'
};

let sessionSurvivors=[];

const DIAGNOSES=["Acute Podiatric LEGO Trauma (APLT)","Stud Impression Syndrome (SIS)","Nocturnal Navigation Failure (NNF)","Critical 1×1 Encounter Disorder","Post-Traumatic Brick Stress (PTBS)","Technic Connector Penetration (TCP)","Preventable Self-Inflicted Suffering","Domestic Hazard Overexposure (DHO)"];
const ICD_CODES=["S90.112A — LEGO stud contusion, initial encounter","W22.19XA — Struck by small plastic building element","Z91.89 — Personal history of preventable suffering","X58.XXXA — Domestic construction toy hazard exposure","F43.12 — Post-traumatic brick stress disorder","T14.90XA — Unspecified LEGO-related foot injury"];
const PRESCRIPTIONS=["Wear shoes at all hours, including inside the house","Scream once, loudly, then move on (1× per incident, supervised)","Write a strongly-worded letter to LEGO HQ, Billund, Denmark","Install infrared brick-detection floor sensors (patent pending)","30-day ban from walking barefoot near toy areas","Night vision goggles — wear them at all times, no exceptions","LEGO floor sweep ritual, 3× daily, before every meal","Acknowledge that socks exist and are completely free","Meditate on the impermanence of toe comfort","Sue the brick (small claims court, jurisdiction: Denmark)","Mandatory sock subscription box — monthly, auto-renewing","Seek counselling for denial of brick-related dangers"];
const RANKS=["LEGO SURVIVOR — BASIC CLASS","CERTIFIED BRICK VICTIM (LEVEL 1)","VETERAN FOOT SOLDIER","MASTER OF UNNECESSARY SUFFERING","GRAND WIZARD OF STUD INJURIES"];
const PAIN_VERDICTS={low:["Soft. Embarrassing.","Duplo doesn't count.","Try stepping on a real brick.","Our lawyers call this 'a tickle.'"],mid:["That definitely hurt.","We believe you. Mostly.","Solid mid-tier suffering.","Not bad. Not good. Painful."],high:["Legitimate agony.","Full foot catastrophe.","We are so sorry.","This qualifies for compensation."],max:["MAXIMUM SUFFERING.","We cannot legally show the x-ray.","You have our deepest condolences.","The brick wins. It always wins."]};
const STORIES={"Classic 2×4 Red Brick":"Victim was walking to the kitchen when a 2×4 red brick, stud-side up, was encountered dead center of the hallway floor. Victim reports seeing colours. The brick was still there in the morning.","Tiny 1×1 Transparent Plate":"A transparent 1×1 plate — invisible against the floor — was encountered at 100% body weight. Victim states this is maximum pain per unit area and has requested a full investigation.","Gray Technic Connector":"A Technic connector with four studs pointing vertically upward was left at the base of the stairs. Victim's heel landed at a perfect 90° angle. Victim reports a sound they cannot unhear.","Giant Duplo Brick":"A large Duplo brick was encountered in what should have been a clear path. While the victim insists it wasn't that bad, the fact they are here filing this report tells a different story.","Sharp Technic Axle":"A Technic axle was found on the floor. Investigators describe it as a tiny spear. Full foot contact was made. The axle left a mark classified as the Brickland Brand.","Unknown Brick (it was dark)":"At approximately 3AM, victim encountered an unidentified LEGO element in total darkness. The brick has not been identified. Forensics are pending. Victim stepped on something, and that is enough.","Multiple Bricks in Ambush Formation":"Three or more bricks were arranged in a pattern inconsistent with random dispersal. Victim suspects deliberate placement by a household member. A full investigation is open. No arrests have been made.","LEGO Wheel (rolling hazard)":"A LEGO wheel was found near the impact zone. Witnesses report the wheel was in motion, rolling the foot outward upon contact. The wheel has been classified as a rolling hazard."};
const FAKE_PATIENTS=[{name:"Timothy Hobnail",emoji:"😤",brick:"Classic 2×4 Red Brick",score:8700},{name:"Brenda Flatfoot",emoji:"😭",brick:"Technic Connector",score:9400},{name:"Gerald Hurtpaw",emoji:"🦵",brick:"Transparent 1×1 Plate",score:9900},{name:"Ethel Nightmare-Jones",emoji:"👵",brick:"All 847 of them",score:7600},{name:"Patricia Nocturnova",emoji:"🌙",brick:"Unknown brick (3AM)",score:8100},{name:"Rodrigo 'Rocky' Sole",emoji:"💪",brick:"Duplo (the coward's brick)",score:4500}];
const QUEUE_PATIENTS=[{name:"Timothy Hobnail",emoji:"😤",complaint:"3AM cereal run. Red 2×4. Pressing charges."},{name:"Brenda Flatfoot",emoji:"😭",complaint:"Technic connector. Full body weight."},{name:"Gerald Hurtpaw",emoji:"🦵",complaint:"1×1 plate. Maximum pain. Has a PowerPoint."}];
const WAIT_FACTS=["The average LEGO brick can support 4,240 Newtons of force before breaking. Your foot could not.","There are approximately 80 LEGO bricks for every person on Earth. They are winning.","The 1×1 round plate is scientifically the most painful LEGO element. You know this now.","LEGO produces around 306 million tiny tires per year. Every single one is a threat.","LEGO bricks are made to a tolerance of 0.002mm. They are more precise than your hospital.","In 2015, a British man ran a half-marathon barefoot on LEGO bricks. He is considered legally insane.","The LEGO Group has never publicly acknowledged the pain it has caused. This website is the resistance."];

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el = document.getElementById(id);
    el.classList.add('active');
    el.scrollTop=0;
}

function goToIntro() {
    state.name = '';
    state.brick = '';
    state.brickPain = 0;
    state.signed = false;
    state.sock = '';
    state.blame = '';
    document.querySelectorAll('.brick-card,.choice-card,.eq-chip').forEach(c=>c.classList.remove('selected'));
    document.getElementById('vic-name').value='';
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
    setTimeout(() => typeText('crime-notes-next', STORIES[state.brick]||'A LEGO brick was involved. That is all we know.', 22), 400);
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
    fillResultDocs();
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
    state._prevScreen=document.querySelector('screen.active')?.id||'screen-intro';
    buildHallOfShame();
    showScreen('screen-hall');
}

function goBack() {
    showScreen(state._prevScreen||'screen-intro')
}

function selectBrick(el) {
    document.querySelectorAll('#brick-grid .brick-grid').forEach(c=>c.classList.remove('selected'));
    el.classList.add('selected');
    state.brick = el.dataset.brick;
    state.brickPain = parseInt(el.dataset.pain);
    state.brickEmoji = el.dataset.emoji;
    animationPainMeter(state.brickPain);
    spawnFloatingEmoji(el, el.dataset.emoji);
    checkSetupReady();
    soundBrickDrop();
    updateTicker();
}

function selectTime(el) {
    document.querySelectorAll('#time-grid .choice-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    state.time=el.dataset.time;
    checkSetupReady();
}

function selectChip(el, rowId) {
    document.querySelectorAll('#'+rowId+' .eq-chip').forEach(c=> c.classList.remove('selected'));
    el.classList.add('selected');
    if (rowId === 'sock-row') {
        state.sock = el.dataset.sock;
    }

    if (rowId === 'blame-row') {
        state.blame = el.dateset.blame;
        checkSetupReady();
    }
}

function checkSetupReady() {
    state.name = document.getElementById('vic-name').value.trim();
    const ready = state.name && state.brick && state.time && state.sock && state.blame;
    document.getElementById('btn-next-setup').disabled =!ready;
    return ready;
}

document.getElementById('vic-name').addEventListener('input', checkSetupReady);

function resetPainMeter() {
    document.getElementById('pain-fill').style.width = '0%';
    document.getElementById('pain-emoji').textContent = '';
    document.getElementById('pain-verdict').textContent = '';
}

function animatePainMeter(pain) {
    const fill = document.getElementById('pain-fill');
    fill.style.width = pain + '%';
    fill.style.background = pain >= 90?"#8b0000":pain>=70?'var(--red)':pain>=45?'#ff8c00':'var(--green)';
    const tier = pain >= 90?'max':pain>=70?'high':pain>=45?'mid':'low';
    document.getElementById('pain-emoji').textContent = {
        low: '😐',
        mid: '😬',
        high: '😭',
        max: '💀'
    }[tier];
    document.getElementById('pain-verdict').textContent = pick(PAIN_VERDICTS[tier]);
}

function buildCrimeScene() {
    const colorMap = {"Classic 2x4 Red Brick":"#e3000b",
        "Tiny 1x1 Transparent Plate":"rgba(200,230,255,0.7)",
        "Gray Technic Connector": "#888",
        "Giant Duplo Brick": "#0055a5",
        "Sharp Technic Axle": "#999",
        "Unknown Brick (it was dark)":"#333",
        "Multiple Bricks in Ambush Formation":"multi",
        "LEGO Wheel (rolling hazard)": "#222"
    }
    
    const col = colorMap[state.brick]||'#e3000b';
    let brickSVG = '';
    if (state.brick.includes('Ambush')) {
        const cs = ['#e3000b', '#0055a5', '#ffcc00','#00a550', '#ff6b00'];
        [[80,100],[165,78],[245,102],[125,142],[205,128],[98,162]].forEach((p,i)=>{brickSVG+=`<rect x="${p[0]}" y="${p[1]}" width="44" height="24" rx="3" fill="${cs[i%cs.length]}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5"/><circle cx="${p[0]+10}" cy="${p[1]+10}" r="4" fill="rgba(255,255,255,0.25)"/><circle cx="${p[0]+22}" cy="${p[1]+10}" r="4" fill="rgba(255,255,255,0.25)"/><circle cx="${p[0]+34}" cy="${p[1]+10}" r="4" fill="rgba(255,255,255,0.25)"/>`;});
    } else if (state.brick.includes('Wheel')){
        brickSVG = `<circle cx="180" cy="128" r="40" fill="#1a1a1a" stroke="#444" stroke-width="3"/><circle cx="180" cy="128" r="28" fill="#333" stroke="#555" stroke-width="2"/><circle cx="180" cy="128" r="10" fill="#777"/><line x1="180" y1="100" x2="180" y2="156" stroke="#555" stroke-width="2"/><line x1="152" y1="128" x2="208" y2="128" stroke="#555" stroke-width="2"/>`;
    } else if (state.brick.includes('Axle')){
        brickSVG=`<line x1="130" y1="90" x2="230" y2="168" stroke="#bbb" stroke-width="6" stroke-linecap="round"/><polygon points="228,156 240,178 216,174" fill="#ddd"/><circle cx="134" cy="94" r="6" fill="#999"/>`;
    } else {
        const small = state.brick.includes('1×1');
        const w = small?16 : state.brick.includes('Duplo')?80 : 56, h=small?16 : state.brick.includes('Duplo')?32 : 26;
        const x=180-w/2, y=120-h/2;
        const studs=small?1:state.brick.includes('Duplo')?2:3;
        let s='';
        for(let i=0;i<studs;i++){
            const sx=x+10+i*(w*0.85/studs);
            s+=`<circle cx="${sx}" cy="${y-5}" r="${small?4:5}" fill="${col==='rgba(200,230,255,0.7)'?'rgba(180,210,240,0.8)':col}" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>`;
        }
        brickSVG=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${col}" stroke="rgba(0,0,0,0.4)" stroke-width="2"/>${s}`;
    }
    document.getElementById('crime-svg-wrap').innerHTML=`<svg viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:440px;display:block;margin:0 auto"><rect width="360" height="260" fill="#0a0a0a"/><line x1="0" y1="200" x2="360" y2="200" stroke="#1a1a1a" stroke-width="1"/>${Array.from({length:7},(_,i)=>`<line x1="${i*60}" y1="200" x2="${i*60}" y2="260" stroke="#141414" stroke-width="1"/>`).join('')}${Array.from({length:3},(_,i)=>`<line x1="0" y1="${200+i*20}" x2="360" y2="${200+i*20}" stroke="#141414" stroke-width="1"/>`).join('')}<ellipse cx="180" cy="197" rx="45" ry="7" fill="rgba(0,0,0,0.6)"/><ellipse cx="180" cy="172" rx="40" ry="23" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" stroke-dasharray="4,3"/>${brickSVG}<rect x="10" y="10" width="64" height="22" fill="${col==='rgba(200,230,255,0.7)'?'#cccccc':'#ffcc00'}" rx="2"/><text x="42" y="25" text-anchor="middle" fill="#1a1a1a" font-size="10" font-family="'Bebas Neue',sans-serif" letter-spacing="1">EXHIBIT A</text><rect x="288" y="213" width="40" height="8" fill="none" stroke="#333" stroke-width="1"/><text x="308" y="208" text-anchor="middle" fill="#333" font-size="7" font-family="monospace">1:1 SCALE</text></svg>`;
}

function fillReportForm() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'});
    const caseNum = 'LEGO-' + Math.floor(Math.random()*90000+10000);
    const diag = pick(DIAGNOSES);
    const icd = pick(ICD_CODES);
    let rx = [], pool = [...PRESCRIPTIONS];
    while (rx.length < 3 && pool.length){
        const i = Math.floor(Math.random() * pool.length);
        rx.push(pool.splice(i,1)[0]);
    }
    state._diag = diag;
    state._icd = icd;
    state._rx = rx;
    state._date = dateStr;
    state._case = caseNum;
    state._score = state.brickPain * 100 + Math.floor(Math.random() * 500);
    document.getElementById('fi-name').textContent = state.name;
    document.getElementById('fi-date').textContent = state.time.split('—')[0].trim() + ', ' + dateStr;
    document.getElementById('fi-brick').textContent = state.brick;
    document.getElementById('fi-case').textContent = caseNum;
    document.getElementById('fi-sock').textContent = state.sock;
    document.getElementById('fi-blame').textContent = state.blame;
    document.getElementById('fi-diagnosis').textContent = diag;
    document.getElementById('fi-icd').textContent = icd;
    document.getElementById('fi-treatment').textContent = rx.slice(0,2).join(' · ');
    document.getElementById('fi-story').value=STORIES[state.brick]||'A LEGO brick was involved. The victim suffered.';
    document.getElementById('fi-cost-med').textContent='£'+(Math.floor(Math.random()*400)+80).toLocaleString();
    document.getElementById('fi-cost-emo').textContent='£'+(Math.floor(Math.random()*2000)+500).toLocaleString();
    document.getElementById('fi-cost-dig').textContent='£'+(Math.floor(Math.random()*5000)+1000).toLocaleString();
    document.getElementById('sig-text').textContent=state.name;state.signed=false;
    document.getElementById('btn-submit').disabled=true;
}

function signReport(el) {
    state.signed=true;
    el.querySelector('.sig-text').style.opacity = '1';
    spawnFloatingEmoji(el, '✍️');
    showToast('Document signed! ✍️');
    document.getElementById('btn-submit').disabled=false;
    soundSuccess();
}

function buildWaitingRoom() {
    const list = document.getElementById('queue-list');
    list.innerHTML = '';
    const youItem = {name: state.name,
        emoji:state.brickEmoji || '🧱',
        complaint: "That's you. Hand tight. ", 
        isYou:true
    };
    [...QUEUE_PATIENTS, youItem].forEach((p,i) => {
        const div = document.createElement('div');
        div.className = 'queue-item waiting';
        div.id = 'qi-'+i;
        div.innerHTML=`<div class="qi-num waiting" id="qin-${i}">#${i+1}</div><div class="qi-avatar">${p.emoji}</div><div class="qi-info"><div class="qi-name">${p.isYou?'<strong>'+p.name+' (YOU)</strong>':p.name}</div><div class="qi-status waiting" id="qis-${i}">${p.complaint}</div></div><div class="qi-badge waiting" id="qib-${i}">WAITING</div>`;list.appendChild(div);
        document.getElementById('queue-count').textContent=(QUEUE_PATIENTS.length+1)+' in queue';
        document.getElementById('you-turn-btn').style.display='none';
        document.getElementById('you-status-emoji').textContent='⏳';
        document.getElementById('you-status-text').textContent='PLEASE WAIT';
        document.getElementById('you-status-sub').textContent='Your case is being reviewed by a certified LEGO pain expert. Average wait: 3–5 minutes. (We are very backed up.)';
        document.getElementById('waiting-fact').textContent='🧱 Fun fact: '+pick(WAIT_FACTS);
    })
}


let waitTimer = null;
function startWaitingAnimation(){
  clearTimeout(waitTimer);
  let step=0;
  const total=QUEUE_PATIENTS.length;
  function next(){
    if(step>=total){
        yourTurn();
        return;
    }

    const i=step;
    const item=document.getElementById('qi-'+i);
    if(item){
        item.className='queue-item active';
        document.getElementById('qin-'+i).className='qi-num active';
        document.getElementById('qis-'+i).className='qi-status active';
        document.getElementById('qis-'+i).textContent='Being treated now...';
        document.getElementById('qib-'+i).className='qi-badge active';
        document.getElementById('qib-'+i).textContent='IN TREATMENT';
    }

    waitTimer = setTimeout(() => {
      if(item){
        item.className='queue-item done';
        document.getElementById('qin-'+i).className='qi-num done';
        document.getElementById('qis-'+i).className='qi-status done';
        document.getElementById('qis-'+i).textContent='Treated & discharged ✓';
        document.getElementById('qib-'+i).className='qi-badge done';
        document.getElementById('qib-'+i).textContent='DONE';
        }

      step++;
      const rem=total-step;
      document.getElementById('queue-count').textContent=(rem+1)+' in queue';
      if(rem>0) {
        document.getElementById('you-status-sub').textContent=rem+' patient'+(rem>1?'s':'')+' ahead of you. Hold tight.';
      }

      waitTimer=setTimeout(next,1800);

    }, 2400);
  }
  waitTimer = setTimeout(next, 1000);
}

function yourTurn() {
    const youIdx = QUEUE_PATIENTS.length;
    const item = document.getElementById('qi-'+youIdx);
    if (item) {
        item.className= 'queue-item active';
        document.getElementById('qin-'+youIdx).className = 'qi-num active';
        document.getElementById('qis-'+youIdx).className = 'qi-status active';
        document.getElementById('qis-'+youIdx).textContent='IT IS YOUR TURN!';
        document.getElementById('qib-'+youIdx).className = 'qi-badge active';
        document.getElementById('qib-'+youIdx).textContent = 'YOUR TURN';
    }

    document.getElementById('you-status-emoji').textContent = '🎉';
    document.getElementById('you-status-text').textContent = "IT'S YOUR TURN!";
    document.getElementById('you-status-sub').textContent = 'The doctor is ready. Please proceed to the certificate collection window.';
    document.getElementById('you-turn-btn').style.display = 'block';
    document.getElementById('queue-count').textContent = '1 in queue (just you)';
    launchConfetti();

}

function fillResultDocs() {
    document.getElementById('rxp-patient').textContent = state.name;
    document.getElementById('rxp-date').textContent = state._date;
    document.getElementById('rxp-diagnosis').textContent = state._diag;
    document.getElementById('rxp-license').textContent = Math.floor(Math.random()*90000+10000);
    const list = document.getElementById('rxp-items');
    list.innerHTML = '';
    state._rx.forEach(r=> {
        const li = document.createElement('li');
        li.textContent = r;
        list.appendChild(li);
    });

    document.getElementById('cert-name').textContent = state.name;
    document.getElementById('cert-body-text').textContent='survived a direct encounter with a '+state.brick.split('(')[0].trim()+', completed an official Brickland NHS injury report, endured the waiting room, and displayed extraordinary resilience in the face of completely avoidable suffering.';
    const rankIdx = Math.min(RANKS.length-1, Math.floor(state.brickPain/20));
    state._rank = RANKS[rankIdx];
    document.getElementById('cert-rank').textContent = RANKS[rankIdx];
}


function addToHall() {
    if (!state.name) {
        return;
    }

    sessionSurvivors.push({name: state.name, brick:state.brick, rank: state._rank, emoji: state.brickEmoji||'🧱', score:state._score, isYou: true});
}

function buildHallOfShame () {
    const all = [...FAKE_PATIENTS.map(p => ({...p, isYou:false})), ...sessionSurvivors].sort((a,b) => b.score-a.score);
    const list = document.getElementById('hall-entries');
    list.innerHTML = '';
    all.slice(0,9).forEach((e,i)=>{const rc=i===0?'hall-rank-1':i===1?'hall-rank-2':i===2?'hall-rank-3':'hall-rank';const div=document.createElement('div');div.className='hall-entry';if(e.isYou){div.style.outline='2px solid var(--red)';div.style.borderRadius='4px';}div.innerHTML=`<div class="hall-rank ${rc}">#${i+1}</div><div class="hall-avatar">${e.emoji}</div><div class="hall-info"><div class="hall-name">${e.name}${e.isYou?' ⭐':''}</div><div class="hall-brick">${e.brick||'Unknown brick'}</div></div><div class="hall-pts">${e.score.toLocaleString()}</div>`;list.appendChild(div);});
    const yourEntry = document.getElementById('hall-your-entry');
    const my = sessionSurvivors[sessionSurvivors.length-1];
    if (my) {
        yourEntry.classList.remove('hidden');
        const myRank = all.findIndex(e=>e.isYou && isYou&&e.name===my.name)+1;
        document.getElementById('hall-your-entry-text').innerHTML = `You are ranked <strong style="color:var(--yellow)">#${myRank}</strong> out of ${all.length} survivors.<br>Rank: <strong style="color:var(--red)">${my.rank}</strong> · Pain score: <strong${my.score.toLocaleDateString()}</strong>`;
    } else {
        yourEntry.classList.add('hidden');
    }
}

