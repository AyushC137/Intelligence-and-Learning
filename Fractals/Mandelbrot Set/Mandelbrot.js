var minval = -0;
var maxval = 0;

var minSlider = -2.5;
var maxSlider = 2.5;

var frDiv;

function setup() {
  createCanvas(800, 400);
  pixelDensity(1);

  //minSlider = createSlider(-2.5, 0, -2.5, 0.01);
  //maxSlider = createSlider(0, 2.5, 2.5, 0.01);

  frDiv = createDiv('');
}
function mouseWheel(event) {
  //print(event.delta);
  //move the square according to the vertical scroll amount
  minSlider -= event.delta/1000;
  maxSlider+= event.delta/1000;
  //uncomment to block page scrolling
  //return false;
}

function draw() {
  var maxiterations = 100;
  loadPixels();
  for (var x = 0; x < width/2; x++) {
    for (var y = 0; y < height; y++) {

      var a = map(x, 0, width/2, minSlider, maxSlider);
      var b = map(y, 0, height, minSlider, maxSlider);

      if(mouseX > width/2 && mouseX<width&&mouseY>0&&mouseY<height){

   var ca = map(mouseX, width/2, width, -2.5, 2.5);
      var cb = map(mouseY, 0, height, -2.5, 2.5);
      //console.log(ca);
      }
      // else{
     //  var ca = a;
      //var cb = b;
      //}
      var n = 0;
      while (n < maxiterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++; 
      }

      var bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n == maxiterations) {
        bright = 0;
      }


      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }

    for (var x = width/2; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var a = map(x, width/2, width, -2.5, 2.5);//, minSlider, maxSlider);
      var b = map(y, 0, height, -2.5, 2.5);//, minSlider, maxSlider);

      var ca = a;
      var cb = b;

      var n = 0;
      while (n < maxiterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++; 
      }
      

      var bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n == maxiterations) {
        bright = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;

    }
  }
  updatePixels();

  frDiv.html(floor(frameRate()));
}

