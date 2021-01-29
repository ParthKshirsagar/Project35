var database;
var position;
var bg;
var balloon;
var balloonImg1;
var balloonImg2;

function preload(){
  bg = loadImage("background.png");
  balloonImg1 = loadImage("HotAirBallon-03.png");
  balloonImg2 = loadAnimation("HotAirBallon-02.png", "HotAirBallon-03.png", "HotAirBallon-04.png");
}
function setup() {
  createCanvas(1300,500);

  database = firebase.database();

  balloon = createSprite(100, 350, 100, 100);
  balloon.addImage("balloon", balloonImg1);
  balloon.scale = 0.5;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);

}

function draw() {
  background(bg);  

  if(keyDown(LEFT_ARROW)){
    writePosition(-10, 0);
    balloon.addAnimation("balloon", balloonImg2);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10, 0);
    balloon.addAnimation("balloon", balloonImg2);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0, -10);
    balloon.addAnimation("balloon", balloonImg2);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0, 10);
    balloon.addAnimation("balloon", balloonImg2);
    balloon.scale = balloon.scale + 0.01;
  }

  textSize(25);
  fill("yellow");
  strokeWeight(3);
  stroke("red");
  text("Use the arrow key to move the Hot Air Balloon", 50, 50);

  drawSprites();
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function writePosition(x, y){
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function showError(){
  console.log("Error in writing database");
}