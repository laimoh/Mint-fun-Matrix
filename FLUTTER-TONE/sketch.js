// SORRY I KNOW IT'S UGLY - PLEASE OPTIMISE IT AS YOU WISH <3
let video;
let playing = true;

let w = 640 *1.2;
let h = 320 * 1.2;
let vScale = 12;
let inc = (255/8) ; // 255/10

let purple = '#7a45ff';
let lightgrey = '#f0f6f7';
let darkgrey = '#231F24';

//darkest
let thresh_0 = 0
let thresh_10 = thresh_0 + inc
let thresh_20 = thresh_10 + inc
let thresh_30 = thresh_20 + inc
let thresh_40 = thresh_30 + inc
let thresh_50 = thresh_40 + inc
let thresh_60 = thresh_50 + inc
let thresh_70 = thresh_60 + inc
let thresh_80 = thresh_70 + inc
// light

function setup() {
   createCanvas(w, h);
   pixelDensity(2);
   video = createVideo("test_!fun.mp4",
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
         let a = 255;

         let brightness = (r + g + b) / 3

         noStroke()

// NORMAL COLOR

         //  start defining threshold
     
         // if (brightness > thresh_0) {
         //    fill(lightgrey)
         //    square(x * vScale, y * vScale, 16)
         // } 
         // if (brightness >= thresh_10) {
         //    noStroke()
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 3.2);
         // }
         // if (brightness >= thresh_20) {
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 6);
         //    fill(lightgrey)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 3.2);
         // }
         // if (brightness >= thresh_30) {
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 6);
         // }
         // if (brightness >= thresh_40) {
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 8.8);
         //    fill(lightgrey)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 6);
         // }
         // if (brightness >= thresh_50) {
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 8.8);
         //    fill(lightgrey)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 5.6);
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 3.2);
         // } 
         //  if (brightness >= thresh_60) {
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 10);
         //    fill(lightgrey)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 5);
         // } 
         // if (brightness >= thresh_70) {
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 10);
         //    fill(lightgrey)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 3.2);
         // }
         // if (brightness >= thresh_80) {
         //    fill(purple)
         //    ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 10);
         // }

// INVERSE COLOR
         if (brightness > thresh_0) {
            fill(purple)
            ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 10);
         } 
         if (brightness >= thresh_10) {
            fill(purple)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 10);
               fill(lightgrey)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 3.2);
         }
         if (brightness >= thresh_20) {
            fill(purple)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 10);
               fill(lightgrey)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 5);
         }
         if (brightness >= thresh_30) {
            fill(purple)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 8.8);
               fill(lightgrey)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 5.6);
               fill(purple)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 3.2);
         }
         if (brightness >= thresh_40) {
            fill(purple)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 8.8);
               fill(lightgrey)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 6);
         }
         if (brightness >= thresh_50) {
              fill(purple)
            ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 6);
         } 
          if (brightness >= thresh_60) {
            fill(purple)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 6);
               fill(lightgrey)
               ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 3.2);
         } 
         if (brightness >= thresh_70) {
            noStroke()
            fill(purple)
            ellipse(x * vScale + vScale/2, y * vScale + vScale/2, 3.2);
         }
         if (brightness >= thresh_80) {
       
            fill(lightgrey)
            square(x * vScale, y * vScale, 16)
         }
      }
   }

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