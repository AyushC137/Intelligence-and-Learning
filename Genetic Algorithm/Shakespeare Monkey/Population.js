
// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

function Population(p, m, num) {

  this.population;                   // Array to hold the current population
  this.matingPool;                   // ArrayList which we will use for our "mating pool"
  this.generations = 0;              // Number of generations
  this.finished = false;             // Are we finished evolving?
  this.target = p;                   // Target phrase
  this.mutationRate = m;             // Mutation rate
  this.perfectScore = 1;

  this.best = "";

  this.population = [];
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(this.target.length);
  }
    this.matingPool = [];

  // Fill our fitness array with a value for every member of the population
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }
  this.calcFitness();

/*//Using mating pool
  // Generate a mating pool
  this.naturalSelection = function() {
    // Clear the ArrayList
    this.matingPool = [];

    var maxFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (var i = 0; i < this.population.length; i++) {
      
      var fitness = map(this.population[i].fitness,0,maxFitness,0,1); //normalise fitness of same specie
      var n = floor(fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
      for (var j = 0; j < n; j++) {              // and pick two random numbers
        this.matingPool.push(this.population[i]); 
      }
    }
  }*/
  
  /*//Using Rejction sampeling
  this.acceptReject=function(maxFitness){
    var besafe = 0; // so that this does not goes forever
    while(true){
      var index = floor(random(this.population.length));
      var partner = this.population[index];
      var r = random(maxFitness);
      if(r<partner.fitness){
        return partner;
      }
      besafe++;
      if(besafe>10000){
        return null;
      }
    }
  }*/

  /*//Okish Rejction sampeling (wierdly seems to work idk why)
  this.getRand = function(fitnesses) {

    var randomFit = random(fitnesses[fitnesses.length - 1]);
    for (var i = 0; i <fitnesses.length  ; i++) {
      if (randomFit <= fitnesses[i]){ 
      return this.population[i];
      }
    }
  }*/

  //Using Fitness Probability (roulet wheel)
  // It only works if all the fitness values are normalized and add up to 1 
  this.pickOne = function (totalFitness) {
    // Start at 0
    var index = 0;
    // Pick a random number between 0 and 1
    var r = random(1);
    // Keep subtracting probabilities until you get less than zero
    // Higher probabilities will be more likely to be fixed since they will
    // subtract a larger number towards zero
    while (r > 0) {
      //probability of that fitness
      var fitness =this.population[index].fitness / totalFitness; //map(this.population[index].fitness, maxFitness,minFitness, 1,0);
      r -= fitness; 
      // And move on to the next
      index += 1;
    }
    // Go back one
    index -= 1;
    return this.population[index];
  } 




  // Create a new generation
  this.generate = function() {

    var newPopulation=[];

    /*//for Rejction sampeling 
    var maxFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }
    var fitnesses = [];
    var sum = 0;
    for (var i = 0; i < this.population.length; i++) {
      sum += this.population[i].fitness; 
      fitnesses[i] = sum;
    }*/ 

    //for Fitness Probability
    var totalFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
        totalFitness += this.population[i].fitness;
    }
    

    // Refill the population with children from the mating pool
    for (var i = 0; i < this.population.length; i++) {
      /*//for mating pool
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      
      //for Rejction sampeling
      var partnerA = this.acceptReject(maxFitness);
      var partnerB = this.acceptReject(maxFitness);

      //for Better Rejction sampeling 
      var partnerA = this.getRand(fitnesses);
      var partnerB = this.getRand(fitnesses);
      */

      //for Fitness Probability (not applicable here)
      var partnerA = this.pickOne(totalFitness);
      var partnerB = this.pickOne(totalFitness);
      

      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      
      //for Rejction sampeling & Better Rejction sampeling & Fitness Probability
      newPopulation[i] = child;

      //for mating pool 
      //this.population[i] = child;
    }
    //for Rejction sampeling & Better Rejction sampeling & Fitness Probabilitys 
    this.population = newPopulation;

    this.generations++;
  }


  this.getBest = function() {
    return this.best;
  }

  // Compute the current "most fit" member of the population
  this.evaluate = function() {
    var worldrecord = 0.0;
    var index = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord >= this.perfectScore) {  //coz of +0.01
      this.finished = true;
    }
  }

  this.isFinished = function() {
    return this.finished;
  }

  this.getGenerations = function() {
    return this.generations;
  }

  // Compute average fitness for the population
  this.getAverageFitness = function() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  this.allPhrases = function() {
    var everything = "";
    
    var displayLimit = min(this.population.length,50);
    
    
    for (var i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }
    return everything;
  }
}

