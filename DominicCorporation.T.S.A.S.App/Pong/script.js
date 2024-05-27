// script.js
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;

const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 0,
    score: 0
};

const ai = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 4,
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    speed: 4,
    dx: 4,
    dy: 4,
    color: '#fff'
};

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawBall(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "32px Arial";
    context.fillText(text, x, y);
}

function movePaddles() {
    player.y += player.dy;
    if (player.y < 0) {
        player.y = 0;
    } else if (player.y + paddleHeight > canvas.height) {
        player.y = canvas.height - paddleHeight;
    }

    if (ball.y < ai.y + ai.height / 2) {
        ai.y -= ai.dy;
    } else {
        ai.y += ai.dy;
    }

    if (ai.y < 0) {
        ai.y = 0;
    } else if (ai.y + paddleHeight > canvas.height) {
        ai.y = canvas.height - paddleHeight;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    let playerOrAI = (ball.x < canvas.width / 2) ? player : ai;

    if (collision(ball, playerOrAI)) {
        ball.dx *= -1;
    }

    if (ball.x - ball.size < 0) {
        ai.score++;
        resetBall();
    } else if (ball.x + ball.size > canvas.width) {
        player.score++;
        resetBall();
    }
}

function collision(b, p) {
    return b.x - b.size < p.x + p.width &&
        b.x + b.size > p.x &&
        b.y - b.size < p.y + p.height &&
        b.y + b.size > p.y;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

function update() {
    movePaddles();
    moveBall();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawBall(ball.x, ball.y, ball.size, ball.color);

    drawText(player.score, canvas.width / 4, canvas.height / 5, '#fff');
    drawText(ai.score, 3 * canvas.width / 4, canvas.height / 5, '#fff');
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        player.dy = -6;
    } else if (e.key === 'ArrowDown') {
        player.dy = 6;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
    }
});

gameLoop();
