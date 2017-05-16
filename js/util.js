//returns the angle between two points from positive x
function angleToPoint(x1,y1,x2,y2) {
	return Math.atan2(y2 - y1, x2 - x1);
}

//returns a random integer between 1 and the bound
function randomInRange(bound) {
	return Math.floor((Math.random() * bound) + 1);
}
