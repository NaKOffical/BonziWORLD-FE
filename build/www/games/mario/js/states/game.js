var game = new Phaser.Game(800, 240, Phaser.AUTO, 'gameDiv');

game.state.add('load', loadState);
game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

game.state.start('boot');

var mario;
var mushroom;
var cursors;
var sol;
var bg;
var jumpSound;
var gameSound;
var mushroomSound;
var marioScore = 0;
var marioScoreText;
var map;
var blockLayer;
