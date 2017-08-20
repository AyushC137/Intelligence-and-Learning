// Daniel Shiffman <http://www.shiffman.net>

var data;
var graph;
// A lookup table for actors
// (redundant, the graph could handle this)
var charList;

//dropdown
var chardwS;
var chardwE;
var button;

function preload() {
  data = loadJSON('got.json');
}
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function setup() {
	createCanvas(800, 600);
	graph =new Graph();
	// A separate lookup table for actors
 	charList = {};
	//noCanvas();
	var GOT = data.GOT;
	for (var i = 0; i < GOT.length; i++) {
		// Title and castlist
		var char = GOT[i].Char;
		//var relations = GOT[i].Relations;
		//var cast = movies[i].cast;
		// Add the movie to the graph
		var charNode = new Node(char)
		graph.addNode(charNode);
		charList[char] = charNode;
		//for (var j = 0; j < relations.length; j++) {
		//	charNode.connect({"Rname":relations[j].RName,"Action":relations[j].Action});
	    //}

	}
	//console.log(charList);
	for (var i = 0; i < GOT.length; i++) {
		var relations = GOT[i].Relations;
		charNode = charList[GOT[i].Char];
		for (var j = 0; j < relations.length; j++) {
			//console.log(charList[relations[j].RName]);
			//var relationNode = graph.getNode(relations[j].RName);
			charNode.connect({"RNode":charList[relations[j].RName],"Action":relations[j].Action});
			//charNode.connectAction();
	    }

	}


	//var start = charList["Polliver"];
	//  var end = charList["Petyr Baelish"];
	//  graph.setStart(start);
	//  graph.setEnd(end);


  // Create dropdown
  chardwS = createSelect();
  chardwE = createSelect();
  button = createButton('Find Connection!');

  //position
  chardwS.position((width/2 )-150, (height/2)-50);
  chardwE.position(width/2 , (height/2)-50);
  button.position((width/2)-60 , height/2);
  //chardwS.parent('chardwS');
  var allchars = Object.keys(charList);
  // Add all the actors
  for (var i = 0; i < allchars.length; i++) {
    chardwS.option(allchars[i]);
    chardwE.option(allchars[i]);
  }
  // Set up an event
	button.mousePressed(findRelation);
  //createDiv("Scroll Down !");
 

}
function findRelation() {
  // Clear everyone from having been searched
  graph.clear();
  // Start and end
  var start = charList[chardwS.value()];
  var end = charList[chardwE.value()];
  graph.setStart(start);
  graph.setEnd(end);
  // Run the search!
  bfs();
}

function bfs() {
  // Create a queue ad path
  var queue = [];
  var path = [];
	//var actions = [];

  // Get started
  queue.push(graph.start);

  while (queue.length > 0) {
    var node = queue.shift(); //dequeue
    // Are we done?
    if (node == graph.end) {
      // Figure out the path
      path.push(node);
      var next = node.parent;
      while (next) {
        path.push(next);
        next = next.parent;

      }
      break;
    } else {
      // Check all neighbors
      var next = node.edges;

      for (var i = 0; i < Object.size(next); i++) {
        var neighbor = next[i].RNode;
        var action = next[i].Action;
        // Any neighbor not already searched add to queue
        if (!neighbor.searched) {
          queue.push(neighbor);
          neighbor.searched = true;
				
          // Updat the parent
          neighbor.parent = node;
          neighbor.parentAction= action;
        }
      }
      // Mark node as searched
      node.searched = true;
    }
  }
//console.log(path)
  //console.log('done!')
  var name = '';
  var actions = '';
  var result = '';
  for (var i = path.length-1; i >= 0; i--) {
    name = path[i].label;
    if(i>0 && i<=path.length-1)
    	actions = path[i-1].parentAction;
    else
    	actions = '';
    //console.log(name + actions );
    result += name;
    result += ' ';
    result += actions;
 	if (i != 0) {
      result += ' → ';
    }
    
  }
  //removeElements();
   var resultDisplay = createP(result);
  resultDisplay.style("font-size","25px");
  window.scrollTo(0,document.body.scrollHeight);



}



function draw() {
  background(255);
  graph.simulate();
  graph.show();
}