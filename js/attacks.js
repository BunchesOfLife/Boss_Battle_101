function slideAttackLeft() {
	x = [74, 726, bossGameStartX];
	y = [451, 451, bossGameStartY];
	var tween = game.add.tween(boss1).to({x: x, y: y}, 2000);
	return [tween];
}

function slideAttackRight() {
	x = [726, 74, bossBasic2StartX];
	y = [451, 451, bossBasic2StartY];
	var tween = game.add.tween(boss1).to({x: x, y: y}, 2000);
	return [tween];
}

function targetedSlam1() {
	x = [player.position.x, bossGameStartX];
	y = [player.position.y, bossGameStartY];
	var tween1 = game.add.tween(boss1).to({x: game.world.width/2, y: 74}, 1000);
	var tween2 = game.add.tween(boss1).to({x: x, y: y}, 1000);
	tween1.chain(tween2);
	return [tween1, tween2];
}

function targetedSlam2() {
	x = [player.position.x, bossBasic2StartX];
	y = [player.position.y, bossBasic2StartY];
	var tween1 = game.add.tween(boss1).to({x: game.world.width/2, y: 74}, 1000);
	var tween2 = game.add.tween(boss1).to({x: x, y: y}, 1000);
	tween1.chain(tween2);
	return [tween1, tween2];
}

var starburstCount = 0;
var starburstSwitch = false;

function starburst1() {
	x = [100, 700, 100, bossGameStartX];
	y = [100, 100, 100, bossGameStartY];
	var tween = game.add.tween(boss1).to({x: x, y: y}, 6000);
	return [tween];
}

function starburst2() {
	x = [700, 100, 700, bossBasic2StartX];
	y = [100, 100, 100, bossBasic2StartY];
	var tween = game.add.tween(boss1).to({x: x, y: y}, 6000);
	return [tween];
}

function starburstFire() {
	if(starburstSwitch){
		starburstCount += 1;
		if(starburstCount >= 3){
			var bullet = boss_projectiles.getFirstExists(false);
			if (bullet) {
				var x = boss1.x
				var y = boss1.y
				
				bullet.reset(x, y);
				bullet.lifespan = 1500;
				
				game.physics.arcade.velocityFromRotation((boss1.rotation), 500, bullet.body.velocity);
			}
			starburstCount = 0;
		}
	}
}