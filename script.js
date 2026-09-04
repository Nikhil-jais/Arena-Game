const player = document.getElementById("player");
const arena = document.getElementById("arena");

let playerX = 50;
let playerY = 50;

const playerSpeed = 2;

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

    // Keep player inside the arena
    playerX = Math.max(2, Math.min(98, playerX));
    playerY = Math.max(4, Math.min(96, playerY));

    player.style.left = playerX + "%";
    player.style.top = playerY + "%";
});
