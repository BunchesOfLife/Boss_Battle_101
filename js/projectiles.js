var player_projectiles;
var playerAmmoCap = 50;
var boss_projectiles;
var bossAmmoCap = 100;

function projectileSetup() {
	player_projectiles = game.add.group();
	player_projectiles.enableBody = true;
	player_projectiles.physicsBodyType = Phaser.Physics.ARCADE;
	player_projectiles.createMultiple(playerAmmoCap,'player_projectile');
	player_projectiles.setAll('anchor.x',0.5);
	player_projectiles.setAll('anchor.y',0.5);
	
	boss_projectiles = game.add.group();
	boss_projectiles.enableBody = true;
	boss_projectiles.physicsBodyType = Phaser.Physics.ARCADE;
	boss_projectiles.createMultiple(bossAmmoCap, 'boss_projectile');
	boss_projectiles.setAll('anchor.x',0.5);
	boss_projectiles.setAll('anchor.y',0.5);
}

function bossBulletHit(player, bullet) {
	bullet.kill();
	
	if (hitTimer <= 0){
		playerHealth -= 10;
		hitTimer = 50;
	}
	playerHealthText.text = "Player Health " + playerHealth;
}

function playerBulletHit(boss1, bullet) {
	bullet.kill();
	bossHealth -= 1;
	bossHealthText.text = "Boss Health " + bossHealth;
}