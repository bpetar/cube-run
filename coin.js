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

	that.coin_sprite_width = options.spriteWidth;
	that.coin_sprite_height = options.spriteHeight;

	that.coin_sprite_frame_width = options.spriteFrameWidth;
	that.coin_sprite_frame_height = options.spriteFrameHeight;

	that.coin_tableFieldSize = options.tableFieldSize;

	that.coin_image = options.image;
	that.coin_x = (options.posX-1)*that.coin_tableFieldSize;
	that.coin_y = (options.posY-1)*that.coin_tableFieldSize;

	that.coin_animation_row = 0; //sprite animation row

	that.coin_direction = "none";


	that.tablePosition = {x:options.posX, y:options.posY};

	that.roll = function (_direction) {
			if (_direction == "right") {
				that.coin_frameIndex = 0;
				that.coin_animation_row = 0;
			}
			else if (_direction == "left") {
				that.coin_frameIndex = 10;
				that.coin_animation_row = 0;
			}
			else if (_direction == "up") {
				that.coin_frameIndex = 10;
				that.coin_animation_row = 1;
			}
			else if (_direction == "down") {
				that.coin_frameIndex = 0;
				that.coin_animation_row = 1;
			}
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
											that.tablePosition.x++;
											moveFinished();
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
											that.tablePosition.x--;
											moveFinished();
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
											that.tablePosition.y--;
											moveFinished();
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
											that.tablePosition.y++;
											moveFinished();
									}
							}
					}
			}
	};
	
	that.clear = function () {
		// Clear the canvas
		that.coin_context.clearRect(that.coin_x, that.coin_y, that.coin_tableFieldSize, that.coin_tableFieldSize);
	}

	that.render = function () {
	
		// Draw the animation
		that.coin_context.drawImage(
			that.coin_image,
			that.coin_frameIndex * that.coin_sprite_width / that.coin_numberOfFrames,
			that.coin_animation_row*that.coin_sprite_frame_height,
			that.coin_sprite_frame_width,
			that.coin_sprite_frame_height,
			that.coin_x,
			that.coin_y,
			that.coin_tableFieldSize,
			that.coin_tableFieldSize);
	};
	
	return that;
}


