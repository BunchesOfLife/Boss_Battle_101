var boss1;
var bossGameStartX = 100;
var bossGameStartY = 200;
var bossBezierStartX;
var bossBezierStartY;
var bossBezierX1;
var bossBezierX2;
var bossBezierY1;
var bossBezierY2;
var bossEndX;
var bossEndY;
var spinAmp = 1;
var bossHealth = 2000;
var bossHealthText;
var count = 0;
var attackSwitch = true;
var attackCounter = 0;
var attack;
var basic;
var spinOverride = false;

function bossSetup() {
	boss1 = game.add.sprite(bossGameStartX, bossGameStartY, 'boss');
	boss1.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(boss1);
	boss1.body.immovable = true;
	bossHealthText = game.add.text(20, 540, "Boss Health " + bossHealth, style);
	boss1.body.moves = false;
}

function bossBasicMovement(loop) {
	bossBezierStartX = bossGameStartX;
	bossBezierStartY = bossGameStartY;
	bossBezierX1 = 100;
	bossBezierY1 = -400;
	bossBezierX2 = 700;
	bossBezierY2 = 600;
	bossEndX = 700;
	bossEndY = 200;
	var tween1 = game.add.tween(boss1).to({
			x: [bossBezierStartX, bossBezierX1, bossBezierX2, bossEndX], 
			y: [bossBezierStartY, bossBezierY1, bossBezierY2, bossEndY]}, 
			2000, Phaser.Easing.Sinusoidal.InOut).interpolation(function(v, k){
				return Phaser.Math.bezierInterpolation(v, k);
     });
	
	
	bossBezierStartX = bossEndX;
	bossBezierStartY = bossEndY;
	bossBezierX1 = 700;
	bossBezierY1 = -400;
	bossBezierX2 = 100;
	bossBezierY2 = 600;
	bossEndX = bossGameStartX;
	bossEndY = bossGameStartY;
	
	var tween2 = game.add.tween(boss1).to({
			x: [bossBezierStartX, bossBezierX1, bossBezierX2, bossEndX], 
			y: [bossBezierStartY, bossBezierY1, bossBezierY2, bossEndY]}, 
			2000, Phaser.Easing.Sinusoidal.InOut).interpolation(function(v, k){
				return Phaser.Math.bezierInterpolation(v, k);
	});
	
	tween1.chain(tween2).start();
	return tween1;
}

function attackManager() {
	if(attackCounter >= 500){
		attackCounter = 0;
		spinAmp = 4;
		spinOverride = true;
		attack.start();
	} else {
		attack.onComplete.add(function(){
			basic.start();
			spinAmp = 1;
			spinOverride = false;});
		attackCounter++;
	}
}

function bossFire() {
	count += 1;
	if(count >= 25){
		var bullet = boss_projectiles.getFirstExists(false);
		if (bullet) {
			var x = boss1.x
			var y = boss1.y
			
			bullet.reset(x, y);
			bullet.lifespan = 1500;
			
			game.physics.arcade.velocityFromRotation(angleToPoint(x, y, player.position.x, player.position.y), 500, bullet.body.velocity);
		}
		count = 0;
	}
}

function bossSpin() {
	var spinRate = 0.05;
	if(!spinOverride) {
		if(boss1.body.position.x > player.body.position.x){
			boss1.rotation -= spinRate;
		} else {
			boss1.rotation += spinRate;
		}
	} else {
		boss1.rotation += spinRate * spinAmp;
	}
}

function slideAttack() {
	x = [74, 726, bossGameStartX];
	y = [451, 451, bossGameStartY];
	var tween = game.add.tween(boss1).to({x: x, y: y}, 2000);
	return tween;
}