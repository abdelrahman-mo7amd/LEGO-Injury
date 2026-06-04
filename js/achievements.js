let earnedBadges = new Set(); 
function checkAndAwardBadges() {
    ALL_BADGES.forEach(badge=> {
        if (!earnedBadges.has(badge.id) && badge.cond()) {
            earnedBadges.add(badge.id);
            showAchievementToast(badge);
        }
    });
}

function showAchievementToast(badge) {
    soundSuccess();
    const bar = document.getElementById('achievements-bar');
    const div = document.createElement('div');
    div.className = 'achievement-toast';
    div.innerHTML = `
        <div class="ach-icon">${badge.emoji}</div>
        <div  class="ach-text">
            <div class="ach-label">Achievement Unlocked! </div>
            <div class="ach-name">${badge.name}</div>
        </div
    `;

    bar.appendChild(div);
    setTimeout(() => div.classList.add('show'), 50);
    setTimeout(() => {
        div.classList.remove('show');
        setTimeout(() => div.remove(), 500);
    }, 4000);
}

function buildBadgesPanel() {
    const grid = document.getElementById('badges-grid');
    if (!grid) {
        return;
    }

    grid.innerHTML = '';
    ALL_BADGES.forEach(badge=> {
        const div = document.createElement('div');
        div.className = 'badge-item ' + (earnedBadges.has(badge.id) ? 'earned' : 'locked');
        div.innerHTML = `<div class="badge-emoji">${badge.emoji}</div><div class="badge-name">${badge.name}</div>`;
        div.title = badge.desc;
        grid.appendChild(div);
    });
}

