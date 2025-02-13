var loadState = {

	preload : function() {
		game.load.spritesheet('mario', 'assets/images/mario.png', 28.8, 32);
		game.load.spritesheet('koopa', 'assets/images/koopaok.png', 24.2, 37);
		game.load.tilemap('tileMap', 'assets/tilemaps/my-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('map', 'assets/tilemaps/super_mario.png');
		game.load.image('mushroom', 'assets/images/mushroom.png');
		game.load.image('acceuil', 'assets/images/acceuilMario.jpg');
		game.load.audio('blop', 'assets/sons/jump.mp3');
		game.load.audio('music', 'assets/sons/mario-theme.mp3');
		game.load.audio('up', 'assets/sons/mushroom soundEffect.mp3');
	},

	create : function() {
		game.state.start('menu');
	}		
}