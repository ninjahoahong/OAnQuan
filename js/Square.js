			function Square(){
				// get methods
				this.getPoint = function(){return this.point;}
				this.isBigStoneSquare = function(){return this.flag;}
				this.getNumStone = function(){return this.stone;}
	
				//set methods
				this.setPoint = function(point) {this.point= point;}
				this.setFlag = function(flag) {this.flag =flag;} 
				this.setNumStone = function(stone) {this.stone = stone;}
	
	
				//increase methods
				this.incPoint = function(i) {this.point += i;}
				this.incNumStone = function(i){this.stone +=i;}
	
				// clear the square
				this.clear = function(){
					this.point = 0;
					this.stone = 0;
				}
			}