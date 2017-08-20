// Daniel Shiffman
// Nature of Code: Intelligence and Learning

// Evolve Traveling Salesperson

// Cities
var cities = [];
var totalCities = 0;
var distances={};

// Best path overall
var recordDistance = Infinity;
var bestEver;

// Population of possible orders
var population = [];
var popTotal = 2000;

var Start = false;

function setup() {
  createCanvas(800, 700);

  /*// Make random cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, height / 2 - 10));
    cities[i] = v;
  }
  */

  map = loadImage("map.png");
  marker = loadImage("marker.png");

    button = createButton('Start');
  button.position( width/2-20,height +20);
  button.mousePressed(begin);
}

function distanceTable(){
  for (var i = 0; i < totalCities ; i++) {
    for (var j = 0; j < totalCities; j++) {
    var cityA = cities[i];
    var cityB = cities[j];
    var d =dist(cityA.x, cityA.y, cityB.x, cityB.y);
    var key = i.toString()+j.toString();
    distances[key] = d;
    }
  }
  //console.log(distances);
}
function begin(){
  // Create population
  //totalCities--; //coz 1 extra by mouse pressed
  for (var i = 0; i < popTotal; i++) {
    population[i] = new DNA(totalCities);
  }
  distanceTable();
  Start = true;
}

function mousePressed() {
  if(Start == false && mouseY <height/2 && mouseY > 0  && mouseX > 0  && mouseX < width  ){
  var v = createVector(mouseX, mouseY);
  cities.push(v);
  totalCities++;
}
}

function draw() {
  background(0);
  image(map, 0, 0, width, height/2);

  if(Start == false){ 
     // Draw "the best" order so far
  // All cities
  fill(0);
  for (var i = 0; i < cities.length; i++) {
     
    image(marker, cities[i].x-15, cities[i].y-30, 30, 30);
    //ellipse(cities[i].x, cities[i].y, 16, 16);
  }
  }

  else{

  // Each round let's find the best and worst
  var minDist = Infinity;
  var maxDist = 0;

  // Search for the best this round and overall
  var bestNow;
  for (var i = 0; i < population.length; i++) {
    var d = population[i].calcDistance(distances);

    // Is this the best ever?
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }

    // Is this the best this round?
    if (d < minDist) {
      minDist = d;
      bestNow = population[i];
    }

    // Is this the worst?
    if (d > maxDist) {
      maxDist = d;
    }
  }
  var showBest = true;
  // Show the best ever
   bestEver.show(showBest);
  
  translate(0, height / 2);
  line(0, 0, width, 0);
  showBest = false;
  // Show the best this round
    bestNow.show(showBest);

  // Map all the fitness values between 0 and 1
  var sum = 0;
  for (var i = 0; i < population.length; i++) {
    sum += population[i].mapFitness(minDist, maxDist);
  }

  // Normalize them to a probability between 0 and 1
  for (var i = 0; i < population.length; i++) {
    population[i].normalizeFitness(sum);
  }

  // Selection

  // A new population
  var newPop = [];

  // Sam population size
  for (var i = 0; i < population.length; i+=2) {

    // Pick two
    var a = pickOne(population);
    var b = pickOne(population);

    // Crossover!
    var order = a.crossover(b);
    var order2 = b.crossover(a);
    newPop[i] = new DNA(totalCities, order);
    newPop[i+1] = new DNA(totalCities, order2);
  }

  // New population!
  population = newPop;

}
}

// This is a new algorithm to select based on fitness probability!
// It only works if all the fitness values are normalized and add up to 1
function pickOne() {
  // Start at 0
  var index = 0;

  // Pick a random number between 0 and 1
  var r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= population[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  return population[index];
}
