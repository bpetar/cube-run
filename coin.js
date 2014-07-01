//js file that takes care of cube position and animations

//roll the coin
//get coin position on the table
//coin two sides?

function coin (options) {

	var that = {}

	that.coin_frameIndex = 0;
	that.coin_tickCount = 0;
	that.coin_ticksPerFrame = options.ticksPerFrame || 0;
	that.coin_numberOfFrames = options.numberOfFrames || 1;

	that.coin_context = options.context;

	that.coin_width = options.width;
	that.coin_height = options.height;
	that.coin_image = options.image;
	that.coin_x = 0;
	that.coin_y = 0;

	that.coin_direction = "none";

	that.tablePosition = {x:options.posX, y:options.posY};

	that.roll = function (_direction) {
			if (_direction == "right")
					that.coin_frameIndex = 0
			else if (_direction == "left")
					that.coin_frameIndex = 10
			else if (_direction == "up")
					that.coin_frameIndex = 10
			else if (_direction == "down")
					that.coin_frameIndex = 0
			that.coin_direction = _direction;
	}

	that.update = function () {

			if (that.coin_direction != "none")
			{
					that.coin_tickCount += 1;

					if (that.coin_tickCount > that.coin_ticksPerFrame) {

							that.coin_tickCount = 0;
							
							if (that.coin_direction == "right")
							{
									// If the current frame index is in range
									if (that.coin_frameIndex < that.coin_numberOfFrames - 1) {  
											// Go to the next frame
											that.coin_frameIndex += 1;
											that.coin_x +=10
									} else {
											that.coin_frameIndex = 0;
											that.coin_direction = "none";
											coin2.coin_x = that.coin_x;
									}
							}
							else if (that.coin_direction == "left")
							{
									// If the current frame index is in range
									if (that.coin_frameIndex > 0) {  
											// Go to the next frame
											that.coin_frameIndex -= 1;
											that.coin_x -=10
									} else {
											that.coin_frameIndex = 10;
											that.coin_direction = "none";
											coin2.coin_x = that.coin_x;
									}
							}
							else if (that.coin_direction == "up")
							{
									// If the current frame index is in range
									if (that.coin_frameIndex > 0) {  
											// Go to the next frame
											that.coin_frameIndex -= 1;
											that.coin_y -=10
									} else {
											that.coin_frameIndex = 10;
											that.coin_direction = "none";
											coin.coin_y = that.coin_y;
									}
							}
							else if (that.coin_direction == "down")
							{
									// If the current frame index is in range
									if (that.coin_frameIndex < that.coin_numberOfFrames - 1) {  
											// Go to the next frame
											that.coin_frameIndex += 1;
											that.coin_y +=10
									} else {
											that.coin_frameIndex = 0;
											that.coin_direction = "none";
											coin.coin_y = that.coin_y;
									}
							}
					}
			}
	};
	
	that.clear = function () {
		// Clear the canvas
		that.coin_context.clearRect(0, 0, that.coin_width, that.coin_height);
	}

	that.render = function () {
	
		// Clear the canvas
		//that.coin_context.clearRect(0, 0, that.coin_width, that.coin_height);
		
		// Draw the animation
		that.coin_context.drawImage(
			that.coin_image,
			that.coin_frameIndex * that.coin_width / that.coin_numberOfFrames,
			0,
			100,
			100,
			that.coin_x,
			that.coin_y,
			100,
			100);
	};

	that.renderUp = function () {
	
		// Clear the canvas
		//that.coin_context.clearRect(0, 0, that.coin_width, that.coin_height);
		
		// Draw the animation
		that.coin_context.drawImage(
			that.coin_image,
			0,
			that.coin_frameIndex * that.coin_height / that.coin_numberOfFrames,
			100,
			100,
			that.coin_x,
			that.coin_y,
			100,
			100);
	};
	
	return that;
}


