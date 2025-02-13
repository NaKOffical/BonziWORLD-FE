var IMG_DIR = "resources/images/";

function Canvas() {
	this.resetBoard();
	this.listenClicks();
	this.resetScore();
	// variables to store jewels to be swapped
	this.a = null;
	this.b = null;
};

Canvas.prototype.listenClicks = function() {
	for (var i = 0; i < SIZE; i++) {
		for (var j = 0; j < SIZE; j++) {
			var cell = this.getCell(i, j);
			var self = this;
			cell.click(function(){
				var x = $(this).parent().parent().children().index($(this).parent());
				var y = $(this).parent().children().index($(this));
				self.swapJewels(x, y);
			});
		}
	}
};

Canvas.prototype.resetBoard = function() {
	var boardDiv = $("#content");
	var table = "<table id=\"board_table\">";
	for (var i = 0; i < SIZE; i++) {
		table += "<tr>\n";
		for (var j = 0; j < SIZE; j++) {
			table += "<td></td>\n";
		}
		table += "</tr>\n";
	}
	table += "</table>";
	boardDiv.append(table);
};

Canvas.prototype.resetScore = function() {
	var boardDiv = $("#content");
	var score = "<div id=\"level_complete\"></div>";
	score += "<table id=\"score_table\">";
	// level
		score += "<tr>\n";
			score += "<td align=\"left\">Level:</td>\n";
			score += "<td align=\"right\" id=\"level\">0</td>\n";
		score += "</tr>\n";
	// total points
		score += "<tr>\n";
			score += "<td align=\"left\">Total points:</td>\n";
			score += "<td align=\"right\" id=\"total_points\">0</td>\n";
		score += "</tr>\n";
	score += "</table>";
	boardDiv.prepend(score);
};

Canvas.prototype.drawBoard = function(grid) {
	for (var i = 0; i < SIZE; i++) {
		for (var j = 0; j < SIZE; j++) {
			var img = image(IMG_DIR + grid[i][j].type.icon);
			this.getCell(i, j).html(img);
		}
	}
};

Canvas.prototype.drawLevel = function(level) {
	$("#level").html(level);
};

Canvas.prototype.drawTotalPoints = function(totalPoints) {
	$("#total_points").html(totalPoints);
};

Canvas.prototype.levelComplete = function(level) {
	var levelCompleteDiv = $("#level_complete");
	levelCompleteDiv.html("LEVEL " + level + " COMPLETED");
	$("#board_table").fadeOut(2000, function() {
		$("#board_table").fadeIn();
		levelCompleteDiv.fadeOut(2000, function() {
			levelCompleteDiv.html("").fadeIn();
		});
	});
};

Canvas.prototype.drawJewel = function(jewel) {
	var img = image(IMG_DIR + jewel.type.icon);
	var cell = this.getCell(jewel.x, jewel.y);
	cell.html("").html(img).fadeIn(500);
};

Canvas.prototype.highlightExplosion = function(toExplode) {
	for (var i = 0; i < toExplode.length; i++) {
		var jewel = toExplode[i];
		var cell = this.getCell(jewel.x, jewel.y);
		cell.hide().fadeIn(500);
	}
};

Canvas.prototype.getCell = function(x, y) {
	return $("#board_table tr:eq(" + x + ") td:eq(" + y + ")");
};

Canvas.prototype.swapJewels = function(x, y) {
	console.log(x + " " + y);
	if (this.a == null) {
		this.a = board.grid[x][y];
	} else if (this.a != null && this.b == null) {
		this.b = board.grid[x][y];
		board.swapJewels(this.a, this.b);
		this.a = null;
		this.b = null;
	}
};

function image(img_path) {
	return "<img src=\"" + img_path + "\" />";
}
