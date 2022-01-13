var player,playerImage, playerStop
var coinGroup,coinImage;  
var bg, backgroundImage;
var train, trainImage
var score = 0;
var gameState = "play"
var trainGroup,invisibleBlockGroup;

function preload(){
  playerImage = loadAnimation("images/player_2.png","images/player_3.png","images/player_4.png");
  playerStop = loadAnimation("images/suway_6.png")
  coinImage = loadImage("images/coins.png");
  backgroundImage = loadImage("images/background.png");
  trainImage = loadImage("images/train2.png");
}



function setup() {
  createCanvas(600,600);
 
  bg = createSprite(300,300);
  bg.addImage("background",backgroundImage);
  bg.scale = 1.5
  bg.velocityY = 1;
 

  coinGroup = new Group();
  player = createSprite(300,300)
  player.addAnimation("player_running",playerImage)
  player.addAnimation("playerStop",playerStop)
   trainGroup = new Group();
   invisibleBlockGroup = new Group();
}

function draw() {
  background(1);

  if(gameState === "play"){
    if(bg.y > 400){
      bg.y = 300
    } 
    player.isTouching(coinGroup, collectCoins);
    handleCoins();
    spawnTrains();
    playerControls();
    // generetPosition();

    if(player.isTouching(invisibleBlockGroup)){
  gameState = "end"
    }
  }else if(gameState === "end"){
    gameOver();
  }
  drawSprites();
 
  text("collected coin: "+score,380,10);
}

function gameOver(){
 bg.velocityY = 0;
 coinGroup.setVelocityYEach(0);
 trainGroup.setVelocityYEach(0);
 invisibleBlockGroup.setVelocityYEach(0);
 player.changeAnimation("playerStop")
 text("gameOver", 390,90 );
}

function handleCoins(){
  if (frameCount % 120 === 0) {
    let xPosition = generetPosition();
    for(var i = 0; i<5; i++){   
      var coin = createSprite(xPosition,i*50);
      coin.addImage(coinImage)
      coin.velocityY = 2
      coin.lifetime = 300;
      coinGroup.add(coin)
    }
  }
}

function collectCoins(player,coin){
  coin.remove();
  score += 1;  
} 
function spawnTrains(){
  if (frameCount % 300 === 0) {
    let xPosition = generetPosition();
    train = createSprite(xPosition,100);
    train.addImage("train", trainImage);
    train.scale = 1.5
    train.velocityY = 2
    let invisibleBlock = createSprite(xPosition,160,150,5);
    trainGroup.add(train);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.velocityY = 2
  }
}
function playerControls(){
  if(keyIsDown(LEFT_ARROW)){
    player.x -= 70
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.x += 70
  }
}
function generetPosition(){
  let r = Math.round(random(1,3))
  console.log(r);
  let xPosition=width/2;
  // if(r===1)
  switch(r){
    case 1:xPosition=width/2-70;break;
    case 2:xPosition=width/2;break;
    case 3:xPosition=width/2+70;break;
    default:break;
  }
  return xPosition;

}