// Эффект печатающегося текста
const words = [
    "разработкой в Roblox Studio.",
    "программированием на Lua.", 
    "нейросетями.", 
    "созданием приложений в Thunkable.", 
    "моделированием в Tinkercad.", 
    "Яндекс Сервисами."
];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('dynamic-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('dynamic-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

// ----------------------------------------------------
// ЛОГИКА ИГРЫ 1: АВТОКЛИКЕР 67 (С СОХРАНЕНИЕМ И БОНУСАМИ)
// ----------------------------------------------------
let coins = parseInt(localStorage.getItem('coins')) || 0;
let clickPower = parseInt(localStorage.getItem('clickPower')) || 1;
let autoClicks = parseInt(localStorage.getItem('autoClicks')) || 0;
let clickUpgradeCost = parseInt(localStorage.getItem('clickUpgradeCost')) || 15;
let autoUpgradeCost = parseInt(localStorage.getItem('autoUpgradeCost')) || 50;

const coinsDisplay = document.getElementById('coins');
const cpsDisplay = document.getElementById('cps');
const clickCostDisplay = document.getElementById('click-cost');
const autoCostDisplay = document.getElementById('auto-cost');
const goldenCoin = document.getElementById('golden-bonus');

// Создаем элемент для красивого уведомления прямо под заголовком кликера
const modalContent = document.querySelector('#clicker-modal .modal-content');
const notification = document.createElement('p');
notification.style.color = '#ffd700';
notification.style.fontSize = '0.95rem';
notification.style.fontWeight = 'bold';
notification.style.margin = '5px 0';
notification.style.height = '20px'; // Чтобы верстка не прыгала
notification.innerText = '';
// Вставляем уведомление перед доской счета
if (modalContent) {
    const scoreBoard = modalContent.querySelector('.score-board');
    modalContent.insertBefore(notification, scoreBoard);
}

// Открытие кликера по точке
document.getElementById('secret-dot').addEventListener('click', () => {
    document.getElementById('clicker-modal').style.display = 'flex';
    updateUI();
});
document.getElementById('close-clicker').addEventListener('click', () => {
    document.getElementById('clicker-modal').style.display = 'none';
});

// Клик по кнопке
document.getElementById('click-me-btn').addEventListener('click', () => {
    coins += clickPower;
    saveData();
    updateUI();
});

// Покупка силы клика
document.getElementById('buy-click').addEventListener('click', () => {
    if (coins >= clickUpgradeCost) {
        coins -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.6);
        saveData();
        updateUI();
    }
});

// Покупка автокликера
document.getElementById('buy-auto').addEventListener('click', () => {
    if (coins >= autoUpgradeCost) {
        coins -= autoUpgradeCost;
        autoClicks += 1;
        autoUpgradeCost = Math.round(autoUpgradeCost * 1.6);
        saveData();
        updateUI();
    }
});

// Сброс прогресса кликера
document.getElementById('reset-clicker').addEventListener('click', () => {
    if(confirm("Точно сбросить весь прогресс кликера?")) {
        localStorage.clear();
        coins = 0; clickPower = 1; autoClicks = 0; clickUpgradeCost = 15; autoUpgradeCost = 50;
        notification.innerText = '';
        updateUI();
    }
});

// Появление золотого бонуса (Шанс каждые 12 секунд)
setInterval(() => {
    if (document.getElementById('clicker-modal').style.display === 'flex' && Math.random() > 0.4) {
        const x = Math.floor(Math.random() * 260) - 130;
        const y = Math.floor(Math.random() * 80) - 40;
        goldenCoin.style.left = `calc(50% + ${x}px)`;
        goldenCoin.style.top = `calc(50% + ${y}px)`;
        goldenCoin.style.display = 'block';
        
        setTimeout(() => { goldenCoin.style.display = 'none'; }, 4000);
    }
}, 12000);

// Клик по золотому бонусу (БЕЗ ALERT)
goldenCoin.addEventListener('click', () => {
    let bonus = (autoClicks * 15) + 25;
    coins += bonus;
    goldenCoin.style.display = 'none';
    
    // Показываем текстовое уведомление на экране
    notification.innerText = `⭐ Ты нашел золотую звезду! +${bonus} 💰`;
    
    // Оно само исчезнет через 3 секунды
    setTimeout(() => {
        notification.innerText = '';
    }, 3000);

    updateUI();
    saveData();
});

function updateUI() {
    coinsDisplay.innerText = coins;
    cpsDisplay.innerText = autoClicks;
    clickCostDisplay.innerText = clickUpgradeCost;
    autoCostDisplay.innerText = autoUpgradeCost;
}

function saveData() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('clickPower', clickPower);
    localStorage.setItem('autoClicks', autoClicks);
    localStorage.setItem('clickUpgradeCost', clickUpgradeCost);
    localStorage.setItem('autoUpgradeCost', autoUpgradeCost);
}

setInterval(() => {
    if (autoClicks > 0) {
        coins += autoClicks;
        coinsDisplay.innerText = coins;
        if(Math.random() > 0.8) saveData(); 
    }
}, 1000);


// ----------------------------------------------------
// ЛОГИКА ИГРЫ 2: ВЗЛОМ НЕЙРОСЕТИ (По клику на 67 в меню)
// ----------------------------------------------------
let hackScore = 0;
let hackInterval;
const hackerZone = document.getElementById('hacker-zone');
const hackScoreDisplay = document.getElementById('hack-score');
const hackLevelDisplay = document.getElementById('hack-level');
const startHackBtn = document.getElementById('start-hack-btn');

// Исправленный клик по кнопке 67
const secret67Btn = document.getElementById('secret-67');
if (secret67Btn) {
    secret67Btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('hacker-modal').style.display = 'flex';
    });
}

document.getElementById('close-hacker').addEventListener('click', () => {
    document.getElementById('hacker-modal').style.display = 'none';
    clearInterval(hackInterval);
    hackerZone.innerHTML = '';
    hackerZone.appendChild(startHackBtn);
    startHackBtn.style.display = 'block';
});

startHackBtn.addEventListener('click', () => {
    startHackBtn.style.display = 'none';
    hackScore = 0;
    hackScoreDisplay.innerText = hackScore;
    hackLevelDisplay.innerText = "Новичок";
    
    hackInterval = setInterval(spawnCube, 1200);
});

function spawnCube() {
    const cube = document.createElement('div');
    cube.classList.add('hack-target');
    
    const maxX = hackerZone.clientWidth - 40;
    const maxY = hackerZone.clientHeight - 40;
    cube.style.left = Math.random() * maxX + 'px';
    cube.style.top = Math.random() * maxY + 'px';
    
    cube.addEventListener('click', () => {
        hackScore++;
        hackScoreDisplay.innerText = hackScore;
        updateHackLevel();
        cube.remove();
    });
    
    hackerZone.appendChild(cube);
    
    setTimeout(() => { if(cube.parentNode) cube.remove(); }, 1500);
}

function updateHackLevel() {
    if (hackScore > 25) hackLevelDisplay.innerText = "Элитный Кибер-Глеб 👑";
    else if (hackScore > 15) hackLevelDisplay.innerText = "Мастер Луа 🤖";
    else if (hackScore > 7) hackLevelDisplay.innerText = "Кодер Киберпанка 🕶️";
}


// Запуск анимации текста
document.addEventListener("DOMContentLoaded", () => {
    typingEffect();
});