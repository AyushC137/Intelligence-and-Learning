

// Node object
function Node(label) {

	// Nodes have physics now!

  this.pos = createVector(random(200,width-200),random(200,height-200));
  this.vel = createVector();
  // Has a label
  this.label = label;
  // zero or more edges
  this.edges = [];
  // No parent and not searched by default
  this.parent = null;
  this.parentAction = null;
  this.searched = false;
}

// Connect one or more neighbors
Node.prototype.connect = function(neighbor) {
  // This is a fancy way of having a function
  // that can accept a variable number of arguments
  for (var i = 0; i < arguments.length; i++) {
    this.edges.push(arguments[i]);
    // Connect both ways
   // arguments[i].edges.push(this);
  }
}

// Is this node connected to another node?
Node.prototype.isConnected = function(neighbor) {
  var index = this.edges.indexOf(neighbor);
  if (index >= 0) {
    return true;
  } else {
    return false;
  }
}

// Draw!
Node.prototype.show = function() {
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(8);
  var w = textWidth(this.label);
  //var w =10;
  stroke(0);
  fill(0);
  var nodeShape=ellipse(this.pos.x, this.pos.y, w*1.2, w*1.2);
  fill(255);
  noStroke();
  text(this.label, this.pos.x, this.pos.y);
}

// Draw connections as lines
Node.prototype.showEdges = function() {
  noFill();
  for (var i = 0; i < this.edges.length; i++) {
  	stroke(51);
    /*
  	if(this.edges[i].Action == "was killed by"){
  		stroke("red");
  	}
  	else if(this.edges[i].Action == "is sibling of"){
  		stroke("orange");
  	}
  	else if(this.edges[i].Action == "is married to"){
  		stroke("pink");
  	}
  	else if(this.edges[i].Action == "is parent of"){
  		stroke("blue");
  	}
  	else if(this.edges[i].Action == "killed"){
  		stroke("magenta");
  	}
  	else if(this.edges[i].Action == "is enemy of"){
  		stroke("grey");
  	}
  	else if(this.edges[i].Action == "is allied with"){
  		stroke("green");
  	}
  	else if(this.edges[i].Action == "is child of"){
  		stroke("yellow");
  	}
  	else{
  		stroke("white");
  	}
    */
    line(this.pos.x, this.pos.y, this.edges[i].RNode.pos.x, this.edges[i].RNode.pos.y);
  }
}