var boss1;
var bossGameStartX = 100;
var bossGameStartY = 200;
var bossBasic2StartX = 700;
var bossBasic2StartY = 200;
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
var attackSwitch = true;
var attackCounter = 0;
var basic1, basic2;
var basicSwitch = true;
var spinOverride = false;

function bossSetup() {
	boss1 = game.add.sprite(bossGameStartX, bossGameStartY, 'boss');
	boss1.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(boss1);
	boss1.body.immovable = true;
	bossHealthText = game.add.text(20, 540, "Boss Health " + bossHealth, style);
	boss1.body.moves = false;
}

function bossBasicMovement1() {
	bossBezierStartX = bossGameStartX;
	bossBezierStartY = bossGameStartY;
	bossBezierX1 = 100;
	bossBezierY1 = -350;
	bossBezierX2 = 700;
	bossBezierY2 = 600;
	bossEndX = 700;
	bossEndY = 200;
	var tween = game.add.tween(boss1).to({
			x: [bossBezierStartX, bossBezierX1, bossBezierX2, bossEndX], 
			y: [bossBezierStartY, bossBezierY1, bossBezierY2, bossEndY]}, 
			2000, Phaser.Easing.Sinusoidal.InOut).interpolation(function(v, k){
				return Phaser.Math.bezierInterpolation(v, k);
     });
	return tween;
}

function bossBasicMovement2() {
	bossBezierStartX = bossBasic2StartX;
	bossBezierStartY = bossBasic2StartY;
	bossBezierX1 = 700;
	bossBezierY1 = -350;
	bossBezierX2 = 100;
	bossBezierY2 = 600;
	bossEndX = bossGameStartX;
	bossEndY = bossGameStartY;
	var tween = game.add.tween(boss1).to({
			x: [bossBezierStartX, bossBezierX1, bossBezierX2, bossEndX], 
			y: [bossBezierStartY, bossBezierY1, bossBezierY2, bossEndY]}, 
			2000, Phaser.Easing.Sinusoidal.InOut).interpolation(function(v, k){
				return Phaser.Math.bezierInterpolation(v, k);
	});
	return tween;
}

function attackManager() {
	var tuple, attack, id;
	tuple = attackDecider();
	attack = tuple[0];
	id = tuple[1];
	if(attackCounter >= 500){
		attackCounter = 0;
		spinAmp = 4;
		spinOverride = true;
		if (id == 3) {
			starburstSwitch = true;
		} else if (id == 4) {
			targetedSwitch = true;
		}
		attack[0].start();
		attack[attack.length-1].onComplete.add(function(){
			if(basicSwitch){
				basic1.start();
			} else {
				basic2.start();
			}
			spinAmp = 1;
			spinOverride = false;
			starburstSwitch = false;
			targetedSwitch = false;});
		basicSwitch = !basicSwitch;
	} else {
		attackCounter++;
	}
}

function attackDecider() {
	var attack;
	var rand = Math.floor((Math.random() * 4) + 1);
	//var rand = 4;
	if (!basicSwitch) {
		if(rand == 1) {
			attack = slideAttackLeft();
		} else if (rand == 2) {
			attack = targetedSlam1();
		} else if (rand == 3) {
			attack = starburst1();
		} else if (rand == 4) {
			attack = targetedStars1();
		}
	} else {
		if(rand == 1) {
			attack = slideAttackRight();
		} else if (rand == 2) {
			attack = targetedSlam2();
		} else if (rand == 3) {
			attack = starburst2();
		} else if (rand == 4) {
			attack = targetedStars2();
		}
	}
	return [attack, rand];
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
		if(basicSwitch){
			boss1.rotation += spinRate * spinAmp;
		} else {
			boss1.rotation -= spinRate * spinAmp;
		}
	}
}