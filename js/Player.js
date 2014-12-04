			function Player(){
				// get methods
				this.getPoint = function(){return this.point;}
				this.isEndTurn = function() {return this.endTurn;}
				this.getID = function() { return this.id;}
				this.getdirection = function(){ return this.direction;}
	
				// set methods
				this.setPoint = function(point){this.point = point;}
				this.setEndTurn = function(endTurn){this.endTurn = endTurn;}
				this.setID = function(id) {this.id = id;}
	
				// increase methods
				this.incPoint = function(i) {this.point += i;}
			}