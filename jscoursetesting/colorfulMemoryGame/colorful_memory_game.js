const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];

let cards = [];
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;
let matchTimeout;
let gameActive = false;

const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateCards() {
    for (const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';
        gameContainer.appendChild(card);
    }
}

function handleCardClick(event) {
    const card = event.target;

    if (
        !gameActive ||
        !card.classList.contains('card') ||
        card.classList.contains('matched') ||
        selectedCards.includes(card) ||
        selectedCards.length === 2
    ) {
        return;
    }

    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        matchTimeout = setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (!gameActive || selectedCards.length !== 2) {
        return;
    }

    const [card1, card2] = selectedCards;

    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');

        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card2.textContent = '?';

        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }

    selectedCards = [];
    matchTimeout = null;

    // Check if all cards have been matched
    if (score === cards.length) {
        gameActive = false;
        clearInterval(gameInterval);
        startbtn.disabled = false;
        alert('Congratulations! You Win!');
    }
}

function startGame() {
    clearInterval(gameInterval);
    clearTimeout(matchTimeout);

    timeLeft = 30;
    score = 0;
    selectedCards = [];
    gameActive = true;

    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time Left: ${timeLeft}`;

    startbtn.disabled = true;

    cards = shuffle(colors.concat(colors));

    gameContainer.innerHTML = '';
    generateCards();

    startGameTimer();
}

function startGameTimer() {
    gameInterval = setInterval(() => {
        timeLeft--;

        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearTimeout(matchTimeout);

            gameActive = false;
            selectedCards = [];
            startbtn.disabled = false;

            alert('Game Over!');
        }
    }, 1000);
}

// Event listeners
startbtn.addEventListener('click', startGame);
gameContainer.addEventListener('click', handleCardClick);