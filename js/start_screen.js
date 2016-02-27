var startState = function(game) {
	this.title;
};

startState.prototype.preload = function() {
	game.load.image('title', 'resources/title_screen.png');
}

startState.prototype.create = function() {
	this.title = game.add.sprite(0, 0, 'title');
	this.title.width = game.world.width;
	this.title.height = game.world.height;
	game.input.onDown.addOnce(function() {game.state.start('game');}, this);
}

startState.prototype.update = function() {}

game.state.add('start', startState);
game.state.start('start');