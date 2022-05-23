const FPS = 20;

document.addEventListener("keydown", keyDown); // arrow key input
document.addEventListener("keyup", keyUp); // arrow release change

function keyDown(event) { // check what arrow key
    if (event.keyCode == '38') { // up arrow
        ship.forwardMoving = true;
    } else if (event.keyCode == '37') { // left arrow
        ship.rotate = 2 * Math.PI / FPS;
    } else if (event.keyCode == '39') { // right arrow
        ship.rotate = -2 * Math.PI / FPS;
    }
}

function keyUp(event) {
    if (event.keyCode == "38") {
        ship.forwardMoving = false;
    } else if (event.keyCode == '39') {
        ship.rotate = 0;
    } else if (event.keyCode == '37') {
        ship.rotate = 0;
    }
}

var canv = document.getElementById("gameCanvas");
var ctx = canv.getContext("2d");
var ship = {
    x: 250,
    y: 250,
    rotate: 0,
    rotateAdjust: 0.5 * Math.PI,
    forwardMoving: false,
    thrustX: 0,
    thrustY: 0
}

setInterval(update, FPS); // calls the update funtion every fps in milliseconds

function update() {
    // background
    ctx.fillStyle = "black"
    ctx.fillRect(-1, 0, canv.width, canv.height);

    ship.rotateAdjust += ship.rotate;

    // player - triangle
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    // top point of triangle
    ctx.moveTo(ship.x + 4 / 3 * 15 * Math.cos(ship.rotateAdjust), ship.y - 4 / 3 * 15 * Math.sin(ship.rotateAdjust));
    // left point of triangle
    ctx.lineTo(ship.x - 15 * (2 / 3 * Math.cos(ship.rotateAdjust) + Math.sin(ship.rotateAdjust)), ship.y + 15 * (2 / 3 * Math.sin(ship.rotateAdjust) - Math.cos(ship.rotateAdjust)));
    // right point of triangle
    ctx.lineTo(ship.x - 15 * (2 / 3 * Math.cos(ship.rotateAdjust) - Math.sin(ship.rotateAdjust)), ship.y + 15 * (2 / 3 * Math.sin(ship.rotateAdjust) + Math.cos(ship.rotateAdjust)));
    ctx.closePath();
    ctx.stroke();

    // move ship forward
    if (ship.forwardMoving) {
        ship.thrustX += 1 * Math.cos(ship.rotateAdjust) / FPS;
        ship.thrustY -= 1 * Math.sin(ship.rotateAdjust) / FPS;
    } else { // add friction to move slower when not moving forward
        ship.thrustX *= 0.99;
        ship.thrustY *= 0.99;
    }
    ship.x += ship.thrustX;
    ship.y += ship.thrustY;

    // check boundries for ship and canvas
    if (ship.x < 0) {
        ship.x = 500;
    }
    if (ship.x > 500) {
        ship.x = 0;
    }
    if (ship.y < 0) {
        ship.y = 500;
    }
    if (ship.y > 500) {
        ship.y = 0;
    }

}
