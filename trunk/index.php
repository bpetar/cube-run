<html>
    <head>
        <title>Cube Run Demo</title>
    </head>
    <body>
        <div id="id-div-headline" style="border: green solid 1px; text-align: center; margin: 10px auto 20px auto; width:260px; height:80px;">
            <p> CUBE RUN</p>
            <p id="id-p-level"> Level 1</p>
        </div>
        <div id="id-div-table" style="margin:auto auto auto auto; width:50%; height:50%;">
            <canvas id="id-canvas-cubeRun"></canvas>
        </div>

        <div id="id-div-headline" style="text-align: center; margin: 10px auto 10px auto; width:480px; height:80px;">
            <span> 1. Roll your cube to reach destination. </span> <br>
            <span> 2. Number on the top of the cube must match number on the destination field.</span>
        </div>

        <script src="./cube.js"></script>
        <script src="./coin.js"></script>
        <script src="./table.js"></script>

        <script>

            var coin1;
            var coin2;

            var coinImage;
            var coinImage2;

            var canvas;
            var firstPlayer = true;

            var table1;
            var tableField;

            var cube1;
            var cube2;

            function gameLoop () {
            
              window.requestAnimationFrame(gameLoop);

              table1.render();

              coin1.update();
              //coin2.update();
              coin1.render();
              //coin2.render();
            }
            
            function moveFinished() {
                if ((coin1.tablePosition.x-1 == level[currentLevel].destination.x) && ((coin1.tablePosition.y-1 == level[currentLevel].destination.y)) )
                {
                    //finish level
                    advanceLevel();
                }
            }

            function handleKeyDown () {
                if ((coin1.coin_direction == "none")&&(coin2.coin_direction == "none"))
                {
                    if ((event.keyCode == 37) || (event.keyCode == 81)) {
                        // Turn Left Q
                        if (firstPlayer)
                        {
                            if (coin1.tablePosition.x>1)
                                coin1.roll("left");
                        }
                        else
                            coin2.roll("left");
                    } else if ((event.keyCode == 39) || (event.keyCode == 69)) {
                        // Turne Right E
                        if (firstPlayer)
                        {
                            if (coin1.tablePosition.x<table1.t_width)
                                coin1.roll("right");
                        }
                        else
                            coin2.roll("right");
                    } else if ((event.keyCode == 38) || (event.keyCode == 87)) {
                        // Up cursor key or W
                        if (firstPlayer)
                        {
                            if (coin1.tablePosition.y>1)
                                coin1.roll("up");
                        }
                        else
                            coin2.roll("up");
                    } else if ((event.keyCode == 40) || (event.keyCode == 83)) {
                        // Down cursor key or S
                        if (firstPlayer)
                        {
                            if (coin1.tablePosition.y<table1.t_height)
                                coin1.roll("down");
                        }
                        else
                            coin2.roll("down");
                    }
                    else
                    {
                        firstPlayer = !firstPlayer;
                    }
                }
            }

            function advanceLevel()
            {
                currentLevel++;
                alert(level[currentLevel].message)
                document.getElementById("id-p-level").innerHTML = "Level " + (currentLevel + 1);
                showLevel();
            }

            var currentLevel = 0;

            // Level params            
            var level = [{
                tableFieldSize:100,
                tableWidth:5,
                tableHeight:1,
                destination:{x:4,y:0},
                numbers: [1,2,3,4,5],
                message: ""
            },
            {
                tableFieldSize:100,
                tableWidth:4,
                tableHeight:2,
                destination:{x:3,y:0},
                numbers: [1,6,4,5,2,3,5,1],
                message: "Congratulations! \n\nBut that was easy start. You might find next level more challenging.."
            },
            {
                tableFieldSize:100,
                tableWidth:6,
                tableHeight:6,
                destination:{x:3,y:3},
                numbers: [],
                message: "Well Done! \n\nLets see how you handle wider areas.."
            }];

            function showLevel ()
            {
                // Get canvas
                canvas = document.getElementById("id-canvas-cubeRun");
                canvas.width = level[currentLevel].tableWidth*level[currentLevel].tableFieldSize;
                canvas.height = level[currentLevel].tableHeight*level[currentLevel].tableFieldSize;

                // Get table
                tableDiv = document.getElementById("id-div-table");
                tableDiv.style.width = "" + level[currentLevel].tableWidth*level[currentLevel].tableFieldSize + "px";
                tableDiv.style.height = "" + level[currentLevel].tableHeight*level[currentLevel].tableFieldSize + "px";
                
                // Create sprite sheet
                coinImage = new Image();
                coinImage.src = "coin-1-animation.png";

                // Create sprite sheet
                coinImage2 = new Image();
                coinImage2.src = "coin-2-animation.png";

                tableField = new Image();
                tableField.src = "table-field.png";
                
                // Create cube sprite
                cube1 = cube({
                    context: canvas.getContext("2d"),
                    width: 1100,
                    height: 1100,
                    image: coinImage,
                    numberOfFrames: 11,
                    ticksPerFrame: 1,
                    topNumber: 1,
                    posX: 2,
                    posY: 2
                });

                cube2 = cube({
                    context: canvas.getContext("2d"),
                    width: 1100,
                    height: 1100,
                    image: coinImage2,
                    numberOfFrames: 11,
                    ticksPerFrame: 1,
                    topNumber: 1,
                    posX: 1,
                    posY: 1
                });

                // Create coin sprite
                coin1 = coin({
                    context: canvas.getContext("2d"),
                    spriteWidth: 1100,
                    spriteHeight: 200,
                    spriteFrameWidth: 100,
                    spriteFrameHeight: 100,
                    tableFieldSize : level[currentLevel].tableFieldSize,
                    image: coinImage,
                    numberOfFrames: 11,
                    ticksPerFrame: 1,
                    topNumber: 1,
                    posX: 1,
                    posY: 1
                });

                coin2 = coin({
                    context: canvas.getContext("2d"),
                    spriteWidth: 1100,
                    spriteHeight: 200,
                    spriteFrameWidth: 100,
                    spriteFrameHeight: 100,
                    tableFieldSize : level[currentLevel].tableFieldSize,
                    image: coinImage2,
                    numberOfFrames: 11,
                    ticksPerFrame: 1,
                    topNumber: 1,
                    posX: 6,
                    posY: 6
                });
                
                table1 = table({
                    context: canvas.getContext("2d"), 
                    squareWidth:level[currentLevel].tableFieldSize, 
                    squareHeight:level[currentLevel].tableFieldSize, 
                    spriteWidth: 100, 
                    spriteHeight:100, 
                    width: level[currentLevel].tableWidth, 
                    height: level[currentLevel].tableHeight, 
                    image: tableField, 
                    numbers: level[currentLevel].numbers, 
                    destination: level[currentLevel].destination});
            }

            document.onkeydown = handleKeyDown;
            window.onload = gameLoop;
            showLevel();

        </script>

    </body>
</html>
		
