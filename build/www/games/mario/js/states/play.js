var playState = {

	create : function() {

		game.physics.startSystem(Phaser.Physics.ARCADE);
			
		jumpSound = game.add.audio('blop');
		gameSound = game.add.audio('music');
		mushroomSound = game.add.audio('up');
		//this.gameSound.play();

		this.map = game.add.tilemap('tileMap');
		this.map.addTilesetImage('SuperMarioBros-World1-1', 'map');

		this.map.setCollisionBetween(15, 16);
		this.map.setCollisionBetween(13, 17);
		this.map.setCollisionBetween(20, 25);
		this.map.setCollisionBetween(27, 29);
		this.map.setCollision(40);

		this.map.setTileIndexCallback(15, this.removeTile, this);
		this.map.setTileIndexCallback(17, this.win, this);

		this.blocklayer = this.map.createLayer('World1');
		this.blocklayer.resizeWorld();

		game.physics.arcade.enable(this.blocklayer);

		marioScoreText = game.add.text(16, 16, 'player: 0', { fontSize: '32px', fill: '#000000' });

		this.mushroom = game.add.sprite(352, 130, 'mushroom');
		game.physics.arcade.enable(this.mushroom);
		this.mushroom.body.collideWorldBounds = false;
		this.mushroom.scale.setTo(0.2, 0.2);
		this.mushroom.body.gravity.y = 350;
		this.mushroom.kill();

		
		this.bot = game.add.sprite(360, 3*game.world.height/4 - 10, 'koopa');
		game.physics.arcade.enable(this.bot);
		this.bot.body.gravity.y = 300;
		this.bot.body.collideWorldBounds = true;
		//this.bot.animations.add('left', [9, 8, 7, 6, 5, 6, 7, 8],12, true);
		this.bot.animations.add('right', [0, 1, 2, 3, 4, 3, 2, 1], 12, true);
	 
 		//if (this.bot.x < this.bot.width){
	        //this.bot.x = game.world.width-game.world.width;
	    //}

		this.mario = game.add.sprite(0, 3*game.world.height/4 - 32, 'mario');
		game.physics.arcade.enable(this.mario);
		this.mario.body.gravity.y = 460;
		this.mario.body.collideWorldBounds = true;
		this.mario.animations.add('gauche', [3, 4, 5, 4], 12, true);
		this.mario.animations.add('droite', [10, 9, 8, 9], 12, true);

		game.camera.follow(this.mario);

		this.cursors = game.input.keyboard.createCursorKeys();

	},

	update : function() {

		game.physics.arcade.collide(this.mario, this.blocklayer);
		game.physics.arcade.collide(this.mario, this.bot, this.kill);
		game.physics.arcade.collide(this.bot, this.blocklayer);
		game.physics.arcade.collide(this.mushroom, this.blocklayer);
		game.physics.arcade.collide(this.mario, this.mushroom, this.eat);
		game.physics.arcade.overlap(this.mario, this.blocklayer, this.removeTile)

		if (this.bot.body.x > 350){
			this.bot.body.velocity.x -= 1;
			this.bot.animations.play('right');
			this.bot.scale.x = -1;
		}	
		//console.log("x:" + this.mario.body.x);
		//console.log("y:" + this.mario.body.y);
		if (this.bot.body.x <= 10) {
			this.bot.body.velocity.x -= -1;
			this.bot.animations.play('right');
			this.bot.scale.x = 1;

		}

		if (this.cursors.left.isDown){

			this.mario.body.velocity.x = -150;
			this.mario.animations.play('gauche');

		} else if (this.cursors.right.isDown){

			this.mario.body.velocity.x = 150;
			this.mario.animations.play('droite');

		} else {

			this.mario.animations.stop();
			this.mario.body.velocity.x = 0;
			this.mario.frame = 6;
			
		} if (this.cursors.up.isDown && this.mario.body.onFloor()) {        		
            this.mario.body.velocity.y = -250;
            jumpSound.play();
    	}

	},

	removeTile : function(mario, tile){

		if(tile.worldX === 352 && tile.worldY === 144){
			//console.log(tile);
			tile.index = 16;
			this.blocklayer.dirty = true;
			this.mushroom.revive();
		}
		return true;
	},

	eat : function(mario, mushroom){
		//console.log(this.mushroom);
		mushroom.collideDown = true;
		mushroom.collideUp = true;
		mushroom.collideRight = true;
		mushroom.collideLeft = true;

		if(mario.body <= mushroom.body){

			mushroom.kill();
			mushroomSound.play();
			marioScore += 1;
			marioScoreText.text = 'player: ' + marioScore;
			mario.scale.setTo(1.1, 1.3);
		}
	},

	kill : function(mario, bot){

		bot.collideDown = true;
		bot.collideUp = true;
		bot.collideRight = true;
		bot.collideLeft = true;

		//console.log("mario:" + parseInt(mario.body.bottom));
		//console.log("bot:" + parseInt(bot.body.bottom - bot.body.height));

		if(parseInt(mario.body.bottom) <= parseInt(bot.body.bottom - bot.body.height)) {
			bot.kill();
		} else {
			mario.kill();
		}
	},

	win : function(mario, tile) {

		game.state.start('win');

	}	
}	