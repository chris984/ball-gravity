// Select the canvas element and get its 2D drawing context
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Define the ball object with initial properties
const ball = {
    x: canvas.width / 2, // Horizontal position (center of canvas)
    y: canvas.height / 2, // Vertical position (center of canvas)
    radius: 20, // Radius of the ball
    color: 'blue', // Ball color
    velocityY: 0, // Initial vertical velocity
    gravity: 0.5, // Gravity strength (acceleration)
    bounceFactor: 0.7, // Energy retained after bounce
    isFalling: false // Initial falling state
};

// Function to draw the ball on the canvas
function drawBall() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    context.beginPath(); // Start a new path for the ball
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // Draw the ball as a circle
    context.fillStyle = ball.color; // Set the fill color
    context.fill(); // Fill the circle with the color
    context.closePath(); // Close the path
}

// Function to update the ball's position and velocity
function updateBall() {
    if (ball.isFalling) {
        ball.velocityY += ball.gravity; // Apply gravity to velocity
        ball.y += ball.velocityY; // Update vertical position

        // Check for collision with the ground
        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius; // Correct position to rest on the ground
            ball.velocityY *= -ball.bounceFactor; // Invert velocity and apply bounce factor

            // Stop bouncing if the bounce is too small
            if (Math.abs(ball.velocityY) < 1) {
                ball.velocityY = 0;
                ball.isFalling = false; // Stop falling if almost no velocity
            }
        }
    }
}

// Main animation loop
function gameLoop() {
    drawBall(); // Draw the ball
    updateBall(); // Update ball position and velocity
    requestAnimationFrame(gameLoop); // Continue the loop
}

// Initialize the game loop
gameLoop();

// Add event listener to handle clicks on the canvas
canvas.addEventListener('click', () => {
    if (!ball.isFalling) {
        // Start falling if the ball is stationary
        ball.isFalling = true;
        ball.velocityY = -10; // Give the ball an initial upward velocity
    } else {
        // Apply an upward force on each click
        ball.velocityY = -10; // Reset vertical velocity for bounce
    }
});

