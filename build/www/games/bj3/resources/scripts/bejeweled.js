/* JEWEL TYPES */
var JewelType = {
	BLUE		: { name: "Blue",		code: 'B',	icon: 'blue.gif' },
	GREEN		: { name: "Green",		code: 'G',	icon: 'green.gif' },
	HYPERCUBE	: { name: "Hypercube",	code: 'H',	icon: 'hypercube.gif' },
	ORANGE		: { name: "Orange",		code: 'O',	icon: 'orange.gif' },
	PINK		: { name: "Pink",		code: 'P',	icon: 'pink.gif' },
	RED			: { name: "Red",		code: 'R',	icon: 'red.gif' },
	WHITE		: { name: "White",		code: 'W',	icon: 'white.gif' },
	YELLOW		: { name: "Yellow",		code: 'Y',	icon: 'yellow.gif' },
	UNDEFINED	: { name: "Undefined",	code: '?',	icon: 'undefined.gif' }
};

/* BOARD */
SIZE = 8;

function Board() {
	this.canvas = new Canvas();
	this.level = 0;
	this.levelPoints = 0;
	this.totalPoints = 0;
	this.movePoints = 0;
	this.newGame();
};

Board.prototype.newGame = function() {
	this.newBoard();
	this.level++;
	this.levelPoints = 0;
	this.canvas.drawBoard(this.grid);
	this.canvas.drawLevel(this.level);
};

Board.prototype.newBoard = function() {
	this.grid = new Array(SIZE);
	for (var i = 0; i < SIZE; i++) {
		this.grid[i] = new Array(SIZE);
		for (var j = 0; j < SIZE; j++) {
			this.grid[i][j] = this.newJewel(i, j);
		}
	}
};

Board.prototype.swapJewels = function(a, b) {
	if (a.type == b.type || !a.adjacentTo(b)) {
		a = b = null;
		return;
	}
	console.log("switching!");
	this.switch(a, b);
	this.tryToExplode(a);
	this.tryToExplode(b);
	if (this.movePoints == 0) {
		console.log("no points... ");
		this.switch(a, b);
	} else {
		this.updateScore(this.movePoints);
	}
};

Board.prototype.switch = function(a, b) {
	var tempX = a.x;
	var tempY = a.y;
	console.log("a before: " + a.toString());
	console.log("b before: " + b.toString());
	this.moveJewel(a, b.x, b.y);
	this.moveJewel(b, tempX, tempY);
	console.log("a after: " + a.toString());
	console.log("b after: " + b.toString());
};

Board.prototype.moveJewel = function(jewel, x, y) {
	jewel.x = x;
	jewel.y = y;
	this.grid[x][y] = jewel;
	this.canvas.drawJewel(jewel);
};

Board.prototype.updateScore = function(movePoints) {
	this.levelPoints += movePoints;
	this.totalPoints += movePoints;
	this.canvas.drawTotalPoints(this.totalPoints);
	this.movePoints = 0;
	if (this.levelPoints >= SIZE * this.level) {
		this.canvas.levelComplete(this.level);
		this.newGame();
	}
};

Board.prototype.tryToExplode = function(jewel) {
	var toExplode = new Array();
	// grab the ones we can explode horizontally
	// left to the jewel
	for (var j = jewel.y - 1; j >= 0 && jewel.type == this.grid[jewel.x][j].type; j--) {
		toExplode.push(this.grid[jewel.x][j]);
	}
	// the jewel itself
	toExplode.push(jewel);
	// right to the jewel
	for (var j = jewel.y + 1; j < SIZE && jewel.type == this.grid[jewel.x][j].type; j++) {
		toExplode.push(this.grid[jewel.x][j]);
	}
	// if we have stuff to explode
	if (toExplode.length >= 3) {
		console.log("gonna explode horizontally: " + toExplode.toString());
		this.explode(toExplode);
		return;
	}

	toExplode = new Array();
	// grab the ones we can explode vertically
	// above the jewel
	for (var i = jewel.x - 1; i >= 0 && jewel.type == this.grid[i][jewel.y].type; i--) {
		toExplode.push(this.grid[i][jewel.y]);
	}
	// the jewel itself
	toExplode.push(jewel);
	// below the jewel
	for (var i = jewel.x + 1; i < SIZE && jewel.type == this.grid[i][jewel.y].type; i++) {
		toExplode.push(this.grid[i][jewel.y]);
	}
	// if we have stuff to explode
	if (toExplode.length >= 3) {
		console.log("gonna explode vertically: " + toExplode.toString());
		this.explode(toExplode);
		return;
	}
};

Board.prototype.explode = function(toExplode) {
	this.canvas.highlightExplosion(toExplode);
	console.log("exploding: " + toExplode.toString());
	// at this point, we know that toExplode is ordered left-right or up-down
	if (toExplode[0].x == toExplode[1].x) {
		var x = toExplode[0].x;
		var minY = toExplode[0].y;
		for (var i = 1; i < toExplode.length; i++) {
			if (toExplode[i].y < minY) {
				minY = toExplode[i].y;
			}
		}
		console.log("minY: " + minY);
		if (x != 0) {
			// we are exploding horizontally
			for (var k = 0; k < toExplode.length; k++) {
				for (var i = x - 1; i >= 0; i--) {
					console.log("moving (" + i + "," + (minY + k) + ") to (" + (i + 1) + "," + (minY + k) + ")");
					this.moveJewel(this.grid[i][minY + k], i + 1, minY + k);
				}
			}
		}
		this.newRow(minY, toExplode.length);
	} else {
		var minX = toExplode[0].x;
		var y = toExplode[0].y;
		for (var i = 1; i < toExplode.length; i++) {
			if (toExplode[i].x < minX) {
				minX = toExplode[i].x;
			}
		}
		console.log("minX: " + minX);
		// we are exploding vertically
		for (var i = minX - 1; i >= 0; i--) {
			this.moveJewel(this.grid[i][y], i + toExplode.length, y);
		}
		this.newColumn(y, toExplode.length);
	}
	this.movePoints += toExplode.length;
};

Board.prototype.newRow = function(minY, n) {
	for (var k = 0; k < n; k++) {
		var jewel = this.newJewel(0, minY + k);
		this.grid[0][minY + k] = jewel;
		this.canvas.drawJewel(jewel);
	}
};

Board.prototype.newColumn = function(y, n) {
	for (var i = 0; i < n; i++) {
		var jewel = this.newJewel(i, y);
		this.grid[i][y] = jewel;
		this.canvas.drawJewel(jewel);
	}
};

Board.prototype.newJewel = function(x, y) {
	var r = Math.floor(Math.random() * 10) % 7;
	switch (r) {
		case 0:
			return new Jewel(x, y, JewelType.BLUE);
		case 1:
			return new Jewel(x, y, JewelType.GREEN);
		case 2:
			return new Jewel(x, y, JewelType.ORANGE);
		case 3:
			return new Jewel(x, y, JewelType.PINK);
		case 4:
			return new Jewel(x, y, JewelType.RED);
		case 5:
			return new Jewel(x, y, JewelType.WHITE);
		case 6:
			return new Jewel(x, y, JewelType.YELLOW);
		default:
			break;
	}
};

Board.prototype.toString = function() {
	var result = "";
	for (var k = 0; k < SIZE + 2; k++) {
		result += "-";
	}
	result += "\n";
	for (var i = 0; i < SIZE; i++) {
		result += "|";
		for (var j = 0; j < SIZE; j++) {
			result += this.grid[i][j].type.code;
		}
		result += "|\n";
	}
	for (k = 0; k < SIZE + 2; k++) {
		result += "-";
	}
	return result;
};

/* JEWEL */
function Jewel(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = type;
};

Jewel.prototype.adjacentTo = function(other) {
	return (this.x == other.x && this.y == other.y + 1) ||
		   (this.x == other.x && this.y == other.y - 1) ||
		   (this.y == other.y && this.x == other.x + 1) ||
		   (this.y == other.y && this.x == other.x - 1);
};

Jewel.prototype.toString = function() {
	return this.type.code + ":(" + this.x + "," + this.y + ")";
};
