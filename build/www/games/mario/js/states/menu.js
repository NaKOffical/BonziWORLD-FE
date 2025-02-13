var menuState = {

	create : function() {

		var acceuil = game.add.image(0, 0, 'acceuil');
		var playLabel = game.add.text(290, 150, 'Press "P" to play', {font: '25px Arial', fill: '#ffffff'});

		acceuil.scale.setTo(0.64, 0.25);

		var Pkey = game.input.keyboard.addKey(Phaser.Keyboard.P);

		Pkey.onDown.addOnce(this.start, this);
	},

	start : function() {
		game.state.start('play');
	}
}
