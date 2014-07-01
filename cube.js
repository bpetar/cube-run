//js file that takes care of cube position and animations

//roll the cube
//rotate the cube
//get cube top number
//get cube position on the table
//get cube rotation state (up, down, left, right)

function cube (options) {

	frameIndex = 0;
	tickCount = 0;
	ticksPerFrame = options.ticksPerFrame || 0;
	numberOfFrames = options.numberOfFrames || 1;

	context = options.context;

	width = options.width;
	height = options.height;
	image = options.image;
	x = 0;
	y = 0;

	direction = "none";

	tablePosition = {x:options.posX, y:options.posY};
	topNumber = options.topNumber;
	rotationState = 0;

	rotate = function (_direction) {
		if (_direction == "right")
			rotationState++;
		else
			rotationState--;
	}

	roll = function (_direction) {
			if (_direction == "right")
					frameIndex = 0
			else if (_direction == "left")
					frameIndex = 10
			else if (_direction == "up")
					frameIndex = 10
			else if (_direction == "down")
					frameIndex = 0
			direction = _direction;
	}

	update = function () {

			if (direction != "none")
			{
					tickCount += 1;

					if (tickCount > ticksPerFrame) {

							tickCount = 0;
							
							if (direction == "right")
							{
									// If the current frame index is in range
									if (frameIndex < numberOfFrames - 1) {  
											// Go to the next frame
											frameIndex += 1;
											x +=10
									} else {
											frameIndex = 0;
											direction = "none";
											coin2.x = x;
									}
							}
							else if (direction == "left")
							{
									// If the current frame index is in range
									if (frameIndex > 0) {  
											// Go to the next frame
											frameIndex -= 1;
											x -=10
									} else {
											frameIndex = 10;
											direction = "none";
											coin2.x = x;
									}
							}
							else if (direction == "up")
							{
									// If the current frame index is in range
									if (frameIndex > 0) {  
											// Go to the next frame
											frameIndex -= 1;
											y -=10
									} else {
											frameIndex = 10;
											direction = "none";
											coin.y = y;
									}
							}
							else if (direction == "down")
							{
									// If the current frame index is in range
									if (frameIndex < numberOfFrames - 1) {  
											// Go to the next frame
											frameIndex += 1;
											y +=10
									} else {
											frameIndex = 0;
											direction = "none";
											coin.y = y;
									}
							}
					}
			}
	};
	
	clear = function () {
		// Clear the canvas
		context.clearRect(0, 0, width, height);
	}

	render = function () {
	
		// Clear the canvas
		//context.clearRect(0, 0, width, height);
		
		// Draw the animation
		context.drawImage(
			image,
			frameIndex * width / numberOfFrames,
			0,
			100,
			100,
			x,
			y,
			100,
			100);
	};

	renderUp = function () {
	
		// Clear the canvas
		//context.clearRect(0, 0, width, height);
		
		// Draw the animation
		context.drawImage(
			image,
			0,
			frameIndex * height / numberOfFrames,
			100,
			100,
			x,
			y,
			100,
			100);
	};
	
	return this;
}


