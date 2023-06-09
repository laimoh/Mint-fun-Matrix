
// SORRY I KNOW IT'S UGLY - PLEASE OPTIMISE IT AS YOU WISH <3
let video;
let playing = true;

let w = 640 * 1.2;
let h = 640 * 1.2;

// PIXEL RESOLUTION
let vScale = 12;

let purple = '#7a45ff';
let lightgrey = '#f0f6f7';
let darkgrey = '#231F24';

function setup() {
   createCanvas(w, h);
   pixelDensity(2);
   // LINK VIDEO HERE
   video = createVideo("mint!_comp_Earth.mp4",
   vidLoad);
   video.size(w / vScale, h / vScale);
}

function draw(){
   background(lightgrey)
   video.loadPixels();
   
   for (let y = 0; y <= video.height; y++) {
      for (let x = 0; x <= video.width; x++) {
        
         let index = (x + y * video.width) * 4
         let r = video.pixels[index + 0];
         let g = video.pixels[index + 1];
         let b = video.pixels[index + 2];
  
         let greyscale = (r + g + b) / 3
         let brightness = map(greyscale, 0, 255, 0, 1);
         
         // interchange "inverse" var with "brightness" to change light/dark mode
         let inverse = map(greyscale, 0, 255, 1, 0);
         let angle = map(brightness, 0, 1, 0, PI);

         if ( brightness < 0.2) {
            stroke(purple);
            noFill()
            ellipse(x * vScale + 6, y * vScale + 6, 6 * 2);
         } else if (brightness > 0.95) {
            fill(purple);
            noStroke()
            ellipse(x * vScale + 6, y * vScale + 6, 6 * 2);
         } else {
            push()
            marx(x * vScale + 6,  y * vScale + 6, 6, angle);
            pop()
         }
      }
   }

}

function marx(centerX, centerY, radius, rotateAngle) {
  // Draw the full circle
  stroke(purple);
  ellipse(centerX, centerY, radius * 2);
  
  // Draw the black half of the circle
   fill(lightgrey);
   arc(centerX, centerY, radius * 2, radius * 2, rotateAngle, rotateAngle + PI);
}


function mousePressed() {
   if (playing) {
     video.pause();
   }
    else {
      video.play();
    }
    playing = !playing;
  }


function vidLoad() {
   video.loop();
   video.volume(0);
 }
