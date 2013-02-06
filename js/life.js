var ctx = null;
var canvas = null;
var self = null;

var grid = null;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function makeGrid (x,y) {
	// make grid
	grid = [];
  	for (var i = 0; i < x; i++) {
    	grid[i] = [];
  		for (var j = 0; j < y; j++) {
			grid[i][j] = getRandomInt(0,1);
		}
  	}
}

function main (x,y) {
	self = this;
	canvas = document.getElementById('petri');
	ctx = canvas.getContext('2d');
	makeGrid(x,y);
	draw();
};

function rules (cell, count){
	var state = 0;
	if (cell === 1){
		// cell is alive
		if (count < 2 || count > 3){
			state = 0
		}else{
			state = 1;
		}
	}else{
		if (count === 3){
			cell = 1;
		}
	}
	return state;
};

function run () {
	var xlen = grid.length;
	var ylen = grid[0].length;
	var newGrid = [];
	newGrid = $.extend(newGrid, grid);

	for (var x = 0; x < xlen; x++){
		for (var y = 0; y < ylen; y++){
			var cell = grid[x][y];

			//count living neightbours
			var nx = x-1;
			var px = x+1;
			var ny = y-1;
			var py = y+2;
			var count = 0;

			//top row
			if (nx >= 0 && py < ylen)
				count += grid[nx][py];

			if (py < ylen)
				count += grid[x][py];

			if (px < xlen && py < ylen)
				count += grid[px][py];

			// middle row
			if (nx >= 0)
				count += grid[nx][y];
			//count += grid[x][y];
			if (px < xlen)
				count += grid[px][y];

			// bottom row
			if (nx >= 0 && ny >= 0)
				count += grid[nx][ny];
			if (ny >= 0)
				count += grid[x][ny];
			if (px < xlen && ny >= 0)
				count += grid[px][ny];

			newGrid[x][y] = rules(cell, count);
		}
	}

	grid = $.extend(grid, newGrid);
	draw();
};

function draw () {
	var r = 200;//getRandomInt(0, 255);
	var g = 0;//getRandomInt(0, 255);
	var b = 0;//getRandomInt(0, 255);

	var xlen = grid.length;
	var ylen = grid[0].length;

	for (var x = 0; x < xlen; x++){
		for (var y = 0; y < ylen; y++){
			var cell = grid[x][y];
			if (cell === 1){
				ctx.fillStyle = "rgb("+r+","+g+","+b+")";
				ctx.fillRect (x, y, 1, 1);
			}else{
				ctx.fillStyle = "rgb(0,0,0)";
				ctx.fillRect (x, y, 1, 1);
			}
		}
	}
	setTimeout(self.run, 100);
};


