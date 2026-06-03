function downloadCertificate() {
    showToast('Preparing your certificate...');
    const cert = document.getElementById('certificate');
    html2canvas(cert, {scale:2, backgroundColor: '#fef9f0', useCORS: true, onClone:(doc)=>{
        const c = doc.getElementById('certificate');
        if (c) {
            c.style.transform = 'none';
            c.style.opacity = '1';
        }
    }}).then(canvas=> {
        const link = document.getElementById('a');
        link.download = 'LEGO Survivor Certificate for '+(state.name || "survivor").replace(/\s+/g, '-')+'.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Certificate downloaded! 🎓');
    }).catch(() => showToast('Right-click the certificate to save it!'));
}

function shareResult() {
    const text = 'I stepped on a LEGO brick and got an official Brickland NHS Certificate.\n'+state.name+' - '+state._rank+'\nBrick: '+state.brick+'\n🧱 LEGO Injury Report';
    if (navigator.share) {
        navigator.share({title: 'LEGO Survivor Certificate', text})
    } else {
        navigator.clipboard.writeText(text).then(() => showToast('Copied!')).catch(()=>showToast('Share this with your friends! 🧱'));
    }
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function updateProgress(pct) {
    document.getElementById('progress-bar').style.width=pct+'%'
}

let toastTimer;

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer= setTimeout(() => t.classList.remove('show'), 3000);
}

function spawnFloatingEmoji(el, emoji){
    const rect = el.getBoundingClientRect();
    const div = document.createElement('div');
    div.className = 'float-emoji';
    div.textContent = emoji;
    div.style.left = (rect.left+rect.width/2)+'px';
    div.style.top = rect.top+'px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2100);
}

function typeText(elId, text, speed) {
    const el = document.getElementById(elId);
    el.textContent = '';
    el.classList.add('typing-cusror');
    let i = 0;
    const t = setInterval(() =>{
        if ( i < text.length ) {
            el.textContent += text[i++] 
        } else {
            clearInterval(t);
            el.classList.remove('typing-cursor')
        }
    }, speed)
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = Array.from({length: 140}, () => ({
        x:Math.random()*canvas.width,
        y:-20,
        vx:(Math.random() - 0.5)*6,
        vy:Math.random()*4+2,
        color: ['#e3000b','#ffcc00','#0055a5','#00a550','#ff6b00','#fff'][Math.floor(Math.random() * 6)],
        size: Math.random() * 10 + 4,
        rot: Math.random() * 360,
        vrot: (Math.random() -0.5)*12,
        shape: Math.random() > 0.5 ? "rect" : 'circle'
    }));
    let frame = 0;
    (function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pieces.forEach(p=>{
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot*Math.PI/180);
            ctx.fillStyle=p.color;
            ctx.globalAlpha=Math.max(0,1-(frame/120));
            if (p.shape === 'rect'){
                ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2)
            } else  {
                ctx.beginPath();
                ctx.arc(0,0,p.size/2, Math.PI*2);
                ctx.fill();
            }

            ctx.restore();
            p.x+=p.vx;
            p.y+=p.vy;
            p.rot+=p.vrot;
            p.vy+=0.08
        });
        frame++;
        if (frame < 150) {
            requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0,0,canvas.width, canvas.height);
        }
    })();
}


function buildIntroBricks() {
    const bg = document.getElementById('intro-bg');
    ['#e3000b','#ffcc00','#0055a5','#00a550','#ff6b00','#fff'].forEach(col=> {
        for (let j = 0; j < 4; j++) {
            const b = document.createElement('div');
            b.className = 'bg-brick';
            const w = 20 + Math.random() * 60,
            h = w*0.55;
            b.style.cssText = `width: ${w}px; height: ${h}px; left: ${Math.random()*100}%; border-radius: 3px; background: ${col}; animation-duration: ${7+Math.random()*12}s; animation-delay: -${Math.random() * 14}s`;
            bg.appendChild(b);
        }
    });
}

const loadMsgs = ["Scattering bricks on the floor...", "Removing all socks from the house...", "Turning off the lights...", "Loading official government forms...", "Caliberating pain level meters...", "Preparing your certificate...", "Filling waiting room with casualities..."];
let loadIdx = 0;
const loadInt = setInterval( () => {
    if (++loadIdx<loadMsgs.length) {
        document.getElementById('loading-msg').textContent=loadMsgs[loadIdx];
    }
}, 280);

window.addEventListener('load', ()=>{
    buildIntroBricks();
    setTimeout(()=>{
        clearInterval(loadInt);
        const ov = document.getElementById('loading-overlay');
        ov.classList.add('fade');
        setTimeout(() => {ov.style.display='none';showScreen('screen-intro');}, 600);
    }, 1900);
});

