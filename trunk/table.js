//js file that takes care of cube position and animations

//roll the cube
//rotate the cube
//get cube top number
//get cube position on the table
//get cube rotation state (up, down, left, right)


t_numberColor = ["red","brown","green","orange","blue","purple"]

function table (options) {

  var that = {}
	that.t_squareWidth = options.squareWidth;
  that.t_squareHeight = options.squareHeight;
  that.t_spriteWidth = options.spriteWidth;
  that.t_spriteHeight = options.spriteHeight;
  that.t_context = options.context;
  that.t_width = options.width;
  that.t_height = options.height;
  that.t_image = options.image;
  that.t_numbers = [];
  that.t_destination = options.destination;

  that.seed = function () {
  	for (i=0; i<that.t_width*that.t_height; i++)
    {
      that.t_numbers[i] = Math.floor((Math.random() * 6) + 1);
    }
  }

  
  that.render = function () {
  
    // Clear the canvas
    //context.clearRect(0, 0, width, height);
    
    for(j=0; j<that.t_height; j++)
    {
      for(i=0; i<that.t_width; i++)
      {
        //Draw the field
        that.t_context.drawImage(
          that.t_image,
          0,
          0,
          that.t_spriteWidth,
          that.t_spriteHeight,
          i*that.t_squareWidth,
          j*that.t_squareHeight,
          that.t_squareWidth,
          that.t_squareWidth);

        //draw rect
        //context.beginPath();
        that.t_context.lineWidth = "2";
        that.t_context.strokeStyle = t_numberColor[that.t_numbers[(j*that.t_width) + i]-1];
        that.t_context.rect(i*that.t_squareWidth + 5, j*that.t_squareHeight + 5, that.t_squareWidth-10, that.t_squareHeight-10);
        //context.stroke();

        //draw number
        //context.beginPath();
        that.t_context.strokeStyle = "gray"
        that.t_context.font="60px Arial";
        that.t_context.strokeText(""+that.t_numbers[(j*that.t_width) + i], i*that.t_squareWidth + 32, j*that.t_squareHeight + 67);
      }
    }

    that.t_context.beginPath();
    that.t_context.lineWidth = "4";
    that.t_context.strokeStyle = t_numberColor[5-1];
    that.t_context.rect(that.t_destination.x*that.t_squareWidth + 15, that.t_destination.y*that.t_squareHeight + 14, that.t_squareWidth-30, that.t_squareHeight-33);
    that.t_context.stroke();

  };


  if (options.numbers.length == that.t_width*that.t_height)
    that.t_numbers = options.numbers;
  else
    that.seed();

  return that;
}


