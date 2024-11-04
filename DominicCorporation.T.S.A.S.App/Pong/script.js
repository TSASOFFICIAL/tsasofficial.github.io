// script.js
let canvas, ctx;
let player1Score = 0, player2Score = 0;
let player1Y = 150, player2Y = 150;
let ballX = 400, ballY = 200, ballSpeedX = 5, ballSpeedY = 4;
let paddleHeight = 100, paddleWidth = 10;
let upPressed = false, downPressed = false, wPressed = false, sPressed = false;
let gameMode = '';
let aiSpeed = 3; // AI speed is slower than ball speed

function startGame(mode) {
    gameMode = mode;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    canvas = document.getElementById('pongCanvas');
    ctx = canvas.getContext('2d');
    resetGame();
    setInterval(updateGame, 1000 / 60);
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
}

function goToMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    window.removeEventListener('keydown', keyDownHandler);
    window.removeEventListener('keyup', keyUpHandler);
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    updateScore();
    resetBall();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function updateGame() {
    moveBall();
    movePaddles();
    drawGame();
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddleWidth) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player2Score++;
            updateScore();
            resetBall();
        }
    }

    if (ballX >= canvas.width - paddleWidth) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player1Score++;
            updateScore();
            resetBall();
        }
    }
}

function movePaddles() {
    if (wPressed && player1Y > 0) player1Y -= 6;
    if (sPressed && player1Y < canvas.height - paddleHeight) player1Y += 6;
    if (gameMode === '2player') {
        if (upPressed && player2Y > 0) player2Y -= 6;
        if (downPressed && player2Y < canvas.height - paddleHeight) player2Y += 6;
    } else {
        if (ballY > player2Y + paddleHeight / 2 && player2Y < canvas.height - paddleHeight) {
            player2Y += aiSpeed;
        } else if (ballY < player2Y + paddleHeight / 2 && player2Y > 0) {
            player2Y -= aiSpeed;
        }
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    // Draw paddles
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw net
    for (let i = 0; i < canvas.height; i += 30) {
        ctx.fillRect(canvas.width / 2 - 1, i, 2, 20);
    }
}

function updateScore() {
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;
}

function keyDownHandler(e) {
    if (e.key === 'ArrowUp') upPressed = true;
    if (e.key === 'ArrowDown') downPressed = true;
    if (e.key === 'w') wPressed = true;
    if (e.key === 's') sPressed = true;
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp') upPressed = false;
    if (e.key === 'ArrowDown') downPressed = false;
    if (e.key === 'w') wPressed = false;
    if (e.key === 's') sPressed = false;
}
