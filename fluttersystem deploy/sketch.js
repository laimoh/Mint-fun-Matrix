let cnv, img, video, imgWidth, imgHeight, videoWidth, videoHeight, w, h, aspectRatio, url;
const loaderBar = document.querySelector('.loader-bar-progress');
const fileInfo = document.querySelector('.file-info');
const loaderText = document.querySelector('#status_text')
let pixelScale = 44; // Updated pixelScale value
let vScale = 24; // Updated vScale value
let fileInput, fileNameDisplay, preview, inverseBtn; 
let inverseState = true;
let previewMedia = document.querySelector('#previewMedia');
let colors = 
['#6CF18A', '#7894FF', '#EF7AF1','#ef375e', '#FFF962','#FFA188', 
'#53d76a' , '#2e73ff', '#7a45ff', '#ff4f0a', '#ffcd45'];
let bgColors = ['#231F24', '#f0f6f7'];
let selectedColor = colors[3]; // Default color
let backgroundColor = bgColors[0];
let thresh = [];
let intervals = 8; // Updated to 8
let inc = 255 / intervals;
for (let i = 0; i < intervals; i++) {
  thresh[i] = Math.floor(i * inc);
}
let vScale32 = document.getElementById('vScale32');
let vScale24 = document.getElementById('vScale24');
let vScale16 = document.getElementById('vScale16');
vScale24.classList.toggle('selected');
let mediaImage = null;

function handleFile(event) {
   img = null; video = null;
   loaderText.innerHTML = 'laoding...'
   loaderBar.style.width = '0%'
   const file = event.target.files[0]; 
   fileNameDisplay.textContent = file.name;
   if (!file) {
     console.log('No file selected.');
     return;
   }
   if (preview) {
     preview.remove();
   }
   const fileType = file.type.toLowerCase();
   if (
     fileType.startsWith('image/') ||
     fileType.startsWith('video/')
   ) {
     url = URL.createObjectURL(file);
     if (fileType.startsWith('image/')) {
       preview = createImg(url, 'preview');
       mediaImage = true;
     } else if (fileType.startsWith('video/')) {
       preview = createVideo(url, () => {
         preview.loop();
         preview.volume(0);
       });
       mediaImage = false;
     }
     preview.id('previewMedia');
     preview.parent(fileInfo);
     loaderBar.style.width = '30%'
     mediaSetup(mediaImage, url);
   } else {
     console.log('Invalid file type. Please select an image or video file.');
   }
 }

function mediaSetup(mediaImage, URL) {
   if (mediaImage) {
     img = loadImage(URL, () => {
       imgWidth = img.width;
       imgHeight = img.height;
       aspectRatio = imgWidth / imgHeight;
       loaderBar.style.width = '60%'
       var dimensions = resizeMedia(aspectRatio, window.innerHeight);
       w = Math.ceil(dimensions.width);
       h = Math.ceil(dimensions.height);
       cnv = createCanvas(w, h);
       img.resize(w / vScale, h / vScale);
       video = null; // Reset the video variable
       redrawCanvas();
     });
   } else if (!mediaImage) {
     video = createVideo(URL, () => {
       video.hide();
       video.play();
       video.loop();
       video.volume(0);
       aspectRatio = video.width / video.height;
       loaderBar.style.width = '60%'
       var dimensions = resizeMedia(aspectRatio, window.innerHeight);
       w = Math.ceil(dimensions.width);
       h = Math.ceil(dimensions.height);
       cnv = createCanvas(w, h);
       video.size(w / vScale, h / vScale);
       img = null; // Reset the image variable
       redrawCanvas();
     });
   }
 }

let symbolFont;
function preload() {
  symbolFont = loadFont('./MintFunShapescales-Symbols.otf');
}

vScale24.addEventListener('click', function () {
   vScale32.classList.remove('selected');
   vScale16.classList.remove('selected');
   vScale24.classList.add('selected');
  pixelScale = 44;
  vScale = 24;
  mediaSetup(mediaImage, url);
});

vScale32.addEventListener('click', function () {
   vScale24.classList.remove('selected');
   vScale16.classList.remove('selected');
   vScale32.classList.add('selected');
  pixelScale = 58;
  vScale = 32;
  mediaSetup(mediaImage, url);
});

vScale16.addEventListener('click', function () {
   vScale24.classList.remove('selected');
   vScale32.classList.remove('selected');
   vScale16.classList.add('selected');
  pixelScale = 28;
   vScale = 16;
   mediaSetup(mediaImage, url);
});

function resizeMedia(aspectRatio, height) {
  var maxWidth = window.innerWidth / 1.5;
  var maxHeight = window.innerHeight;

  if (aspectRatio > maxWidth / maxHeight) {
    // Width is the limiting factor
    var width = maxWidth;
    var height = width / aspectRatio;
  } else {
    // Height is the limiting factor
    var height = maxHeight;
    var width = height * aspectRatio;
  }
  // Adjust width and height to fit the full column and row of pixels
  width = Math.floor(width / vScale) * vScale;
  height = Math.floor(height / vScale) * vScale;

  return {
    width: Math.ceil(width),
    height: Math.ceil(height),
  };
}

function setup() {
  fileInput = document.getElementById('file-input');
  fileNameDisplay = document.getElementById('file-name-display');
  fileInput.addEventListener('change', handleFile);
  inverseBtn = createButton('Invert');
  let symbolWrapper = select('.symbol_wrapper');
  inverseBtn.addClass('buttonStyle');
  inverseBtn.parent(select('.inverse-heading'));
  inverseBtn.mousePressed(() => {
    inverseState = !inverseState;
    if (!inverseState) {
      symbolWrapper.style('flex-direction', 'row-reverse');
    } else {
      symbolWrapper.style('flex-direction', 'row');
    }
    redrawCanvas();
  });

  for (let i = 0; i < bgColors.length; i++) {
    let colorButton = createButton('');
    colorButton.parent(select('.palette-bg'));
    colorButton.addClass('swatch');
    colorButton.style('background-color', bgColors[i]);
    colorButton.mousePressed(() => {
      backgroundColor = bgColors[i];
      redrawCanvas();
    });
  }

  for (let i = 0; i < colors.length; i++) {
    let colorButton = createButton('');
    colorButton.parent(select('.palette-symbol'));
    colorButton.addClass('swatch');
    colorButton.style('background-color', colors[i]);
    colorButton.mousePressed(() => {
      selectedColor = colors[i];
      redrawCanvas();
    });
  }
}

function redrawCanvas() {
  clear();
  background(backgroundColor);
  redraw();
  loaderText.innerHTML = 'completed'
  loaderBar.style.width = '100%'
}


function draw() {
  if (!img && !video) {
    return; // Exit the draw function if the image is not loaded yet
  }
  // Adjust the image width
  var dimensions = resizeMedia(aspectRatio, window.innerHeight);
  w = Math.ceil(dimensions.width);
  h = Math.ceil(dimensions.height);
  resizeCanvas(w, h); // Resize the canvas
  background(backgroundColor); // Set the background color
  if (img) {
    img.loadPixels();
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let index = (x + y * img.width) * 4;
        let r = img.pixels[index + 0];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
      let brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        noStroke();
        pixelate(brightness, x, y, inverseState);
      }
    }
    img.updatePixels();
  } else if (video) {
    video.loadPixels();
    for (let y = 0; y < video.height; y++) {
      for (let x = 0; x < video.width; x++) {
        let index = (x + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];
      let brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        noStroke();
        pixelate(brightness, x, y, inverseState);
      }
    }
  }
}

function pixelate(pixel_brightness, x, y, inverseState) {
  if (inverseState) {
    pixel_brightness = 255 - pixel_brightness; // Invert the pixel brightness
  }
  if (pixel_brightness <= thresh[0]) {
  } else if (pixel_brightness <= thresh[1]) {
    drawSymbol('A', x, y, pixelScale);
  } else if (pixel_brightness <= thresh[2]) {
    drawSymbol('B', x, y, pixelScale);
  } else if (pixel_brightness <= thresh[3]) {
    drawSymbol('C', x, y, pixelScale);
  } else if (pixel_brightness <= thresh[4]) {
    drawSymbol('D', x, y, pixelScale);
  } else if (pixel_brightness <= thresh[5]) {
    drawSymbol('E', x, y, pixelScale);
  } else if (pixel_brightness <= thresh[6]) {
    drawSymbol('F', x, y, pixelScale);
  } else if (pixel_brightness <= thresh[7]) {
    drawSymbol('G', x, y, pixelScale);
  } else {
    drawSymbol('H', x, y, pixelScale);
  }
}

function drawSymbol(letter, x, y, size) {
  textSize(size);
  textFont(symbolFont);
  fill(selectedColor);
  textAlign(CENTER, CENTER); // Set text alignment to center
  text(
    letter,
    (x + 0.5) * vScale,
    (y + 0.05) * vScale
  );
}

let helpLink = document.querySelector('.helpbtn');

helpLink.addEventListener('click', () => {
   document.querySelector('.help-box').classList.toggle('open')
})