// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Code for this video: https://youtu.be/9Xy-LMAfglE

// Array of cities
var cities = [];
var totalCities = 0;

// Best total distance
var recordDistance;
// Best path
var bestEver;

// An order of cities
var order = [];

// How many total possibilities
var totalPermutations;
// How many have we checked?
var count = 1;

// How far along are we?
var progress;

var Start = false;
var finished = false;
function setup() {
  var canvas = createCanvas(800,400);
  canvas.parent('canvas');
  progress = select('#progress');

  /*// Create the random cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2));
    cities[i] = v;
    // Start with a defaul order
    order[i] = i;
  }*/

  map = loadImage("map.png");
  marker = loadImage("marker.png");

    button = createButton('Start');
  button.position( width/2-20,height +20);
  button.mousePressed(begin);
}

function begin(){
  // Calculate total distance through array
  var d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();
  //console.log(bestEver);
  // Total possibilities
  totalPermutations = factorial(totalCities);
  Start = true;
}


function mousePressed() {
  if(Start == false && mouseY <height && mouseY > 0  && mouseX > 0  && mouseX < width  ){
  var v = createVector(mouseX, mouseY);
  cities.push(v);
    // Start with a defaul order
    order.push(totalCities);

  totalCities++;
}
}

function draw() {
  background(0);

  image(map, 0, 0, width, height);

  // Line in the middle
  //stroke(0);
  //line(0, height / 2, width, height / 2);


  if(Start == false){ 
     // Draw "the best" order so far
  // All cities
  //noFill();
  for (var i = 0; i < cities.length; i++) {
     
    image(marker, cities[i].x-15, cities[i].y-30, 30, 30);
    //ellipse(cities[i].x, cities[i].y, 16, 16);
  }
  }

  if (Start == true){
    var percent = 100 * (count / totalPermutations);
      // Draw the current one we are trying
  //translate(0, height / 2);
  if(percent >=100)
    stroke(0,0,0,0);
  else
    stroke(0,0,255);
  strokeWeight(1);
  beginShape();
  //fill(0);
  //for (var i = 0; i < cities.length; i++) {
  //  ellipse(cities[i].x, cities[i].y, 16, 16);
  //}
  noFill();
  for (var i = 0; i < order.length; i++) {
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();
  

  stroke(0);
  strokeWeight(3);
  noFill();
  // Draw "the best" order so far
  beginShape();
    for (var i = 0; i < order.length; i++) {
    var n = bestEver[i];
    var v = vertex(cities[n].x, cities[n].y);
  }
  // All cities
  for (var i = 0; i < cities.length; i++) {  
    image(marker, cities[i].x-15, cities[i].y-30, 30, 30);
    //ellipse(cities[i].x, cities[i].y, 16, 16);
  }

  endShape();
  


  // Try a new possibility
  var d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
  }

  // How far along?
  textSize(15);
  fill(255);
  if(totalCities<13) // coz too huge factorial after that for .js 
    progress.html(nf(percent, 0, 2));
  else
    progress.html('Cant Handle');
  nextOrder();
}
}


// An array swap function
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// Total distance through points based on order
function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

// This is my lexical order algorithm

function nextOrder() {
  count++;

  // STEP 1 of the algorithm
  // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {

    noLoop();
    console.log('finished');

  }

  // STEP 2
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  // STEP 3
  swap(order, largestI, largestJ);

  // STEP 4: reverse from largestI + 1 to the end
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
