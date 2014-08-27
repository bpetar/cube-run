//js file that takes care of cube position and animations

//roll the cube
//rotate the cube
//get cube top number
//get cube position on the table
//get cube rotation state (up, down, left, right)

function cube (options) {

	var that = {}

	that.cube_frameIndex = 0;
	that.cube_tickCount = 0;
	that.cube_ticksPerFrame = options.ticksPerFrame || 0;
	that.cube_numberOfFrames = options.numberOfFrames || 1;
	that.cube_context = options.context;
	that.cube_sprite_width = options.spriteWidth;
	that.cube_sprite_height = options.spriteHeight;
	that.cube_sprite_frame_width = options.spriteFrameWidth;
	that.cube_sprite_frame_height = options.spriteFrameHeight;
	that.cube_tableFieldSize = options.tableFieldSize;
	that.cube_scale = options.tableFieldSize/options.spriteFrameWidth;

	that.current_cube_image = null;
	that.cube_image1 = options.image1;
	that.cube_image2 = options.image2;
	that.cube_image3 = options.image3;
	that.cube_image4 = options.image4;
	that.cube_image5 = options.image5;
	that.cube_image6 = options.image6;
	
	that.cube_x = (options.start.x)*that.cube_tableFieldSize;
	that.cube_y = (options.start.y)*that.cube_tableFieldSize;
	that.cube_animation_row = 6*options.rotation; //sprite animation row
	that.cube_direction = "none";
	that.rotationState = options.rotation;
	that.topNumber = options.topNumber;
	that.tablePosition = {x:options.start.x+1, y:options.start.y+1};

	if(options.topNumber == 1)
	{
		that.current_cube_image = that.cube_image1;
	}
	else if(options.topNumber == 2)
	{
		that.current_cube_image = that.cube_image2;
	}
	else if(options.topNumber == 3)
	{
		that.current_cube_image = that.cube_image3;
	}
	else if(options.topNumber == 4)
	{
		that.current_cube_image = that.cube_image4;
	}
	else if(options.topNumber == 5)
	{
		that.current_cube_image = that.cube_image5;
	}
	else if(options.topNumber == 6)
	{
		that.current_cube_image = that.cube_image6;
	}

	that.rotate = function (_direction) {
		if (_direction == "right")
		{
			that.rotationState++;
			if(that.rotationState>3)
				that.rotationState = 0;
		}
		else
		{	
			that.rotationState--;
			if(that.rotationState<0)
				that.rotationState = 3;
		}
	}

	that.changeCubeFace = function (_direction) {
		if (_direction == "right") {
			if (that.topNumber == 1)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 5;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 4;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 2;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 3;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 2)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 3;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 1;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 4;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 6;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 3)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 5;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 1;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 2;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 6;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 4)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 2;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 1;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 5;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 6;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 5)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 4;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 1;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 3;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 6;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 6)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 5;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 3;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 2;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 4;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
		}
		else if (_direction == "left") {
			if (that.topNumber == 1)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 2;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 3;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 5;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 4;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 2)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 4;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 6;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 3;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 1;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 3)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 2;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 6;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 5;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 1;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 4)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 5;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 6;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 2;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 1;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 5)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 3;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 6;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 4;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 1;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 6)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 2;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 4;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 5;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 3;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
		}
		else if (_direction == "up") {
			if (that.topNumber == 1)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 3;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 5;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 4;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 2;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 2)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 6;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 3;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 1;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 4;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 3)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 6;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 5;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 1;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 2;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 4)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 6;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 2;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 1;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 5;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 5)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 6;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 4;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 1;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 3;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 6)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 4;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 5;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 3;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 2;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
		}
		else if (_direction == "down") {
			if (that.topNumber == 1)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 4;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 2;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 3;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 5;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 2)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 1;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 4;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 6;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 3;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 3)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 1;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 2;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 6;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 5;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 4)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 1;
					that.rotationState = 2;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 5;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 6;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 2;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 5)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 1;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image1;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 3;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 6;
					that.rotationState = 1;
					that.current_cube_image = that.cube_image6;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 4;
					that.rotationState = 3;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
			else if (that.topNumber == 6)
			{
				if (that.rotationState == 0)
				{
					that.topNumber = 3;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image3;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 1)
				{
					that.topNumber = 2;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image2;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 2)
				{
					that.topNumber = 4;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image4;
					that.cube_animation_row = 6*that.rotationState;
				}
				else if (that.rotationState == 3)
				{
					that.topNumber = 5;
					that.rotationState = 0;
					that.current_cube_image = that.cube_image5;
					that.cube_animation_row = 6*that.rotationState;
				}
			}
		}
	}

	that.roll = function (_direction) {
			if (_direction == "right") {
				that.cube_frameIndex = 0;
				that.cube_animation_row = 6*that.rotationState+4-1;
			}
			else if (_direction == "left") {
				that.cube_frameIndex = 0;
				that.cube_animation_row = 6*that.rotationState+3-1;
			}
			else if (_direction == "up") {
				that.cube_frameIndex = 0;
				that.cube_animation_row = 6*that.rotationState+1-1;
			}
			else if (_direction == "down") {
				that.cube_frameIndex = 0;
				that.cube_animation_row = 6*that.rotationState+2-1;
			}
			that.cube_direction = _direction;
	}

	that.update = function (elapsed) {

			if (that.cube_direction != "none")
			{
					that.cube_tickCount += 1;

					if (that.cube_tickCount > that.cube_ticksPerFrame) {

							that.cube_tickCount = 0;
							
							if (that.cube_direction == "right")
							{
									// If the current frame index is in range
									if (that.cube_frameIndex < that.cube_numberOfFrames - 1) {
											// Go to the next frame
											that.cube_frameIndex += 1;
											that.cube_x +=10*that.cube_scale;
									} else {
											that.cube_frameIndex = 0;
											that.changeCubeFace("right");
											that.cube_direction = "none";
											that.tablePosition.x++;
											moveFinished();
									}
							}
							else if (that.cube_direction == "left")
							{
									// If the current frame index is in range
									if (that.cube_frameIndex < that.cube_numberOfFrames - 1) {
											// Go to the next frame
											that.cube_frameIndex += 1;
											that.cube_x -=10*that.cube_scale;
									} else {
											that.cube_frameIndex = 0;
											that.changeCubeFace("left");
											that.cube_direction = "none";
											that.tablePosition.x--;
											moveFinished();
									}
							}
							else if (that.cube_direction == "up")
							{
									// If the current frame index is in range
									if (that.cube_frameIndex < that.cube_numberOfFrames - 1) {
											// Go to the next frame
											that.cube_frameIndex += 1;
											that.cube_y -=10*that.cube_scale;
									} else {
											that.cube_frameIndex = 0;
											that.changeCubeFace("up");
											that.cube_direction = "none";
											that.tablePosition.y--;
											moveFinished();
									}
							}
							else if (that.cube_direction == "down")
							{
									// If the current frame index is in range
									if (that.cube_frameIndex < that.cube_numberOfFrames - 1) {
											// Go to the next frame
											that.cube_frameIndex += 1;
											that.cube_y +=10*that.cube_scale;
									} else {
											that.cube_frameIndex = 0;
											that.changeCubeFace("down");
											that.cube_direction = "none";
											that.tablePosition.y++;
											moveFinished();
									}
							}
					}
			}
	};
	
	that.clear = function () {
		// Clear the canvas
		that.cube_context.clearRect(that.cube_x+20*that.cube_scale, that.cube_y+20*that.cube_scale, that.cube_tableFieldSize, that.cube_tableFieldSize);
	}

	that.render = function () {
	
		// Draw the animation
		that.cube_context.drawImage(
			that.current_cube_image,
			that.cube_frameIndex * that.cube_sprite_width / that.cube_numberOfFrames,
			that.cube_animation_row*that.cube_sprite_frame_height,
			that.cube_sprite_frame_width,
			that.cube_sprite_frame_height,
			that.cube_x+20*that.cube_scale,
			that.cube_y+20*that.cube_scale,
			that.cube_tableFieldSize,
			that.cube_tableFieldSize);
	};
	
	return that;
}


