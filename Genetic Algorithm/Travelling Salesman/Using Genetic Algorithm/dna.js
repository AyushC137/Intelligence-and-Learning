

// A generic function to swap two elements in an array
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// A DNA object is an order through the cities
function DNA(total, order) {

  // Start assuming it's distance is infinity and fitness is zero
  this.dist = Infinity;
  this.fitness = 0;

  //mutation and evolution
  // Is this being made from another DNA object?
  if (order instanceof Array) {
   
   /* // Just copy the order
    this.order = order.slice();
    // Mutation
    // 50% of the time shuffle(self made func) one spot to see if it improves
    if (random(1) < 0.5) {
      //this.shuffle();
      var i = floor(random(this.order.length));
      var j =floor((i+1)%this.order.length); 
      swap(this.order, i, j);
    }
     //2% chance of total shuffle
   // else if(random(1) < 0.02) {
    //    shuffle(this.order, true);
     //} 
     */
     this.order = order.slice();
  var cityCount = this.order.length;
   for(var i = 0; i < cityCount; i ++){
    if (random(1) < 0.01){
      var indexA = floor(random(this.order.length));
      var indexB = (indexA + 1) % cityCount;
      var indexC = (indexB + 1) % cityCount;
      if(random(1) < 0.8){
        swap(this.order, indexA, indexB);
      }
      else if(random(1) < 0.8){
        swap(this.order, indexA, indexC);

      }
      else if(random(1) < 0.8){
        swap(this.order, indexA, indexC);
        swap(this.order, indexA, indexB);
      }
      else if(random(1) < 0.8){
        swap(this.order, indexA, indexB);
        swap(this.order, indexA, indexC);
        }
      }
    }

  } else {

    // Create a random order
    this.order = [];
    for (var i = 0; i < total; i++) {
      this.order[i] = i;
    }

    // Shuffle randomly 
    // Is this good enough for variation?
    //for (var n = 0; n < this.order.length; n++) {
      shuffle(this.order, true);
    //}
  }
}

/*// Shuffle array one time
DNA.prototype.shuffle = function() {
  var i = floor(random(this.order.length));
  var j = floor(random(this.order.length));
  swap(this.order, i, j);
}*/

// How long is this particular path?
DNA.prototype.calcDistance = function(distances) {
  var sum = 0;
  for (var i = 0; i < this.order.length - 1; i++) {
    var cityAIndex = this.order[i];
    //var cityA = cities[cityAIndex];
    var cityBIndex = this.order[i + 1];
    var key = cityAIndex.toString()+cityBIndex.toString();
    //var cityB = cities[cityBIndex];
    //var d =dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += distances[key];
  }
  this.dist = sum;
  return this.dist;
}

// Map the fitess where shortest is best, longest is worst
DNA.prototype.mapFitness = function(minD, maxD) {
  //this.fitness =  map(this.dist, minD, maxD, 1, 0);
  //normalized = (x-min(x))/(max(x)-min(x))
  this.fitness = abs((this.dist-minD)/(maxD-minD));
  return this.fitness;
}

// Normalize against total fitness
DNA.prototype.normalizeFitness = function(total) {
  this.fitness /= total;
}

// Draw the path
DNA.prototype.show = function(showBest) {

  // Lines
  if(showBest)
    stroke(0);
  else
    stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i = 0; i < this.order.length; i++) {
    var n = this.order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  // Cities
  fill(255);
  for (var i = 0; i < this.order.length; i++) {
    var n = this.order[i];
    if(showBest){
      image(marker, cities[i].x-15, cities[i].y-30, 30, 30);
    }
    else{
    ellipse(cities[n].x, cities[n].y, 8, 8);
    }
  }
}

// This is one way to crossover two paths
DNA.prototype.crossover = function(other) {

  // Grab two orders
  var order1 = this.order;
  var order2 = other.order;

  // Pick a random start and endpoint
  var start = floor(random(order1.length));
  var end = floor(random(start + 1, order1.length + 1));

  // Grab part of the the first order
  var neworder = order1.slice(start, end);

  // How many spots do we need to add?
  var leftover = order1.length - neworder.length;

  // Go through order 2
  var count = 0;
  var i = 0;
  // As long as we aren't finished
  while (count < leftover) {
    // Take a city from order2
    var city = order2[i];
    // If it isn't part of the new child path yet
    if (!neworder.includes(city)) {
      // Add it!
      neworder.push(city);
      count++;
    }
    i++;
  }
  ///rotate
  for(var i = 0 ;i<start;i++){
    //neworder.push(neworder.shift());
    neworder.unshift(neworder.pop()) // -->
  }
  return neworder;
  /*  var indexA = floor(random(orderA.length));
  var indexB = indexA - floor(random(orderA.length));
  var newOrder = orderA.slice(indexA, indexB);
  for ( var i = 0; i < orderB.length; i ++){
    if(newOrder.indexOf(orderB[i]) == -1){
      newOrder.push(orderB[i]);
    }
  }
  return newOrder;*/


}
