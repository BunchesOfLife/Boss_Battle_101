var gameProperties = {
    screenWidth: 800,
    screenHeight: 600,
};

var gameState = function(){
    this.key_left;
	this.key_right;
	this.key_jump;
	this.key_fire;
};

//'gameDiv' is the id in index.html
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

var ground;
var platforms;
var style = { font: "16px Arial", fill: "#ffffff", align: "right" };
var startTime, endTime;

//define keyboard and mouse inputs
function initKeyboard() {
	this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.key_jump = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.key_fire = game.input.activePointer;
}

function platformSetup() {
	platforms = game.add.group();
	platforms.enableBody = true;
	ground = platforms.create(0,game.world.height - 75,'ground');
	ground.body.immovable = true;
}