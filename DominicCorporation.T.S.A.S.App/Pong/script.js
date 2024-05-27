// script.js
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;

const player1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 0,
    score: 0
};

const player2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 0,
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

let isTwoPlayer = false;

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
    player1.y += player1.dy;
    if (player1.y < 0) {
        player1.y = 0;
    } else if (player1.y + paddleHeight > canvas.height) {
        player1.y = canvas.height - paddleHeight;
    }

    if (isTwoPlayer) {
        player2.y += player2.dy;
        if (player2.y < 0) {
            player2.y = 0;
        } else if (player2.y + paddleHeight > canvas.height) {
            player2.y = canvas.height - paddleHeight;
        }
    } else {
        if (ball.y < player2.y + player2.height / 2) {
            player2.y -= 4;
        } else {
            player2.y += 4;
        }

        if (player2.y < 0) {
            player2.y = 0;
        } else if (player2.y + paddleHeight > canvas.height) {
            player2.y = canvas.height - paddleHeight;
        }
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    let playerOrAI = (ball.x < canvas.width / 2) ? player1 : player2;

    if (collision(ball, playerOrAI)) {
        ball.dx *= -1;
    }

    if (ball.x - ball.size < 0) {
        player2.score++;
        resetBall();
    } else if (ball.x + ball.size > canvas.width) {
        player1.score++;
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

    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
    drawBall(ball.x, ball.y, ball.size, ball.color);
    
    drawText(player1.score, canvas.width / 4, canvas.height / 5, '#fff');
    drawText(player2.score, 3 * canvas.width / 4, canvas.height / 5, '#fff');
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.getElementById('playAI').addEventListener('click', () => {
    isTwoPlayer = false;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    gameLoop();
});

document.getElementById('playHuman').addEventListener('click', () => {
    isTwoPlayer = true;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    gameLoop();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        player1.dy = -6;
    } else if (e.key === 'ArrowDown') {
        player1.dy = 6;
    }
    if (isTwoPlayer) {
        if (e.key === 'w') {
            player2.dy = -6;
        } else if (e.key === 's') {
            player2.dy = 6;
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player1.dy = 0;
    }
    if (isTwoPlayer) {
        if (e.key === 'w' || e.key === 's') {
        player2.dy = 0;
        }
    }
});
