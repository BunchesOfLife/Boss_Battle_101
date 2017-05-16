var menuStyle = { font: "34px Motorwerk", fill: "#E3CA31", align: "center" };

var startState = function(game) {
	this.bg;
	this.start_b;
	this.controls_b;
};

startState.prototype.preload = function() {
	game.load.image('bg', 'resources/title_screen.png');
	game.load.image('start', 'resources/start.png');
	game.load.image('instructions', 'resources/instructions.png');
}

startState.prototype.create = function() {
	this.bg = game.add.sprite(0, 0, 'bg');
	this.bg.width = game.world.width;
	this.bg.height = game.world.height;
	
	this.start_b = game.add.button(game.world.centerX, 350, 'start', function() {game.state.start('game');}, this).anchor.setTo(0.5,0.5);
	this.controls_b = game.add.button(game.world.centerX, 405, 'instructions', function() {game.state.start('controls');}, this).anchor.setTo(0.5,0.5);
}

startState.prototype.update = function() {}

game.state.add('start', startState);
game.state.start('start');