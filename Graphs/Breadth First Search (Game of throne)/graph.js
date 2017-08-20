// This is the graph object 
function Graph() {
  // store nodes by key and also in an array
  this.graph = {};	//empty object used as assosiative array
  this.nodes = [];
  // Start and end
  this.start = null;
  this.end = null;
}


// Set the start
Graph.prototype.setStart = function(node) {
  this.start = node;
}

// Set the end
Graph.prototype.setEnd = function(node) {
  this.end = node;
}


// Add a node
Graph.prototype.addNode = function(n) {
  //var n = new Node(label);
  // Add to both the graph object and the nodes array
  this.graph[n.value] = n;
  //node into array
  this.nodes.push(n);
  return n;
}
// Clear all searched and parent values
Graph.prototype.clear = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].searched = false;
    this.nodes[i].parent = null;
    this.nodes[i].parentAction = null;
  }
}


// Draw everything
Graph.prototype.show = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].showEdges();
  }
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].show();
  }
}

// Simulate some physics!
Graph.prototype.simulate = function() {

  // First node always in center
  //this.nodes[0].pos.set(random(width/2,width-50),random(height/2,height-50));

  // Look at every node against every other node
  for (var i = 1; i < this.nodes.length; i++) {
    var node1 = this.nodes[i];
    for (var j = 0; j < this.nodes.length; j++) {
      // Nodes don't interact with themselves!
      if (i == j) continue;
      var node2 = this.nodes[j];

      // A vector that points between the nodes
      var force = p5.Vector.sub(node1.pos, node2.pos);
      var dist = force.mag();

      // What is spring force?
      var spring = 0;
      var k = 0.01;
      // If they are connected calculate
      if (node1.isConnected(node2) || node2.isConnected(node1)) {
        spring = k * (this.springLength - dist);
      }
      // All nodes need their own space even if not connected
      var separate = 1 / (dist * k);
      // Apply the force!
      force.setMag(spring + separate);
      node1.vel.add(force);
      // Slow down velocity so that it dampens over time
      node1.vel.mult(0.95);
    }
  }

  // Add velocity to position for all nodes
  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    if(node.pos.x <= random(width/2,width-50) && node.pos.y <= random(height/2,height-50) 
      &&node.pos.x >= random(50,width/2) && node.pos.y >= random(50,height/2)){
    
    node.pos.add(node.vel);
  }
  }
}
