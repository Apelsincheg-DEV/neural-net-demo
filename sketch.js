let nn;
let canvas;

function preload() {
  // Загружаем обученную модель
  nn = ml5.neuralNetwork('model/model.json', modelLoaded);
}

function modelLoaded() {
  console.log("Модель загружена!");
}

function setup() {
  canvas = createCanvas(280, 280);
  background(0);
}

function draw() {
  if (mouseIsPressed) {
    stroke(255);
    strokeWeight(16);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function mouseReleased() {
  setTimeout(classify, 300);
}

function classify() {
  let img = get();
  img.resize(28, 28);
  img.loadPixels();

  let inputs = [];
  for (let i = 0; i < img.pixels.length; i += 4) {
    inputs.push(img.pixels[i] / 255); // нормализация
  }

  nn.classify(inputs, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  let label = results[0].label;
  document.getElementById("output").innerText = label;
}

function clearCanvas() {
  background(0);
  document.getElementById("output").innerText = "ожидание...";
}
