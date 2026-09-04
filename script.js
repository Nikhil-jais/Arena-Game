const player = document.getElementById("player");
const arena = document.getElementById("arena");
const scoreDisplay = document.getElementById("score");

let playerX = 50;
let playerY = 50;

const playerSpeed = 2;

let score = 0;
let enemies = [];

// =========================
// PLAYER MOVEMENT
// =========================

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        playerY -= playerSpeed;
    }

    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        playerY += playerSpeed;
    }

    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        playerX -= playerSpeed;
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        playerX += playerSpeed;
    }

    playerX = Math.max(2, Math.min(98, playerX));
    playerY = Math.max(4, Math.min(96, playerY));

    player.style.left = playerX + "%";
    player.style.top = playerY + "%";
});


// =========================
// ENEMY SPAWNING
// =========================

function spawnEnemy() {

    const enemy = document.createElement("div");

    enemy.classList.add("enemy");

    const x = Math.random() * 90 + 5;
    const y = Math.random() * 85 + 5;

    enemy.style.left = x + "%";
    enemy.style.top = y + "%";

    arena.appendChild(enemy);

    enemies.push(enemy);
}


// Spawn an enemy every 2 seconds
setInterval(spawnEnemy, 2000);
