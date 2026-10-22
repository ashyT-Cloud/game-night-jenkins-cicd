"use strict";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreLabel = document.querySelector("#score");
const livesLabel = document.querySelector("#lives");
const statusLabel = document.querySelector("#status");
const startButton = document.querySelector("#start");

const keys = new Set();
let player, bullets, asteroids, score, lives, running;
let lastTime = 0;
let spawnTimer = 0;
let animationId = null;

function resetGame() {
  player = { x: canvas.width / 2, y: canvas.height - 55, size: 15 };
  bullets = [];
  asteroids = [];
  score = 0;
  lives = 3;
  spawnTimer = 0;
  scoreLabel.textContent = score;
  livesLabel.textContent = lives;
}

function drawShip() {
  ctx.fillStyle = "#5eead4";
  ctx.beginPath();
  ctx.moveTo(player.x, player.y - player.size);
  ctx.lineTo(player.x - player.size, player.y + player.size);
  ctx.lineTo(player.x + player.size, player.y + player.size);
  ctx.closePath();
  ctx.fill();
}

function spawnAsteroid() {
  const radius = 12 + Math.random() * 16;
  asteroids.push({
    x: radius + Math.random() * (canvas.width - radius * 2),
    y: -radius,
    radius,
    speed: 90 + Math.random() * 100
  });
}

function overlaps(a, b, radius) {
  return Math.hypot(a.x - b.x, a.y - b.y) < radius;
}

function update(dt) {
  if (keys.has("ArrowLeft") || keys.has("a")) player.x -= 240 * dt;
  if (keys.has("ArrowRight") || keys.has("d")) player.x += 240 * dt;
  player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x));

  for (const bullet of bullets) bullet.y -= 420 * dt;
  bullets = bullets.filter(b => b.y > -10);

  spawnTimer += dt;
  if (spawnTimer > 0.7) {
    spawnAsteroid();
    spawnTimer = 0;
  }

  for (const asteroid of asteroids) asteroid.y += asteroid.speed * dt;

  for (const asteroid of asteroids) {
    if (overlaps(asteroid, player, asteroid.radius + player.size * 0.6)) {
      asteroid.y = canvas.height + 100;
      lives--;
      livesLabel.textContent = lives;
      if (lives <= 0) endGame();
    }
  }

  for (const bullet of bullets) {
    for (const asteroid of asteroids) {
      if (asteroid.y < canvas.height &&
          overlaps(bullet, asteroid, asteroid.radius)) {
        asteroid.y = canvas.height + 100;
        bullet.y = -100;
        score += 10;
        scoreLabel.textContent = score;
        break;
      }
    }
  }

  asteroids = asteroids.filter(a => a.y < canvas.height + 60);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Starfield
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 55; i++) {
    const x = (i * 83) % canvas.width;
    const y = (i * 137 + Math.floor(performance.now() / 40)) % canvas.height;
    ctx.fillRect(x, y, 2, 2);
  }

  drawShip();

  ctx.fillStyle = "#facc15";
  for (const bullet of bullets) ctx.fillRect(bullet.x - 2, bullet.y, 4, 12);

  for (const asteroid of asteroids) {
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function frame(timestamp) {
  if (!running) return;
  const dt = Math.min((timestamp - lastTime) / 1000 || 0, 0.04);
  lastTime = timestamp;
  update(dt);
  draw();
  if (running) animationId = requestAnimationFrame(frame);
}

function endGame() {
  running = false;
  statusLabel.textContent = `Game over! Final score: ${score}`;
  startButton.textContent = "PLAY AGAIN";
}

function startGame() {
  if (animationId !== null) cancelAnimationFrame(animationId);
  animationId = null;
  resetGame();
  running = true;
  lastTime = 0;
  statusLabel.textContent = "Survive as long as you can!";
  startButton.textContent = "RESTART GAME";
  animationId = requestAnimationFrame(frame);
}

document.addEventListener("keydown", event => {
  if (["ArrowLeft", "ArrowRight", " "].includes(event.key)) event.preventDefault();
  const key = event.key.toLowerCase();
  keys.add(key);

  if (event.code === "Space" && running &&
      !event.repeat) {
    bullets.push({ x: player.x, y: player.y - player.size });
  }
});

document.addEventListener("keyup", event => {
  keys.delete(event.key.toLowerCase());
});

startButton.addEventListener("click", startGame);

resetGame();
draw();
