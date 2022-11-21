let noiseMax = 2
let phase = 0
let zoff = 0
var xoff1 = 0
var xoff2 = 10000
let p5Canvas;
let chasingPoint;
let easing = 0.08;


P5Capture.setDefaultOptions({
  format: "jpg",
  quality: 0.92,
  disableScaling: true,
  autoSaveDuration: 30,
})

function setup() {
  p5Canvas = createCanvas(500, 500);
  chasingPoint = createVector(0, 0);
  frameRate(30);
}

function draw() {
  if (frameCount ===1) {
    const capture = P5Capture.getInstance();
    capture.start({
      format: "jpg",
    
      duration: 30,
    });
  }

  background(255);
  push();
  translate(width / 2, height / 2)
  stroke(255, 0, 0, 50)
  strokeWeight(4)
  noFill()
  beginShape()
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax)
    let yoff = map(sin(a), -1, 1, 0, noiseMax)
    let r = map(noise(xoff, yoff, zoff), 0, 1, width / 4, width / 2.5)

    let x = r * cos(a)
    let y = r * sin(a)

    vertex(x, y)



    let targetPoint = createVector(x, y)
    let angle = atan2(targetPoint.y - chasingPoint.y, targetPoint.x - chasingPoint.x)
    chasingPoint = p5.Vector.lerp(chasingPoint, targetPoint, easing)

    push();
    translate(chasingPoint.x, chasingPoint.y);
    rotate(angle)
    point(0, 0);
    fill("#FFC107")
    strokeWeight(3)
    pop();
  }
  endShape(CLOSE)

  //   beginShape()
  //   for (let a=0;a < TWO_PI; a+=0.01){
  //     let xoff = map(cos(a), -1,1,0,noiseMax)
  //     let yoff = map(sin(a), -1,1,0,noiseMax)

  //        let r2 = map(noise(xoff,yoff,zoff),0,1,width/4.5,width/5)
  //        let x2 = r2*cos(a)
  //     let y2 = r2*sin(a)
  //      vertex(x2,y2-200)

  //   }
  //   endShape(CLOSE)
  //    beginShape()
  //   for (let a=0;a < TWO_PI; a+=0.01){
  //     let xoff = map(cos(a), -1,1,0,noiseMax)
  //     let yoff = map(sin(a), -1,1,0,noiseMax)

  //        let r2 = map(noise(xoff,yoff,zoff),0,1,width/4.5,width/5)
  //        let x2 = r2*cos(a)
  //     let y2 = r2*sin(a)
  //      vertex(x2,y2+200)

  //   }
  //   endShape(CLOSE)

  zoff += 0.01
  pop();

  //    push();
  //   var x= map(noise(xoff1), 0, 1,0, width);
  //   var y= map(noise(xoff2), 0, 1, 0, height);
  //   xoff1 +=0.005
  //   xoff2 +=0.005
  //   fill("red")
  //   strokeWeight(4)
  //   stroke("#F8968F")
  // textSize(20);
  // text('Artist', x, y);
  //   pop();
  if (mouseIsPressed === true) {
    noiseMax = 10
  } else {
    noiseMax = 2
  }

//   capturer.capture(p5Canvas.canvas);
//   if (frameCount === 32) {
//     noLoop();
//     capturer.stop();
//     capturer.save();
//   }
}





// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }