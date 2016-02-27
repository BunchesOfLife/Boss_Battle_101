/** 
 *  Author: Brady Murren
 */
 
// mainState
gameState.prototype = {
    
    //load all game assets
    preload: function () {
        game.load.image('player', 'resources/player.png');
		game.load.image('ground', 'resources/ground.png');
		game.load.image('player_projectile', 'resources/player_projectile.png');
		game.load.image('boss', 'resources/boss.png');
		game.load.image('boss_projectile', 'resources/boss_projectile.png');
    },
	
	init: function () {
		startTime = game.time.now;
		playerHealth = 300;
		bossHealth = 3000;
		fastBurstSwitch = false;
		targetedSwitch = false;
		starfallSwitch = false;
		slowBurstSwitch = false;
		spinOverride = false;
	},
    
    //constructor
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

		platformSetup();
		
		playerSetup();

		initKeyboard();
		
		projectileSetup();
		
		bossSetup();
		
		basic1 = bossBasicMovement1().start();
		basic2 = bossBasicMovement2();
		
		basic1.onComplete.add(attackManager);
		basic2.onComplete.add(attackManager);
	},

    //game loop
    update: function () {
        game.physics.arcade.collide(player, ground);
		game.physics.arcade.overlap(player, boss1, bossCollide, null, this);
		game.physics.arcade.overlap(player_projectiles, boss1, playerBulletHit, null, this);
		game.physics.arcade.overlap(boss_projectiles, player, bossBulletHit, null, this);
		
		playerControls();
		bossSpin();
		starFire();
		playerRegen();
		
		//end the game at win or loss
		if(playerHealth <= 0 || bossHealth <= 0) {
			endTime = game.time.now;
			if (playerHealth < 0) {playerHealth = 0};
			if (bossHealth < 0) {bossHealth = 0};
			game.state.start('end');
		}
    },
};

//links the name 'game' to the gameState
game.state.add('game', gameState);