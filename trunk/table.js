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
  that.t_map = options.map;
  that.t_image_background = options.background;
	that.t_scale = options.squareWidth/options.spriteWidth;

  if(options.perks)
  {
    that.t_perks = options.perks;
    perkImage = new Image();
    perkImage.src = "perk3.png";
    that.t_perks[0].image = perkImage;
  }
  
  that.seed = function () {
  	for (i=0; i<that.t_width*that.t_height; i++)
    {
      that.t_numbers[i] = Math.floor((Math.random() * 6) + 1);
    }
  }

  
  that.render = function () {
  
    
    //Draw background tiles
    if (that.t_image_background)
    {
      for(j=0; j<that.t_height; j++)
      {
        for(i=0; i<that.t_width; i++)
        {
          if(that.t_map)
          {
            if(that.t_map[j*that.t_width+i] == 1)
            {
              //Draw the field background
              that.t_context.drawImage(
                that.t_image_background,
                0,
                0,
                140,
                140,
                i*that.t_squareWidth,
                j*that.t_squareHeight,
                140*that.t_scale,
                140*that.t_scale);
            }
          }
          else
          {
            //Draw the field background
            that.t_context.drawImage(
              that.t_image_background,
              0,
              0,
              140,
              140,
              i*that.t_squareWidth,
              j*that.t_squareHeight,
              140*that.t_scale,
              140*that.t_scale);
          }
        }
      }
    }

    for(j=0; j<that.t_height; j++)
    {
      for(i=0; i<that.t_width; i++)
      {
        

        if(that.t_map)
        {
          if(that.t_map[j*that.t_width+i] == 1)
          {
            that.t_context.clearRect(i*that.t_squareWidth+20*that.t_scale, j*that.t_squareHeight+20*that.t_scale, that.t_squareWidth, that.t_squareHeight);
            //Draw the field
            if (that.t_image)
            {
              that.t_context.drawImage(
                that.t_image,
                0,
                0,
                that.t_spriteWidth,
                that.t_spriteHeight,
                i*that.t_squareWidth+20*that.t_scale,
                j*that.t_squareHeight+20*that.t_scale,
                that.t_squareWidth,
                that.t_squareWidth);
            }
            else
            {
              context.beginPath();
              that.t_context.lineWidth = "2";
              that.t_context.strokeStyle = "black";
              that.t_context.rect(i*that.t_squareWidth+20*that.t_scale, j*that.t_squareHeight+20*that.t_scale, that.t_squareWidth, that.t_squareHeight);
              context.stroke();
            }

            //draw rect
            //context.beginPath();
            that.t_context.lineWidth = "2";
            that.t_context.strokeStyle = t_numberColor[that.t_numbers[(j*that.t_width) + i]-1];
            that.t_context.rect(i*that.t_squareWidth + 25, j*that.t_squareHeight + 25, that.t_squareWidth-10, that.t_squareHeight-10);
            //context.stroke();

            //draw number
            //context.beginPath();
            that.t_context.strokeStyle = "gray"
            that.t_context.font=""+ 60*that.t_scale + "px Arial";
            that.t_context.strokeText(""+that.t_numbers[(j*that.t_width) + i], i*that.t_squareWidth + 52*that.t_scale, j*that.t_squareHeight + 87*that.t_scale);
          }
        }
        else
        {

          that.t_context.clearRect(i*that.t_squareWidth+20*that.t_scale, j*that.t_squareHeight+20*that.t_scale, that.t_squareWidth, that.t_squareHeight);
          //Draw the field
          if (that.t_image)
          {
            that.t_context.drawImage(
              that.t_image,
              0,
              0,
              that.t_spriteWidth,
              that.t_spriteHeight,
              i*that.t_squareWidth+20*that.t_scale,
              j*that.t_squareHeight+20*that.t_scale,
              that.t_squareWidth,
              that.t_squareWidth);
          }
          else
          {
            context.beginPath();
            that.t_context.lineWidth = "2";
            that.t_context.strokeStyle = "black";
            that.t_context.rect(i*that.t_squareWidth+20*that.t_scale, j*that.t_squareHeight+20*that.t_scale, that.t_squareWidth, that.t_squareHeight);
            context.stroke();
          }

          //draw rect
          //context.beginPath();
          that.t_context.lineWidth = "2";
          that.t_context.strokeStyle = t_numberColor[that.t_numbers[(j*that.t_width) + i]-1];
          that.t_context.rect(i*that.t_squareWidth + 25, j*that.t_squareHeight + 25, that.t_squareWidth-10, that.t_squareHeight-10);
          //context.stroke();

          //draw number
          //context.beginPath();
          that.t_context.strokeStyle = "gray"
          that.t_context.font=""+ 60*that.t_scale + "px Arial";
          that.t_context.strokeText(""+that.t_numbers[(j*that.t_width) + i], i*that.t_squareWidth + 52*that.t_scale, j*that.t_squareHeight + 87*that.t_scale);
        }
      }
    }

    if(that.t_perks)
    {
      for (i=0; i < that.t_perks.length; i++)
      {
        //draw perk image
        that.t_context.drawImage(
          that.t_perks[i].image,
          0,
          0,
          that.t_spriteWidth,
          that.t_spriteHeight,
          that.t_perks[i].x*that.t_squareWidth+20*that.t_scale,
          that.t_perks[i].y*that.t_squareHeight+20*that.t_scale,
          that.t_squareWidth,
          that.t_squareWidth);
      }
    }
    that.t_context.beginPath();
    that.t_context.lineWidth = "4";
    that.t_context.strokeStyle = t_numberColor[5-1];
    that.t_context.rect(that.t_destination.x*that.t_squareWidth + 35*that.t_scale, that.t_destination.y*that.t_squareHeight + 34*that.t_scale, that.t_squareWidth-30*that.t_scale, that.t_squareHeight-33*that.t_scale);
    that.t_context.stroke();

  };


  if (options.numbers.length == that.t_width*that.t_height)
    that.t_numbers = options.numbers;
  else
    that.seed();

  return that;
}


