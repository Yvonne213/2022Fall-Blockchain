//---------p5js---------------//

// GLOBAL VARIABLES
let noiseMax=2
let zoff = 0 
var xoff1=0
var xoff2=10000


function setup() {
  let c = createCanvas(880, 880);
  c.parent("container")
}


// this is basically the regular p5.js draw() function
//add " async " //
function draw() {
  background(255);

    push();
  translate(width/2, height/2)
  stroke("red")
  strokeWeight(4)
  noFill()
  beginShape()
  for (let a=0;a < TWO_PI; a+=0.01){
    let xoff = map(cos(a), -1,1,0,noiseMax)
    let yoff = map(sin(a), -1,1,0,noiseMax)
    let r = map(noise(xoff,yoff,zoff),0,1,width/2,width/2.5)
    let x = r*cos(a)
    let y = r*sin(a)
    vertex(x,y)
  }
  endShape(CLOSE)
  zoff+= 0.01
   pop();

   push();
  var x= map(noise(xoff1), 0, 1,0, width);
  var y= map(noise(xoff2), 0, 1, 0, height);

  xoff1 +=0.005
  xoff2 +=0.005
  fill("red")
  strokeWeight(3)
  stroke("#F8968F")
textSize(20);
text('ARTIST', x, y);

  pop();
  if (mouseIsPressed === true) {
   noiseMax =10
  } else {
    noiseMax=2
  }
}



