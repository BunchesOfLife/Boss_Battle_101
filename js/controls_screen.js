var controlsState = function(game) {
	this.bg;
};

controlsState.prototype.preload = function() {
	game.load.image('bg', 'resources/menu_bg.png');
}

controlsState.prototype.create = function() {
	this.bg = game.add.sprite(0, 0, 'bg');
	this.bg.width = game.world.width;
	this.bg.height = game.world.height;
	game.input.onDown.addOnce(function() {game.state.start('start');}, this);
	game.add.text(game.world.width/2, game.world.height/2, 'Goal: Kill the Boss as fast as you can\nwhile losing the least amount of health.\nAvoid touching the stars and the Boss.\n\nControls:\nLeft click to shoot towards pointer\nA/D to move left/right\nW to jump', menuStyle).anchor.setTo(0.5,0.5);
}

controlsState.prototype.update = function() {}

game.state.add('controls', controlsState);