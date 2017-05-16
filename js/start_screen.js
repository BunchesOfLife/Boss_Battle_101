var menuStyle = { font: "34px Motorwerk", fill: "#E3CA31", align: "center" };

var startState = function(game) {
	this.bg;
	this.title;
	this.start_b;
	this.controls_b;
};

startState.prototype.preload = function() {
	game.load.image('title', 'resources/title.png');
	game.load.image('bg', 'resources/menu_bg.png');
	game.load.image('start', 'resources/start.png');
	game.load.image('instructions', 'resources/instructions.png');
}

startState.prototype.create = function() {
	this.bg = game.add.sprite(0, 0, 'bg');
	this.bg.width = game.world.width;
	this.bg.height = game.world.height;
	
	this.title = game.add.sprite(100, 100, 'title');
	this.bg.width = 456;
	this.bg.height = 159;
	
	this.start_b = new Button(game, 300, 300, 'start', function() {game.state.start('game');}, this);
	this.controls_b = new Button(game, 300, 400, 'instructions', function() {game.state.start('game');}, this);
}

startState.prototype.update = function() {}

game.state.add('start', startState);
game.state.start('start');