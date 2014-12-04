			var playerID;
			var direction;
			var squareth;
			var players;
			var board;
			var squares;
			var gameloop;
			var canvas;
			var context;
			var endGame;
			var timer;
			
			function loadImages(sources, callback){
				var images = {};
				var loadedImages = 0;
				var numImages = 0;
				// get num of sources
				for (var src in sources) {
					numImages++;
				}
				for (var src in sources) {
					images[src] = new Image();
					images[src].onload = function(){
						if (++loadedImages >= numImages) {
							callback(images);
						}
					};
					images[src].src = sources[src];
				}
			}
			
			function renderScreen(){
				canvas = document.getElementById("myCanvas");
				context = canvas.getContext("2d");
				
 				var sources = {
					/*
					load pictures
					*/
					bg:"bg.png",
					imgLeft:"bitmap_LeftHand.png",
					imgRight:"bitmap_RightHand.png",
					/*
					load pictures
					*/
				};
 
				loadImages(sources, function(images){
					//context.drawImage(images.darthVader, 100, 30, 200, 137);
					context.drawImage(images.bg, 0, 0, 480, 360);
					if(playerID == 0){
						//draw directions
						if (direction == -1)
							context.drawImage(images.imgLeft, 210, 250, 25, 25);
						else if (direction == 1)
							context.drawImage(images.imgRight, 250, 250, 25, 25);
						
						//announce whose turn
						context.font = " 20px Courier New bold"
						context.fillStyle = "#00ff00"; //lime
						context.fillText("Turn of player 1", 10, 20); 
						
						//player 2
						context.fillStyle = "#ff8c00";	
						context.fillText("Player 2", 40, 40);
						context.fillText("Points: " + players[1].getPoint(), 40, 60);
						context.fillStyle = "#0000ff"; //blue
						for(i=5; i>0; --i){
							context.fillText((squares[1][i].getNumStone()+""), 336-(i-1)*48, 150);
						}
						
						//player 1
						context.fillStyle = "#ff00ff";// Magenta
						context.fillText("Player 1", 40, 280);
						context.fillText("Points: " + players[0].getPoint(), 40, 300);
						context.fillStyle = "#ff0000"; //red
						for(i=1;i<6;++i){
							context.fillText((squares[0][i].getNumStone()+""), 144 + (i-1)*48, 210);
						}
						
						//ve o quan
						context.font = " 30px Courier New bold"
						context.fillStyle = "#ff0000"; //red
						context.fillText((squares[1][0].getNumStone()+""),385,180);
						context.fillStyle = "#0000ff"; //blue
						context.fillText((squares[0][0].getNumStone()+""),95,180);
					} 
					else {
						//draw directions
						if (direction == -1)
							context.drawImage(images.imgLeft, 210, 250, 25, 25);
						else if (direction == 1)
							context.drawImage(images.imgRight, 250, 250, 25, 25);
							
						//announce whose turn
						context.font = " 20px Courier New bold"
						context.fillStyle = "#00ff00"; //lime
						context.fillText("Turn of player 2", 10, 20); 
						
						//player 1
						context.fillStyle = "#ff00ff";	
						context.fillText("Player 1", 40, 40);
						context.fillText("Points: " + players[0].getPoint(), 40, 60);
						context.fillStyle = "#ff0000"; //red
						for(i=5; i>0; --i){
							context.fillText((squares[0][i].getNumStone()+""), 336-(i-1)*48, 150);
						}
						
						//player 2
						context.fillStyle = "#ff8c00";
						context.fillText("Player 2", 40, 280);
						context.fillText("Points: " + players[1].getPoint(), 40, 300);
						context.fillStyle = "#0000ff"; //blue
						for(i=1;i<6;++i){
							context.fillText((squares[1][i].getNumStone()+""), 144 + (i-1)*48, 210);
						}
						
						// ve o quan
						context.font = " 30px Courier New bold"
						context.fillStyle = "#0000ff"; //blue
						context.fillText((squares[0][0].getNumStone()+""),385,180);
						context.fillStyle = "#ff0000"; //red
						context.fillText((squares[1][0].getNumStone()+""),95,180);
					}	
				});
			};
			
			// init function load once
			function init(){
				/*
				set up a board
				*/
				squares = new Array(2);
					for(i=0; i<2; ++i){
						squares[i] = new Array(5);
					for(j=0; j<6; ++j){
						squares[i][j]= new Square();
					}
				}					
			
				//set up BIG stones' squares
				squares[0][0].setNumStone(1);
				squares[0][0].setPoint(10);
				squares[0][0].setFlag(true);
				squares[1][0].setNumStone(1);
				squares[1][0].setPoint(10);
				squares[1][0].setFlag(true);
				//set up small stones' squares
				for (i=1; i<6;++i){
					squares[0][i].setNumStone(5);
					squares[0][i].setPoint(5);
					squares[1][i].setNumStone(5);
					squares[1][i].setPoint(5);
				}
				/*
				set up a board
				*/
				players = new Array(2)
				players[0] = new Player(0);
				players[0].setEndTurn(false);
				players[0].setPoint(0);
				players[0].setID(0);
				players[1] = new Player(1);
				players[1].setEndTurn(true);
				players[1].setPoint(0);
				players[1].setID(1);
				playerID = players[0].getID();
				squareth = -1;
				direction = 0;
				/*
				set up a board
				*/
				document.onkeydown = keyListener;
				start();
			}
			
			function start(){
				updateBoard();
				renderScreen();
			}
			
			function stop(){
				clearTimeout(timer);
			}
			/*
			update board
			*/
			function updateBoard(){
				if(endGame)			// game finished! update stats and put them in the db.
				{
					for(i=1; i<6;++i){
						players[0].incPoint(squares[0][i].getPoint());
						players[1].incPoint(squares[1][i].getPoint());
					}
						
					if(players[0].getPoint() > players[1].getPoint()){
						alert("Player 1 win"); 
					}
					else if(players[0].getPoint() == players[1].getPoint()){ 
						alert("Tied Game");
					}
					else{
						alert("Player 2 win"); 
					}				
					stop(); //ends the game loop
				}
				else {
					timer = setTimeout('start()',50);
					if((direction!=0)&&(squareth!=-1)){
						var score;
						if(playerID == 0){
							score = move2(playerID, squareth, direction);
							if (score >= 0)	{
								players[0].incPoint(score);
								playerID = players[1].getID(); 
								checkEndGame();
								direction = 0;
								squareth = -1;
							} else{
								//do nothing
								direction = 0;
								squareth = -1;
								playerID = players[0].getID();
							}
						} else {
							score = move2(playerID, squareth, direction);
							if (score >= 0){
								players[1].incPoint(score);
								playerID = players[0].getID();
								checkEndGame();
								direction = 0;
								squareth = -1;
							}else{
							//do nothing
								direction = 0;
								squareth = -1;
								playerID = players[1].getID();
							}
						}
						if(isNeedDivide(0)) {divideStone(0);}
						if(isNeedDivide(1)) {divideStone(1);}
					} else {
				//do nothing	
						}
				}
			}
			/*
			update board
			*/
			
			/* 
			key listener
			*/
			function keyListener(e){
				if(!e){
					e = window.event;
				}
				
				switch(e.keyCode){
					// choose the square to go
					case 49:
						squareth = 1;
						break;
					case 50:
						squareth = 2;
						break;
					case 51:
						squareth = 3;
						break;
					case 52:
						squareth = 4;
						break;
					case 53:
						squareth = 5;
						break;
					
					// choose the direction
					case 37:
					//left arrow go left
						direction = -1;
						break;
					case 39:
						// right arrow go right
						direction = 1;
						break;
					default:
						//not pressed no direction
						squareth = -1;
						direction = 0;
						break;
				}
			}
			
			/* 
			key listener
			*/
			
			
				