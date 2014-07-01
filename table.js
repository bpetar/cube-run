//js file that takes care of cube position and animations

//roll the cube
//rotate the cube
//get cube top number
//get cube position on the table
//get cube rotation state (up, down, left, right)


t_numberColor = ["red","brown","green","orange","blue","purple"]

function table (options) {

	t_squareWidth = 100;
  t_squareHeight = 100;
  t_context = options.context;
  t_width = options.width;
  t_height = options.height;
  t_image = options.image;
  t_numbers = [];


  seed = function () {
  	for (i=0; i<t_width*t_height; i++)
    {
      t_numbers[i] = Math.floor((Math.random() * 6) + 1);
    }
  }

  
  render = function () {
  
    // Clear the canvas
    //context.clearRect(0, 0, width, height);
    
    for(j=0; j<t_height; j++)
    {
      for(i=0; i<t_width; i++)
      {
        //Draw the field
        context.drawImage(
          t_image,
          0,
          0,
          100,
          100,
          i*t_squareWidth,
          j*t_squareHeight,
          100,
          100);

        //draw rect
        //context.beginPath();
        context.lineWidth = "2";
        context.strokeStyle = t_numberColor[t_numbers[(j*t_width) + i]-1];
        context.rect(i*t_squareWidth + 5, j*t_squareHeight + 5, 90, 90);
        //context.stroke();

        //draw number
        //context.beginPath();
        context.strokeStyle = "gray"
        context.font="60px Arial";
        context.strokeText(""+t_numbers[(j*t_width) + i], i*t_squareWidth + 32, j*t_squareHeight + 67);
      }
    }
  };

  seed();

  return this;
}


