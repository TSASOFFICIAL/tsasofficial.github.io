// script.js
document.addEventListener('DOMContentLoaded', () => {
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
            // AI logic for player 2
            const aiSpeed = 3; // Lower speed to make the AI beatable
            if (ball.y < player2.y + player2.height / 2) {
                player2.y -= aiSpeed * (Math.random() * 0.8 + 0.6); // Randomness to make AI less perfect
            } else {
                player2.y += aiSpeed * (Math.random() * 0.8 + 0.6); // Randomness
