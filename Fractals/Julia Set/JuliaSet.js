
// c=r*cos(a)+i*r*sin(a), where: a=(0..2*Pi), r=0.7885

var angle = 0;
var frDiv;
function  setup() {
  createCanvas(640, 360);
  pixelDensity(1);
  colorMode(HSB);
    frDiv = createDiv('');
}
function  draw() {

  // float ca = map(mouseX, 0, width, -1, 1);//-0.70176;
  // var cb = map(mouseY, 0, height, -1, 1);//-0.3842;

  var ca = 0.7885*cos(angle);//sin(angle);
  var cb = 0.7885*sin(angle);

  angle += 0.02;

  background(255);

  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  //var w = abs(sin(angle))*5;
  var w = 5;
  var h = (w * height) / width;

  // Start at negative half the width and height
  var xmin = -w/2;
  var ymin = -h/2;

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();

  // Maximum number of iterations for each point on the complex plane
  var maxiterations = 100;

  // x goes from xmin to xmax
  var xmax = xmin + w;
  // y goes from ymin to ymax
  var ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  var dx = (xmax - xmin) / (width);
  var dy = (ymax - ymin) / (height);

  // Start y
  var y = ymin;
  for (var j = 0; j < height; j++) {
    // Start x
    var x = xmin;
    for (var i = 0; i < width; i++) {

      // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
      var a = x;
      var b = y;
      var n = 0;
      while (n < maxiterations) {
        var aa = a * a;
        var bb = b * b;
        // Infinity in our finite world is simple, let's just consider it 16
        if (aa + bb > 4.0) {
          break;  // Bail
        }
        var twoab = 2.0 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
        n++;
      }

      var bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0,255); //360); 
      //var hue = color(bright,255,150); 

      if (n == maxiterations) {
        bright = 0;
      }

      var pix = (i+ j * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] =  bright;
      pixels[pix + 3] = 255;
      

      x += dx;
    }
    y += dy;
  }
  updatePixels();
  frDiv.html(floor(frameRate()));
}