var towerImg , ghostImg , doorImg , climberImg , spookySound;
var tower;
var ghost;
var climber,door,inviBlock;
var doorGroup , climberGroup , inviBlockGroup;
var GAMESTATE="play";



function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
//sprite for tower
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=3;
  
//sprite for ghost
  ghost = createSprite(200,350,50,80);
  ghost.addImage( "ghost",ghostImg);
  ghost.scale=0.5;
  
//groups
  doorGroup=new Group();
  climberGroup=new Group();
  inviBlockGroup=new Group();
  
  spookySound.loop();
  
}
function draw(){
  background(220);
  
  if(GAMESTATE=="play"){
   
    
//reseting the tower image
  if(tower.y>600){
    tower.y=300;
  }
 
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  
//gravity
  ghost.velocityY=ghost.velocityY+0.5;
    
 if(keyDown("LEFT_ARROW")){
   ghost.x=ghost.x-2;
}
  
 if(keyDown("RIGHT_ARROW")){
   ghost.x=ghost.x+2;
}
  
  if(inviBlockGroup.isTouching(ghost)||ghost.y>600){
    GAMESTATE="end";
    tower.destroy();
    ghost.destroy();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    inviBlockGroup.destroyEach();
  }
  
   if(climberGroup.isTouching(ghost)) {
     ghost.velocityY=0;
   }
  
//call the function for doors
  spawnDoors();
    
 }
  if(GAMESTATE=="end"){
    fill("black")
    textSize(30);
    text("Game Over",300,300);
  }
  
  drawSprites();
}

function spawnDoors(){
  if(frameCount%200==0){
    door = createSprite(200,50);
    door.addImage("doors",doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=2;
    door.lifetime=800;
    
    climber = createSprite(200,100);
    climber.addImage("climbers",climberImg);
    climber.x=door.x;
    climber.velocityY=2;
    climber.lifetime=800;
    
    inviBlock = createSprite(200,120);
    inviBlock.x=door.x;
    inviBlock.velocityY=2;
    inviBlock.width=climber.width;
    inviBlock.height=1;
    inviBlock.debug=true;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    inviBlockGroup.add(inviBlock);
    
  }
  
}
