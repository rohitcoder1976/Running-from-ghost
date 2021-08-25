var Sahil,invisibleB,road,enemy,gameOver,restar;
var SahilImg,Sahil_Over,gameOverImg,roadImg,enemyImg,restarImg;
var obstacles1,obstacles2,obstacles3;
var obstacles1Img,obstacles2Img,obstacles3Img;
var obstacle1G,obstacle2G,obstacle3G;


var PLAY=1;
var END=0;
var gameState=1;

var distance=0;

function preload(){

  SahilImg=loadAnimation("Runner-1.png","Runner-2.png");
  Sahil_Over=loadAnimation("Runner-3.png");

  enemyImg=loadImage("ghost.png");
  roadImg=loadImage("Road.png");

  obstacles1Img=loadImage("carroof.png");
  obstacles2Img=loadImage("carroof.png");
  obstacles3Img=loadImage("carroof.png");

  gameOverImg=loadImage("gameOver.png");
  restarImg=loadImage("restart.png");

}

function setup() {

 
  createCanvas(windowWidth,windowHeight);
  
  Sahil=createSprite(width/2,height-250,20,20);
  Sahil.addAnimation("Running",SahilImg);
  Sahil.addAnimation("ded",Sahil_Over);
  Sahil.scale=0.06;

  enemy=createSprite(width/2,Sahil.y+150,20,20);
  enemy.addAnimation("ghost12",enemyImg);
  enemy.scale=0.15;

  invisibleB=createSprite(200,200,20,20);
  invisibleB.shapeColor="red";
  invisibleB.visible=false;

  road=createSprite(width/2,height/2);
  road.addImage("path",roadImg);
  road.scale=0.6;

  gameOver=createSprite(width/2,height/2-100,20,20);
  gameOver.addImage("gameIsOver",gameOverImg);
  gameOver.scale=0.7;
  gameOver.visible=false;

  restar=createSprite(width/2,gameOver.y+70,20,20);
  restar.addImage("restartt",restarImg);
  restar.scale=0.7;
  restar.visible=false;
  

  //Collider of Sahil
  Sahil.setCollider("circle",0,-590,40);
  //Sahil.debug=true;

  //Collider of ghost
  enemy.setCollider("circle",0,-300.10);
  //enemy.debug=true;

  obstacle1G=createGroup();
  obstacle2G=createGroup();
  obstacle3G=createGroup();

}

function draw() {
  background("black");

  console.log(enemy.y);
  
  Sahil.depth=road.depth;
  Sahil.depth=Sahil.depth+1;

  enemy.depth=road.depth;
  enemy.depth=enemy.depth+1;
  

  if (gameState===PLAY){

    //Increasing the score over time
    distance=distance + Math.round(getFrameRate()/60);
    
    road.velocityY=(4+1*distance/90);

    //Making Sahil move with arrow keys
    if (keyWentDown("right")&&Sahil.x==width/2){
      Sahil.x=Sahil.x*1.5;
      enemy.x=enemy.x*1.5;
      invisibleB.shapeColor="blue";
    }
    if (keyWentDown("left")&&Sahil.x==width/2){
      Sahil.x=Sahil.x/2;
      enemy.x=enemy.x/2;
      invisibleB.shapeColor="green";
    }
    if (keyWentDown("left")&&invisibleB.shapeColor=="blue"){
      Sahil.x=Sahil.x/1.5;
      enemy.x=enemy.x/1.5;
    }
    if (keyWentDown("right")&&invisibleB.shapeColor=="green"){
      Sahil.x=Sahil.x*2;
      enemy.x=enemy.x*2;
    }

    //Making scenery infinite
    if (road.y>=400){
      road.y=height/4.8;
    }

    //Making obstacle's position random
    rand = Math.round(random(1,3));
    if (frameCount%120===0){
      if (rand==1){
        obstacle1();
      } else if(rand==2){
        obstacle2();
      }else if (rand==3){
        obstacle3();
      }
    }

    //trigger point
    if (Sahil.isTouching(obstacle1G)){
      obstacle1G.destroyEach();
      gameState=END;
    }
    if (Sahil.isTouching(obstacle2G)){
      obstacle2G.destroyEach();
      gameState=END;
    }
    if (Sahil.isTouching(obstacle3G)){
      obstacle3G.destroyEach();
      gameState=END;
    }

  }

  if (gameState===END){
    
    //Makiing the objects immortal
    obstacle1G.setLifetimeEach(-1);
    obstacle2G.setLifetimeEach(-1);
    obstacle3G.setLifetimeEach(-1);

    //Stopping the objects from moving
    road.velocityY=0;
    obstacle1G.setVelocityEach(0,0);
    obstacle2G.setVelocityEach(0,0);
    obstacle3G.setVelocityEach(0,0);

    enemy.velocityY=-4;

    //Changing the animation of Sahil
    Sahil.changeAnimation("ded",Sahil_Over);

    gameOver.visible=true;
    restar.visible=true;

   //Making the ghost take Sahil
   if (enemy.isTouching(Sahil)){
      Sahil.visible=false;
      enemy.velocityY=0;
    }

    //Calling restart function
    if (Sahil.visible==false&&mousePressedOver(restar)){
      restart();

    }

    
  }
  

 
  drawSprites();
  
  //Displaying text
  textSize(20);
  fill("blue");
  stroke("blue");
  text("Distance traveled:"+distance,width-450,height-550);

}

function obstacle1(){
  
  obstacles1=createSprite(width/4,height-600,20,20);
  obstacles1.addAnimation("something",obstacles1Img);
  obstacles1.velocityY=(4+1*distance/90);
  obstacles1.lifetime=170;
  obstacles1.scale=0.2;
  obstacle1G.add(obstacles1);

}

function obstacle2(){

  obstacles2=createSprite(width/2,height-600,20,20);
  obstacles2.addAnimation("nothing",obstacles2Img);
  obstacles2.velocityY=(4+1*distance/90);
  obstacles2.lifetime=170;
  obstacles2.scale=0.2;
  obstacle2G.add(obstacles2);

}

function obstacle3(){

  obstacles3=createSprite(width/1.3,height-600,20,20);
  obstacles3.addAnimation("whating",obstacles3Img);
  obstacles3.velocityY=(4+1*distance/90);
  obstacles3.lifetime=170;
  obstacles3.scale=0.2;
  obstacle3G.add(obstacles3);
}

function restart(){

  gameState=PLAY;

  Sahil.visible=true;

  obstacle1G.setLifetimeEach(170);
  obstacle2G.setLifetimeEach(170);
  obstacle3G.setLifetimeEach(170);

  road.velocityY=(4+1*distance/90);

  Sahil.changeAnimation("Running",SahilImg);

  gameOver.visible=false;
  restar.visible=false;

  Sahil.x=width/2;
  enemy.x=width/2;
  enemy.y=Sahil.y+150;

  distance=0;
}