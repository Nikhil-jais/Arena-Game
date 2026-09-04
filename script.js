// ==========================================
// ARENA GAME
// ==========================================


// ==========================================
// HTML ELEMENTS
// ==========================================

const player = document.getElementById("player");

const arena = document.getElementById("arena");

const healthDisplay = document.getElementById("health");

const scoreDisplay = document.getElementById("score");

const startBtn = document.getElementById("startBtn");

const restartBtn = document.getElementById("restartBtn");

const gameMessage = document.getElementById("game-message");

const messageTitle = document.getElementById("message-title");

const finalScore = document.getElementById("final-score");


// ==========================================
// GAME VARIABLES
// ==========================================

let playerX = 50;

let playerY = 50;

const playerSpeed = 2;


let health = 100;

let score = 0;


let enemies = [];


let gameRunning = false;

let gameOver = false;


// ==========================================
// ENEMY SETTINGS
// ==========================================

const enemySpeed = 0.15;

const enemySpawnTime = 2000;

const attackRange = 8;

const damageAmount = 10;


// ==========================================
// START GAME
// ==========================================

function startGame() {

    gameRunning = true;

    gameOver = false;


    health = 100;

    score = 0;


    playerX = 50;

    playerY = 50;


    healthDisplay.textContent = health;

    scoreDisplay.textContent = score;


    player.style.left = playerX + "%";

    player.style.top = playerY + "%";


    // Remove old enemies

    enemies.forEach((enemy) => {

        enemy.element.remove();

    });


    enemies = [];


    // Hide game over message

    gameMessage.classList.add("hidden");


    // Hide start button

    startBtn.style.display = "none";

}


// ==========================================
// START BUTTON
// ==========================================

startBtn.addEventListener("click", () => {

    startGame();

});


// ==========================================
// RESTART BUTTON
// ==========================================

restartBtn.addEventListener("click", () => {

    startGame();

});


// ==========================================
// PLAYER MOVEMENT
// ==========================================

document.addEventListener("keydown", (event) => {

    if (!gameRunning || gameOver) {

        return;

    }


    const key = event.key.toLowerCase();


    if (
        key === "w" ||
        event.key === "ArrowUp"
    ) {

        playerY -= playerSpeed;

    }


    if (
        key === "s" ||
        event.key === "ArrowDown"
    ) {

        playerY += playerSpeed;

    }


    if (
        key === "a" ||
        event.key === "ArrowLeft"
    ) {

        playerX -= playerSpeed;

    }


    if (
        key === "d" ||
        event.key === "ArrowRight"
    ) {

        playerX += playerSpeed;

    }


    // Keep player inside arena

    playerX = Math.max(3, Math.min(97, playerX));

    playerY = Math.max(5, Math.min(95, playerY));


    player.style.left = playerX + "%";

    player.style.top = playerY + "%";

});


// ==========================================
// ENEMY SPAWNING
// ==========================================

function spawnEnemy() {

    if (!gameRunning || gameOver) {

        return;

    }


    const enemy = document.createElement("div");

    enemy.classList.add("enemy");


    // Random position

    const x = Math.random() * 90 + 5;

    const y = Math.random() * 85 + 5;


    enemy.style.left = x + "%";

    enemy.style.top = y + "%";


    arena.appendChild(enemy);


    enemies.push({

        element: enemy,

        x: x,

        y: y

    });

}


// ==========================================
// ENEMY SPAWN TIMER
// ==========================================

setInterval(() => {

    spawnEnemy();

}, enemySpawnTime);


// ==========================================
// ENEMY MOVEMENT
// ==========================================

function moveEnemies() {

    if (gameRunning && !gameOver) {

        enemies.forEach((enemy, index) => {

            const dx = playerX - enemy.x;

            const dy = playerY - enemy.y;


            const distance = Math.sqrt(
                dx * dx + dy * dy
            );


            // Move toward player

            if (distance > 2) {

                enemy.x +=
                    (dx / distance) * enemySpeed;

                enemy.y +=
                    (dy / distance) * enemySpeed;


                enemy.element.style.left =
                    enemy.x + "%";

                enemy.element.style.top =
                    enemy.y + "%";

            }


            // ==================================
            // PLAYER COLLISION
            // ==================================

            if (distance <= 3) {

                takeDamage();


                enemy.element.remove();


                enemies.splice(index, 1);

            }

        });

    }


    requestAnimationFrame(moveEnemies);

}


moveEnemies();


// ==========================================
// PLAYER DAMAGE
// ==========================================

function takeDamage() {

    if (gameOver) {

        return;

    }


    health -= damageAmount;


    if (health < 0) {

        health = 0;

    }


    healthDisplay.textContent = health;


    // Damage animation

    player.classList.remove("damage");


    void player.offsetWidth;


    player.classList.add("damage");


    // Check game over

    if (health <= 0) {

        endGame();

    }

}


// ==========================================
// PLAYER ATTACK
// ==========================================

document.addEventListener("keydown", (event) => {

    if (!gameRunning || gameOver) {

        return;

    }


    if (event.code === "Space") {

        event.preventDefault();


        attack();

    }

});


// ==========================================
// ATTACK FUNCTION
// ==========================================

function attack() {

    // Create visual attack effect

    createAttackEffect();


    enemies.forEach((enemy, index) => {

        const dx = playerX - enemy.x;

        const dy = playerY - enemy.y;


        const distance = Math.sqrt(
            dx * dx + dy * dy
        );


        // Enemy is inside attack range

        if (distance <= attackRange) {

            enemy.element.remove();


            enemies.splice(index, 1);


            score++;


            scoreDisplay.textContent = score;

        }

    });

}


// ==========================================
// ATTACK VISUAL EFFECT
// ==========================================

function createAttackEffect() {

    const effect = document.createElement("div");

    effect.classList.add("attack-effect");


    effect.style.left = playerX + "%";

    effect.style.top = playerY + "%";


    arena.appendChild(effect);


    setTimeout(() => {

        effect.remove();

    }, 200);

}


// ==========================================
// GAME OVER
// ==========================================

function endGame() {

    gameRunning = false;

    gameOver = true;


    finalScore.textContent = score;


    messageTitle.textContent = "💀 GAME OVER";


    gameMessage.classList.remove("hidden");


    startBtn.style.display = "none";

}


// ==========================================
// PREVENT SPACEBAR SCROLLING
// ==========================================

window.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        event.preventDefault();

    }

});
