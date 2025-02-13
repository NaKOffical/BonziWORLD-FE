var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;

var ballCount = 2;

var balls = [];
var inverted = false;

// create the balls
// for(ball=1; ball<=ballCount; ball++) {
//     balls[ball-1] = {
//         x: ball * ballRadius * 2,
//         y: ball * ballRadius * 2,
//         dx: 2,
//         dy: inverted ? 2 : -2,
//         inverted: inverted,
//     };
//     inverted = !inverted;
// }

balls[0] = {
    name: 'bottom left',
    x: 15,
    y: canvas.height -20,
    dx: 2, // ball velocity
    dy: -2, // ball velocity
    inverted: inverted,
}

balls[1] = {
    name: 'top right',
    x: canvas.height -20,
    y: 20,
    dx: -2, // ball velocity
    dy: 2, // ball velocity
    inverted: inverted,
}


function drawBalls() {
    ctx.beginPath();

    for(i=0; i<ballCount; i++) {
        var ball = balls[i];
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

// following formula at bottom of https://en.wikipedia.org/wiki/Elastic_collision
function newVelocity(ball, ballCollidedWith) {
    var newVelocity = {
        dx: 0,
        dy: 0
    };

    var magnitude =  Math.pow(ball.x - ballCollidedWith.x, 2) + Math.pow(ball.y - ballCollidedWith.y, 2);
    // console.log(magnitude);

    var velocityDeltaX = ball.dx - ballCollidedWith.dx;
    var velocityDeltaY = ball.dy - ballCollidedWith.dy;
    var positionDeltaX = ball.x - ballCollidedWith.x;
    var positionDeltaY = ball.y - ballCollidedWith.y;
    var dotProduct = velocityDeltaX * positionDeltaX + velocityDeltaY * positionDeltaY;
    // console.log(dotProduct);

    newVelocity.dx = ball.dx - (dotProduct / magnitude) * positionDeltaX;
    newVelocity.dy = ball.dy - (dotProduct / magnitude) * positionDeltaY;
    console.log(ball.name + 'new vel x:' + newVelocity.dx);
    console.log(ball.name + 'new vel y:' + newVelocity.dy);
    // these are correct - ball should go back the way it came
    // BUT the first ball in the collision has already changed direction!


    return newVelocity;
}


function ballCollisionDetection(){
    // for(i=0; i<ballCount; i++) {
        // consider a ball
        var ball = balls[0];
        // check for collision against all other balls
        for(j=0; j<ballCount; j++) {
            if (0 === j){
                continue;
            } else {
                var otherBall = balls[j];
                // check for collision
                var dxsqu = Math.pow(ball.x - otherBall.x, 2);
                var dysqu = Math.pow((canvas.height - ball.y) - (canvas.height - otherBall.y), 2);
                var drsqu = Math.pow(ballRadius + ballRadius, 2);
                // console.log('distance: ' + (dxsqu - dysqu));
                // console.log('rad squd: ' + drsqu);

                if(dxsqu + dysqu <= drsqu) {
                    // change their directions
                    // alert('collided!');
                    console.log('collision!');
                    var newVelocityball = newVelocity(ball, otherBall);
                    var newVelocityOtherBall = newVelocity(otherBall, ball);
                    ball.dx = newVelocityball.dx;
                    ball.dy = newVelocityball.dy;
                    otherBall.dx = newVelocityOtherBall.dx;
                    otherBall.dy = newVelocityOtherBall.dy;
                    // dy = -dy;
                    // b.status = 0;
                    // break;
                }
            }
        }
    // }


    // dont actually change dx until all of this has happened - have a holding value - change all dxs and dys after for loop??
}

function move_ball(ball) {
    var x = ball.x;
    var y = ball.y;
    var dx = ball.dx;
    var dy = ball.dy;
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy;
    }

    x += dx;
    y += dy;
    ball.x = x;
    ball.y = y;
    ball.dx = dx;
    ball.dy = dy;
}

function draw() {
    // repaint
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballCollisionDetection();
    drawBalls();

    // move the balls
    for (var i = balls.length - 1; i >= 0; i--) {
        move_ball(balls[i]);
    }

    requestAnimationFrame(draw);
}

draw();
