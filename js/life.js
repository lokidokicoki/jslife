var ctx = null;
var canvas = null;
var self = null;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function main () {
	self = this;
	canvas = document.getElementById('petri');
	ctx = canvas.getContext('2d');
	draw();
};

function draw () {
	var r = getRandomInt(0, 255);
	var g = getRandomInt(0, 255);
	var b = getRandomInt(0, 255);
	ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    ctx.fillRect (10, 10, 55, 50);
	setTimeout(self.draw, 50);
};
