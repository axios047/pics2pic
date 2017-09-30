var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

var boxes = [];

var covers = [
  'b-yEdfrvQ50',
  'YwFHhIgG77M',
  '1GrhuyHfzsI',
  'A4-jvtqBKN8',
  'rS1GogPLVHk'
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function setup() {
  noCanvas();
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  slider = createSlider(0, 255, 77);

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createSpan('');
      box.class('lol');
      box.style('display', 'inline-block');
      box.parent('mirror');
      boxes.push(box);
    }
  }

  for (var i = 0; i < rows*cols; i++){
    document.getElementsByClassName('lol')[i].style.background = "url(https://source.unsplash.com/" + covers[getRandomInt(0,5)] + "/16x16)";
  }

}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r+g+b)/3;

      var newBright = map(bright,0,500,0,1);

      // var threshold = slider.value();
      var checkIndex = x + y * cols;
      document.getElementsByClassName('lol')[checkIndex].style.filter = "brightness("+newBright+")";

      // if (bright > threshold) {
      //   document.getElementsByClassName('lol')[checkIndex].style.background = "pink";
      // } else {
      //   document.getElementsByClassName('lol')[checkIndex].style.background = "lightblue";
      // }
    }
  }

}
