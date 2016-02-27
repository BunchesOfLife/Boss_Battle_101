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
var bossHealth;
var bossHealthText;
var attackSwitch = true;
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
	spinAmp = 4;
	spinOverride = true;
	if (id == 3 || id == 5 || id == 10) {
		starburstSwitch = true;
	} else if (id == 4 || id == 8) {
		targetedSwitch = true;
	} else if (id == 6) {
		starfallSwitch = true;
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
		targetedSwitch = false;
		starfallSwitch = false;});
	basicSwitch = !basicSwitch;
}

function attackDecider() {
	var attack;
	var rand = randomInRange(10);
	//var rand = 10;
	if(rand == 1) {
		attack = slideAttack();
	} else if (rand == 2) {
		attack = targetedSlam();
	} else if (rand == 3) {
		attack = starburst();
	} else if (rand == 4) {
		attack = targetedStars();
	} else if (rand == 5) {
		attack = offScreenStarburst();
	} else if (rand == 6) {
		attack = starfall();
	} else if (rand == 7) {
		attack = randomMove();
	} else if (rand == 8) {
		attack = edgeMove();
	} else if (rand == 9) {
		attack = zigzag();
	} else if (rand == 10) {
		attack = xBurst();
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