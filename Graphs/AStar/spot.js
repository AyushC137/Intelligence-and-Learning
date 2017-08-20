function dummyWall(){
  this.wall = true;
}

// An object to describe a spot in the grid
function Spot(i, j) {

  // Location
  this.i = i;
  this.j = j;

  // f, g, and h values for A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // Neighbors
  this.neighbors = [];

  // Where did I come from?
  this.previous = undefined;

  // Am I an wall?
  this.wall = false;
  if (random(0,1) < 0.3) { //30%
    this.wall = true;
  }

  // Display me
  this.show = function(col) {
    if (this.wall) {
      fill(0);
      noStroke();
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w , h );
      //rect(this.i * w , this.j * h , w , h );
    }
    else if(this.i ==cols - 1 && this.j ==rows - 1){
      fill(color(0, 255,0 ));
      rect(this.i * w , this.j * h, w , h );
    } 
    else if (col){
      fill(col);
      rect(this.i * w, this.j * h, w, h);
    }
  }

  // Figure out who my neighbors are
  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    //for edge cases 
    var dummy = new dummyWall();
    //if statments for edge cases
    //right
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    else{this.neighbors.push(dummy) }
    //left
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    else{this.neighbors.push(dummy) }
    //bottom
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    else{this.neighbors.push(dummy) }
    //top
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    else{this.neighbors.push(dummy) }
    //top left
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    else{this.neighbors.push(dummy) }
    //top right
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    else{this.neighbors.push(dummy) }
    //bottom left
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    else{this.neighbors.push(dummy) }
    //bottom right
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
    else{this.neighbors.push(dummy) }
  }
}
