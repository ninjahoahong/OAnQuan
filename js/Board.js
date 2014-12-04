				
				
				function nextdSquare(direction){
					if (direction == -1)
					{
						if (--squareth < 0)
						{
							squareth = 5;
							if (--playerID < 0) playerID = 1;
						}
					}
					else if (direction == 1)
					{
						if (++squareth > 5)
						{
							squareth = 0;
							if (++playerID > 1) playerID = 0;
						}
					}
				}
				function move(direction){
					//take the stones
					var numStones = squares[playerID][squareth].getNumStone();
					if (squareth == 0) return 2; //return ERROR: can not move on big stone square
					if (numStones == 0) return 1; //return ERROR: no stones to move
					//set the square take to be empty
					squares[playerID][squareth].clear();
					nextdSquare(direction);
		
					//move
					for (i = numStones;i > 0;--i)
					{
						squares[playerID][squareth].incPoint(1);
						squares[playerID][squareth].incNumStone(1);
						nextdSquare(direction); //it will calculate direction for us
					}
					return 0; //return Success
				}
	
				function eat(direction){
					var points = 0;
					while (true)
					{
						if (squares[playerID][squareth].getPoint() != 0) break; //if this square is not empty, break else jump;
						nextdSquare(direction);
						if (squares[playerID][squareth].getPoint() == 0) break; //if next square is empty, break else eat;
						points += squares[playerID][squareth].getPoint();
						squares[playerID][squareth].clear();
						nextdSquare(direction);
					}
					return points;
				}
	
				function move2(playerID, squareth, direction){
					var points=0;
					var error = move(direction);
					if (error > 0) return -error;
					while(true){
						if (move(direction)!=0) break;
					}
					points = eat(direction);
					return points;	
				}
	
				// check if the game is end
				function checkEndGame(){
					if (squares[0][0].getNumStone() == 0 && squares[1][0].getNumStone()==0){
						endGame = true;
					} else {
						endGame = false;
					}
				}
	
				//check if the player needs to divide stones
				function isNeedDivide(playerID){
					var count = 0;
					for(i=1;i<6;++i){
						if(squares[playerID][i].getNumStone() == 0)
						++count;
					}
					if(count == 5)
						return true;
					else 
						return false;
				}
	
				// divide stone when one player runs out of stone in all his squares
				function divideStone(playerID){
					for(i=0;i<6;++i){
						squares[playerID][i].setNumStone(1);
						squares[playerID][i].setPoint(1);
					}
				}
			