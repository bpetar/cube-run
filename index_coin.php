<html>
    <head>
        <title>Cube Run Demo</title>
    </head>
    <body>
        <div id="id-div-menu" style="text-align: center; margin: auto auto auto auto; width:260px;">
            <span style="cursor:pointer; color:blue; margin: auto 5px auto 5px" onclick="firstLevel()">begin</span> <span style="cursor:pointer; color:blue; margin: auto 5px auto 5px" onclick="refresh()">restart</span> <span style="cursor:pointer; color:blue; margin: auto 5px auto 5px" onclick="showLevelsInfo()">levels</span> <span style="cursor:pointer; color:blue; margin: auto 5px auto 5px" onclick="showAbout()">about</span>
        </div>
        <div id="id-div-headline" style="border: green solid 1px; text-align: center; margin: auto auto 20px auto; width:260px; height:80px;">
            <p> CUBE RUN</p>
            <p id="id-p-level"> <span style="cursor:pointer; color:blue;" onclick="previousLevel()"> < </span> <span style="margin: auto 50px auto 50px" id="id-span-level"> Level 1 </span> <span style="cursor:pointer; color:blue;" onclick="nextLevel()"> > </span> </p>
        </div>
        <div id="id-div-table" style="margin:auto auto auto auto; width:50%; height:50%;">
            <canvas id="id-canvas-cubeRun"></canvas>
        </div>

        <div id="id-div-instructions" style="text-align: center; margin: 10px auto 10px auto; width:480px; height:80px;">
            <span> 1. Roll your cube to reach destination. </span> <br>
            <span> 2. Number on the top of the cube must match number on the destination field.</span>
        </div>

        <div id="id-div-perks" style="display:none; text-align: center; margin: 10px auto 10px auto; width:630px; height:80px;">
            <span> 1. Every number has its perk. </span> <br>
            <span> 2. Collect number artefacts to activate perks.</span>

            <div id="perk-table" style="margin: 10px auto 10px auto; width:624px; height:100px;">
                <div id="perk-1" style="margin: auto 1px auto 1px; float:left; width:100px; height:100px; border:solid red 1px; background: url(1.png);">
                </div>
                <div id="perk-2" style="margin: auto 1px auto 1px; float:left; width:100px; height:100px; border:solid orange 1px; background: url(2.png);">
                </div>
                <div id="perk-3" style="margin: auto 1px auto 1px; float:left; width:100px; height:100px; border:solid green 1px; background: url(3.png);">
                </div>
                <div id="perk-4" style="margin: auto 1px auto 1px; float:left; width:100px; height:100px; border:solid brown 1px; background: url(4.png);">
                </div>
                <div id="perk-5" style="margin: auto 1px auto 1px; float:left; width:100px; height:100px; border:solid blue 1px; background: url(5.png);">
                </div>
                <div id="perk-6" style="margin: auto 1px auto 1px; float:left; width:100px; height:100px; border:solid purple 1px; background: url(6.png);">
                </div>
            </div>
        </div>

        <div id="id-div-about" style="display:none; text-align: center; margin: 10px auto 10px auto; width:480px; height:80px;">
            <span> Cube Run is game designed and created by Ajandi Endre and Petar Bajic.</span> <br>
            <span> For best experience, we suggest you draw table on the paper and play against your friends.</span>
        </div>

         <div id="id-div-levels" style="display:none; text-align: center; margin: 10px auto 10px auto; width:480px; height:80px;">
            <span style="cursor:pointer; color:blue; text-decoration:underline" onclick="showLevelIndex(1)"> Level 01: Learn to roll.</span> <br>
            <span style="cursor:pointer; color:blue; text-decoration:underline"  onclick="showLevelIndex(2)"> Level 02: The catch.</span> <br>
            <span style="cursor:pointer; color:blue; text-decoration:underline"  onclick="showLevelIndex(3)"> Level 03: Play the game.</span> <br>
            <span style="cursor:pointer; color:blue; text-decoration:underline"  onclick="showLevelIndex(4)"> Level 04: About the Perks.</span> <br>
            <span style="cursor:pointer; color:blue; text-decoration:underline"  onclick="showLevelIndex(5)"> Level 05: ToDo.</span> <br>
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
            var tableBackground;

            var cube1;
            var cube2;

            var activePerkNumber = 0;

            var inAndAbout = false;

            var gameTime = new Date();
            var lastGameTime = gameTime.getTime();

            var userData = {perks:[0]};

            function gameLoop () {
            
              window.requestAnimationFrame(gameLoop);

              gameTime = new Date();
              var currentGameTime = gameTime.getTime();
              var elapsed = currentGameTime - lastGameTime;
              lastGameTime = currentGameTime;

              table1.render(elapsed);

              coin1.update(elapsed);
              //coin2.update();
              coin1.render();
              //coin2.render();
            }
            
            function moveFinished() {
                x = coin1.tablePosition.x-1;
                y = coin1.tablePosition.y-1;
                tableFieldNumber = table1.t_numbers[(y)*table1.t_width + (x)];
                diceTopNumber = 3;
                //if finish
                if ((coin1.tablePosition.x-1 == level[currentLevel].destination.x) && ((coin1.tablePosition.y-1 == level[currentLevel].destination.y)) )
                {
                    //finish level
                    advanceLevel();
                }
                //if perk found
                if (level[currentLevel].perks)
                {
                    for (i=0; i < level[currentLevel].perks.length; i++)
                    {
                        if ((coin1.tablePosition.x-1 == level[currentLevel].perks[i].x) && ((coin1.tablePosition.y-1 == level[currentLevel].perks[i].y)) )
                        {
                            //stepped on perk
                            perki = level[currentLevel].perks[i].id;
                            alert("Perk " + perki + " acquired!");
                            //add perk to the inventory div
                            perkdiv = document.getElementById("perk-"+perki);
                            perkdiv.style.backgroundImage = "url(perk"+perki+".png)";
                            //remove perk from the table
                            table1.t_perks.splice(i,1);
                            //remove perk from the level
                            level[currentLevel].perks.splice(i,1);
                            //add perk to user data
                            userData.perks.push(perki);
                            break;
                        }
                    }
                }
                //if perk stepped
                if(diceTopNumber == tableFieldNumber)
                {
                    if (userHasPerk(diceTopNumber))
                    {
                        //activate perk
                        activatePerk(diceTopNumber);
                    }
                }
            }

            function teleport(x,y)
            {
                //move coin to x,y
                coin1.tablePosition.x = x+1;
                coin1.tablePosition.y = y+1;
                coin1.coin_x = x*level[currentLevel].tableFieldSize;
                coin1.coin_y = y*level[currentLevel].tableFieldSize;
            }

            function activatePerk(perk)
            {
                activePerkNumber = perk;
                if(perk == 3)
                {
                    alert("Perk 3 activated! Click field to teleport...")
                    //drop shadow on the screen
                    //lightup three fields
                    //add cancel button
                }
            }

            function userHasPerk(perk)
            {
                for (var i=0; i<userData.perks.length; i++)
                {
                    if (userData.perks[i] == perk)
                        return true
                }
                return false;
            }

            function handleKeyDown () {

                if ((coin1.coin_direction == "none")&&(coin2.coin_direction == "none")&&(activePerkNumber == 0))
                {
                    if ((event.keyCode == 37) || (event.keyCode == 81)) {
                        // Turn Left Q
                        if (firstPlayer)
                        {
                            if (coin1.tablePosition.x>1)
                            {
                                if(table1.t_map)
                                {
                                    newFieldIndex = (coin1.tablePosition.y-1)*table1.t_width+(coin1.tablePosition.x-1)-1
                                    if (table1.t_map[newFieldIndex] == 1)
                                    {
                                        coin1.roll("left");
                                    }
                                }
                                else
                                {
                                    coin1.roll("left");
                                }
                            }
                        }
                        else
                        {
                            coin2.roll("left");
                        }
                    } else if ((event.keyCode == 39) || (event.keyCode == 69)) {
                        // Turne Right E
                        if (firstPlayer)
                        {
                            if (coin1.tablePosition.x<table1.t_width)
                            {
                                if(table1.t_map)
                                {
                                    newFieldIndex = (coin1.tablePosition.y-1)*table1.t_width+(coin1.tablePosition.x-1)+1
                                    if (table1.t_map[newFieldIndex] == 1)
                                    {
                                        coin1.roll("right");
                                    }
                                }
                                else
                                {
                                    coin1.roll("right");
                                }
                            }
                        }
                        else
                        {
                            coin2.roll("right");
                        }
                    } else if ((event.keyCode == 38) || (event.keyCode == 87)) {
                        // Up cursor key or W
                        if (firstPlayer)
                        {
                            if (coin1.tablePosition.y>1)
                            {
                                if(table1.t_map)
                                {
                                    newFieldIndex = (coin1.tablePosition.y-2)*table1.t_width+(coin1.tablePosition.x-1)
                                    if (table1.t_map[newFieldIndex] == 1)
                                    {
                                        coin1.roll("up");
                                    }
                                }
                                else
                                {
                                    coin1.roll("up");
                                }
                            }
                        }
                        else
                        {
                            coin2.roll("up");
                        }
                    } else if ((event.keyCode == 40) || (event.keyCode == 83)) {
                        // Down cursor key or S
                        if (firstPlayer)
                        {
                            if (coin1.tablePosition.y<table1.t_height)
                            {
                                if(table1.t_map)
                                {
                                    newFieldIndex = (coin1.tablePosition.y)*table1.t_width+(coin1.tablePosition.x-1)
                                    if (table1.t_map[newFieldIndex] == 1)
                                    {
                                        coin1.roll("down");
                                    }
                                }
                                else
                                {
                                    coin1.roll("down");
                                }
                            }
                        }
                        else
                        {
                            coin2.roll("down");
                        }
                    }
                    else
                    {
                        firstPlayer = !firstPlayer;
                    }
                }
            }

            function onMouseMove(even) 
            {
                var x_pos = event.clientX;
                var y_pos = event.clientY;
                var rect = canvas.getBoundingClientRect();
                //check that mouse position is within table position
                levelScale = level[currentLevel].tableFieldSize/100;
                if ((x_pos>rect.left+20*levelScale) && (x_pos<rect.left+rect.width-20*levelScale) && (y_pos>rect.top+20*levelScale) && (y_pos<rect.top+rect.height-20*levelScale))
                {
                    var tableX = x_pos-(rect.left+20*levelScale);
                    var tableY = y_pos-(rect.top+20*levelScale);
                    var i = Math.floor(tableX/level[currentLevel].tableFieldSize);
                    var j = Math.floor(tableY/level[currentLevel].tableFieldSize);
                    var numberMouseIsHovering = table1.t_numbers[(j)*table1.t_width + (i)];
                    if(activePerkNumber == 3)
                    {
                        if(numberMouseIsHovering == 3)
                        {
                            tableDiv.style.cursor = 'pointer';
                        }
                        else
                        {
                            tableDiv.style.cursor = 'auto';
                        }
                    }
                }

            }

            function onMouseClick(event) 
            {


                var isRightMB;
                var e = event || window.event;
                if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                    isRightMB = e.which == 3; 
                else if ("button" in e)  // IE, Opera 
                    isRightMB = e.button == 2; 
                
                var x_pos = event.clientX;
                var y_pos = event.clientY;

                var rect = canvas.getBoundingClientRect();
                
                //check that mouse position is within table position

                levelScale = level[currentLevel].tableFieldSize/100;
                if ((x_pos>rect.left+20*levelScale) && (x_pos<rect.left+rect.width-20*levelScale) && (y_pos>rect.top+20*levelScale) && (y_pos<rect.top+rect.height-20*levelScale))
                {
                    var tableX = x_pos-(rect.left+20*levelScale);
                    var tableY = y_pos-(rect.top+20*levelScale);
                    //console.log("in canvas onMouseClick " + tableX + " " + tableY);
                    var i = Math.floor(tableX/level[currentLevel].tableFieldSize);
                    var j = Math.floor(tableY/level[currentLevel].tableFieldSize);
                    var numberClickedOn = table1.t_numbers[(j)*table1.t_width + (i)];
                    console.log("clicked on " + i + " " + j);
                    console.log("clicked on number: " + numberClickedOn);
                    if (activePerkNumber == 3)
                    {
                        if (numberClickedOn == 3)
                        {
                            activePerkNumber = 0;
                            //remove shadow
                            tableDiv.style.cursor = 'auto';
                            teleport(i,j);
                        }
                    }
                }

            }

            function advanceLevel()
            {
                currentLevel++;
				if (currentLevel >= level.length)
				{
					currentLevel--;
					alert("That was last level, come back later for more.");
					return;
				}
                alert(level[currentLevel].message)
                document.getElementById("id-span-level").innerHTML = "Level " + (currentLevel + 1);
                showLevel();
            }

            function previousLevel()
            {
                
                currentLevel--;
                if (currentLevel >= 0)
                {
                    document.getElementById("id-span-level").innerHTML = "Level " + (currentLevel + 1);
                    showLevel();
                }
                else if (inAndAbout)
                {
                    currentLevel++;
                    document.getElementById("id-span-level").innerHTML = "Level " + (currentLevel + 1);
                    showLevel();
                }
                else
                {
                    currentLevel++;
                    alert("This is first level, cant go back")
                }
                
            }

            function nextLevel()
            {
                currentLevel++;
                if (currentLevel >= level.length)
                {
                    currentLevel--;
                    alert("That was last level, come back later for more.");
                    return;
                }
                //alert(level[currentLevel].message)
                document.getElementById("id-span-level").innerHTML = "Level " + (currentLevel + 1);
                showLevel();
            }

            function firstLevel()
            {
                currentLevel = 0;
                document.getElementById("id-span-level").innerHTML = "Level " + (currentLevel + 1);
                showLevel();
            }

            function refresh()
            {
                activePerkNumber = 0;
                showLevel();
            }

            var currentLevel = 0;

            // Level params            
            var level = [{
                tableFieldSize:150,
                tableWidth:5,
                tableHeight:1,
                destination:{x:4,y:0},
                start:{x:0,y:0},
                numbers: [1,2,3,4,5],
                //tableFieldImage: "table-field.png",
                //tableBackgroundImage: "tileBackground.png",
                message: ""
            },
            {
                tableFieldSize:100,
                tableWidth:4,
                tableHeight:2,
                destination:{x:3,y:0},
                start:{x:0,y:0},
                numbers: [1,6,4,5,2,3,5,1],
                //tableFieldImage: "table-field3.png",
                //tableBackgroundImage: "tileBackground.png",
                message: "Congratulations! \n\nBut that was easy start. You might find next level more challenging.."
            },
            {
                tableFieldSize:80,
                tableWidth:6,
                tableHeight:6,
                destination:{x:2,y:2},
                start:{x:5,y:5},
                numbers: [],
                tableFieldImage: "table-field2.png",
                tableBackgroundImage: "tileBackground2.png",
                message: "Well Done! \n\nLets see how you handle wider areas.."
            },
            {
                tableFieldSize:60,
                tableWidth:5,
                tableHeight:7,
                destination:{x:2,y:0},
                start:{x:2,y:6},
                perks:[{id:3,x:3,y:5}],
                numbers: [],
                tableFieldImage: "table-field.png",
                tableBackgroundImage: "tileBackground.png",
                map:[0,0,1,0,0, 1,1,1,1,1, 1,1,1,1,1, 1,0,1,0,1, 1,1,1,1,1, 1,1,1,1,1, 0,0,1,0,0],
                message: "Superb! \n\nNow you must learn about The Perks.."
            }];

            function showAbout ()
            {
                inAndAbout = true;
                document.getElementById("id-span-level").innerHTML = "Level About"

                tableDiv = document.getElementById("id-div-table");
                tableDiv.style.width = "0px";
                tableDiv.style.height = "0px";

                canvas = document.getElementById("id-canvas-cubeRun");
                canvas.width = 0;
                canvas.height = 0;

                instructionsDiv = document.getElementById("id-div-instructions");
                instructionsDiv.style.display = "none";
                instructionsDiv = document.getElementById("id-div-perks");
                instructionsDiv.style.display = "none";
                instructionsDiv = document.getElementById("id-div-levels");
                instructionsDiv.style.display = "none";

                instructionsDiv = document.getElementById("id-div-about");
                instructionsDiv.style.display = "block";
            }


            function showLevelsInfo ()
            {
                inAndAbout = true;
                document.getElementById("id-span-level").innerHTML = "Level About"

                tableDiv = document.getElementById("id-div-table");
                tableDiv.style.width = "0px";
                tableDiv.style.height = "0px";

                canvas = document.getElementById("id-canvas-cubeRun");
                canvas.width = 0;
                canvas.height = 0;

                instructionsDiv = document.getElementById("id-div-instructions");
                instructionsDiv.style.display = "none";
                instructionsDiv = document.getElementById("id-div-perks");
                instructionsDiv.style.display = "none";
                instructionsDiv = document.getElementById("id-div-about");
                instructionsDiv.style.display = "none";

                instructionsDiv = document.getElementById("id-div-levels");
                instructionsDiv.style.display = "block";
            }

            function showLevelIndex (index)
            {
                
                if((index>0) && (index <= level.length))
                {
                    currentLevel = index-1;
                    showLevel();
                }
                else
                {
                    alert("Error: Level does not exist!");
                }
            }

            function showLevel ()
            {
                if (currentLevel < 3)
                {
                    instructionsDiv = document.getElementById("id-div-instructions");
                    instructionsDiv.style.display = "block";
                    instructionsDiv = document.getElementById("id-div-perks");
                    instructionsDiv.style.display = "none";
                }
                else
                {
                    instructionsDiv = document.getElementById("id-div-instructions");
                    instructionsDiv.style.display = "none";
                    instructionsDiv = document.getElementById("id-div-perks");
                    instructionsDiv.style.display = "block";
                }

                instructionsDiv = document.getElementById("id-div-about");
                instructionsDiv.style.display = "none";
                instructionsDiv = document.getElementById("id-div-levels");
                instructionsDiv.style.display = "none";

                var scale = level[currentLevel].tableFieldSize/100;
                // Get canvas
                canvas = document.getElementById("id-canvas-cubeRun");
                canvas.width = level[currentLevel].tableWidth*level[currentLevel].tableFieldSize+40*scale;
                canvas.height = level[currentLevel].tableHeight*level[currentLevel].tableFieldSize+40*scale;

                // Get table
                tableDiv = document.getElementById("id-div-table");
                tableDiv.style.width = "" + (level[currentLevel].tableWidth*level[currentLevel].tableFieldSize+40*scale) + "px";
                tableDiv.style.height = "" + (level[currentLevel].tableHeight*level[currentLevel].tableFieldSize+40*scale) + "px";
                
                // Create sprite sheet
                coinImage = new Image();
                coinImage.src = "coin-1-animation.png";

                // Create sprite sheet
                coinImage2 = new Image();
                coinImage2.src = "coin-2-animation.png";

                if (level[currentLevel].tableFieldImage)
                {
                    tableField = new Image();
                    tableField.src = level[currentLevel].tableFieldImage;
                }
                else
                {
                    tableField = null;
                }

                if (level[currentLevel].tableBackgroundImage)
                {
                    tableBackground = new Image();
                    tableBackground.src = level[currentLevel].tableBackgroundImage;
                }
                else
                {
                    tableBackground = null;
                }
                
                
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
                    start: level[currentLevel].start
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
                    start: level[currentLevel].start
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
                    perks: level[currentLevel].perks,
                    background: tableBackground,
                    numbers: level[currentLevel].numbers, 
                    destination: level[currentLevel].destination,
                    start: level[currentLevel].start,
                    map: level[currentLevel].map
                });
            }

            document.onkeydown = handleKeyDown;
            document.onmousedown = onMouseClick;
            document.onmousemove = onMouseMove;
            window.onload = gameLoop;
            showLevel();

        </script>

    </body>
</html>
		
