var player;
var playerHealth;
var playerHealthText;
var hitTimer = 0;
var regenTimer = 0;

function playerSetup() {
	player = game.add.sprite(game.world.width / 2 - 32, game.world.height - 139,'player');
	player.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 800;
	player.body.collideWorldBounds = true;
	playerHealthText = game.add.text(600, 540, "Player Health " + playerHealth, style)
}

function playerControls() {
	player.body.velocity.x = 0;

		if (key_left.isDown)
		{
			player.body.velocity.x = -250;
		}
		else if (key_right.isDown)
		{
			player.body.velocity.x = 250;
		}
		if (key_jump.isDown && player.body.touching.down)
		{
			player.body.velocity.y = -600;
		}
		if (key_fire.isDown)
		{
			var bullet = player_projectiles.getFirstExists(false);
			if (bullet) {
                var length = player.width * 0.5;
                var x = player.x + (Math.cos(player.rotation) * length);
                var y = player.y + (Math.sin(player.rotation) * length);
                
                bullet.reset(x, y);
				bullet.lifespan = 1500;
                bullet.rotation = player.rotation;
                
                game.physics.arcade.velocityFromRotation(player.rotation, 500, bullet.body.velocity);
            }
		}
		
		player.rotation = game.physics.arcade.angleToPointer(player);
}

function playerRegen() {
	if(hitTimer > 0){
		hitTimer--;
		regenTimer = 0;
	}
	else{
		regenTimer++;
		if (regenTimer >= 100) {
			if(playerHealth < 300) playerHealth += 5;
			playerHealthText.text = "Player Health " + playerHealth;
			regenTimer = 0;
		}
	}
}

function bossCollide() {
	if (hitTimer <= 0){
		playerHealth -= 30;
		hitTimer = 100;
	}
	playerHealthText.text = "Player Health " + playerHealth;
}