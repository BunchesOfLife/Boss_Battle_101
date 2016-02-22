var count = 0;
var starburstSwitch = false;
var targetedSwitch = false;

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

function targetedStars1() {
	bossBezierStartX = 100;
	bossBezierStartY = 425;
	bossBezierX1 = 100;
	bossBezierY1 = 0;
	bossBezierX2 = 700;
	bossBezierY2 = 0;
	bossEndX = 700;
	bossEndY = 425;
	var tween1 = game.add.tween(boss1).to({x: bossBezierStartX, y: bossBezierStartY}, 500);
	var tween2 = game.add.tween(boss1).to({
			x: [bossBezierStartX, bossBezierX1, bossBezierX2, bossEndX], 
			y: [bossBezierStartY, bossBezierY1, bossBezierY2, bossEndY]}, 
			2500, Phaser.Easing.Quadratic.InOut).interpolation(function(v, k){
				return Phaser.Math.bezierInterpolation(v, k);
    });
	
	var tween3 = game.add.tween(boss1).to({
			x: [bossEndX, bossBezierX2, bossBezierX1, bossBezierStartX], 
			y: [bossEndY, bossBezierY2, bossBezierY1, bossBezierStartY]}, 
			2500, Phaser.Easing.Quadratic.InOut).interpolation(function(v, k){
				return Phaser.Math.bezierInterpolation(v, k);
    });
	 
	var tween4 = game.add.tween(boss1).to({x: bossGameStartX, y: bossGameStartY}, 500);
	
	tween1.chain(tween2.chain(tween3.chain(tween4)));
	return [tween1, tween2, tween3, tween4];
}

function targetedStars2() {
	bossBezierStartX = 700;
	bossBezierStartY = 425;
	bossBezierX1 = 700;
	bossBezierY1 = 0;
	bossBezierX2 = 100;
	bossBezierY2 = 0;
	bossEndX = 100;
	bossEndY = 425;
	var tween1 = game.add.tween(boss1).to({x: bossBezierStartX, y: bossBezierStartY}, 500);
	var tween2 = game.add.tween(boss1).to({
			x: [bossBezierStartX, bossBezierX1, bossBezierX2, bossEndX], 
			y: [bossBezierStartY, bossBezierY1, bossBezierY2, bossEndY]}, 
			2500, Phaser.Easing.Quadratic.InOut).interpolation(function(v, k){
				return Phaser.Math.bezierInterpolation(v, k);
    });
	
	var tween3 = game.add.tween(boss1).to({
			x: [bossEndX, bossBezierX2, bossBezierX1, bossBezierStartX], 
			y: [bossEndY, bossBezierY2, bossBezierY1, bossBezierStartY]}, 
			2500, Phaser.Easing.Quadratic.InOut).interpolation(function(v, k){
				return Phaser.Math.bezierInterpolation(v, k);
    });
	 
	var tween4 = game.add.tween(boss1).to({x: bossBasic2StartX, y: bossBasic2StartY}, 500);
	
	tween1.chain(tween2.chain(tween3.chain(tween4)));
	return [tween1, tween2, tween3, tween4];
}

function starFire() {
	if(starburstSwitch){
		count += 1;
		if(count >= 3){
			var bullet = boss_projectiles.getFirstExists(false);
			if (bullet) {
				var x = boss1.x
				var y = boss1.y
				
				bullet.reset(x, y);
				bullet.lifespan = 1500;
				
				game.physics.arcade.velocityFromRotation(boss1.rotation, 500, bullet.body.velocity);
			}
			count = 0;
		}
	}
	
	if(targetedSwitch) {
		count += 1;
		if(count >= 25){
			var bullet = boss_projectiles.getFirstExists(false);
			if (bullet) {
				var x = boss1.x
				var y = boss1.y
				
				bullet.reset(x, y);
				bullet.lifespan = 1500;
				
				game.physics.arcade.velocityFromRotation(angleToPoint(boss1.position.x, boss1.position.y, player.position.x, player.position.y), 500, bullet.body.velocity);
			}
			count = 0;
		}
	}
}