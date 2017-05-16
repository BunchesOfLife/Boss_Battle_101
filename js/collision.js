function collisionHandler() {
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, boss1);
}