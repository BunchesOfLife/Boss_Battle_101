var endState = function(game) {
	this.end;
};

endState.prototype.preload = function() {
	game.load.image('bg', 'resources/menu_bg.png');
}

endState.prototype.create = function() {
	this.end = game.add.sprite(0, 0, 'bg');
	this.end.width = game.world.width;
	this.end.height = game.world.height;
	game.input.onDown.addOnce(function() {game.state.start('start');}, this);
	var time = (endTime - startTime) / 1000;
	var score = Math.round((playerHealth * 100) / time, 1);
	game.add.text(game.world.width/2, 200, 
		"Player Health: " + playerHealth + "\nBoss Health: " + bossHealth + "\nFight Time: " + time + " sec\n" + "Score: " + score,
		menuStyle).anchor.setTo(0.5,0.5);
}

endState.prototype.update = function() {}

game.state.add('end', endState);