/**
 *  
 *  Author: Brady Murren
 *  
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
	},

    //game loop
    update: function () {
        game.physics.arcade.collide(player, ground);
		game.physics.arcade.overlap(player, boss1, bossCollide, null, this);
		game.physics.arcade.overlap(player_projectiles, boss1, playerBulletHit, null, this);
		game.physics.arcade.overlap(boss_projectiles, player, bossBulletHit, null, this);
		
		playerControls();
		
		bossSpin();
		
		starburstFire();
		attackManager();
		playerRegen();
    },
};

//'gameDiv' is the id in index.html
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

//links the name 'game' to the gameState
game.state.add(states.game, gameState);
game.state.start(states.game);