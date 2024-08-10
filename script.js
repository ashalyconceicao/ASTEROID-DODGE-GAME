const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let spaceship = { x: canvas.width / 2, y: canvas.height - 50, width: 50, height: 30 };
let asteroids = [];
let score = 0;
let gameInterval;
let asteroidInterval;

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        spaceship.x -= 20;
        if (spaceship.x < 0) spaceship.x = 0;
    } else if (e.key === 'ArrowRight') {
        spaceship.x += 20;
        if (spaceship.x > canvas.width - spaceship.width) spaceship.x = canvas.width - spaceship.width;
    } else if (e.key === ' ') {
        startGame();
    }
});

function startGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    asteroids = [];
    clearInterval(gameInterval);
    clearInterval(asteroidInterval);
    gameInterval = setInterval(updateGame, 20);
    asteroidInterval = setInterval(createAsteroid, 1000);
}

function createAsteroid() {
    const size = Math.random() * 40 + 20;
    asteroids.push({ x: Math.random() * (canvas.width - size), y: 0, width: size, height: size, speed: Math.random() * 2 + 1 });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
    
    for (let i = asteroids.length - 1; i >= 0; i--) {
        let a = asteroids[i];
        a.y += a.speed;
        
        ctx.fillStyle = '#f00';
        ctx.fillRect(a.x, a.y, a.width, a.height);
        
        if (a.y + a.height > spaceship.y && a.x < spaceship.x + spaceship.width && a.x + a.width > spaceship.x) {
            clearInterval(gameInterval);
            clearInterval(asteroidInterval);
            alert('Game Over!');
            return;
        }
        
        if (a.y > canvas.height) {
            asteroids.splice(i, 1);
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
        }
    }
}

startGame();
