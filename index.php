<html>
    <head>
        <title>Cube Run Demo</title>
    </head>
    <body>
        <canvas id="id-canvas-cubeRun"></canvas>
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

            var table;
            var tableField;

            var cube1;
            var cube2;

            function gameLoop () {
            
              window.requestAnimationFrame(gameLoop);

              table.render();

              coin1.update();
              coin2.update();
              coin1.render();
              coin2.render();
            }
            
            function handleKeyDown () {
                if ((coin1.coin_direction == "none")&&(coin2.coin_direction == "none"))
                {
                    if ((event.keyCode == 37) || (event.keyCode == 81)) {
                        // Turn Left Q
                        if (firstPlayer)
                            coin1.roll("left");
                        else
                            coin2.roll("left");
                    } else if ((event.keyCode == 39) || (event.keyCode == 69)) {
                        // Turne Right E
                        if (firstPlayer)
                            coin1.roll("right");
                        else
                            coin2.roll("right");
                    } else if ((event.keyCode == 38) || (event.keyCode == 87)) {
                        // Up cursor key or W
                        if (firstPlayer)
                            coin1.roll("up");
                        else
                            coin2.roll("up");
                    } else if ((event.keyCode == 40) || (event.keyCode == 83)) {
                        // Down cursor key or S
                        if (firstPlayer)
                            coin1.roll("down");
                        else
                            coin2.roll("down");
                    }
                }
            }

            
            // Get canvas
            canvas = document.getElementById("id-canvas-cubeRun");
            canvas.width = 900;
            canvas.height = 900;
            
            // Create sprite sheet
            coinImage = new Image();    
            // Load sprite sheet
            coinImage.addEventListener("load", gameLoop);
            coinImage.src = "cube-1-animation.png";

            // Create sprite sheet
            coinImage2 = new Image();    
            // Load sprite sheet
            //coinImage2.addEventListener("load", gameLoop);
            coinImage2.src = "cube-2-animation.png";

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
                width: 1100,
                height: 1100,
                image: coinImage,
                numberOfFrames: 11,
                ticksPerFrame: 1,
                topNumber: 1,
                posX: 2,
                posY: 2
            });

            coin2 = coin({
                context: canvas.getContext("2d"),
                width: 1100,
                height: 1100,
                image: coinImage2,
                numberOfFrames: 11,
                ticksPerFrame: 1,
                topNumber: 1,
                posX: 6,
                posY: 6
            });
            

            table = table({context: canvas.getContext("2d"), width: 6, height: 6, image: tableField});

            document.onkeydown = handleKeyDown;


        </script>

    </body>
</html>
		
