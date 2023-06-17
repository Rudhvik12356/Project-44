const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
var scene, enemy, ground, tank, bullet;
var sceneImage, angle, score, enemyImage;
var bullets = [];

function preload() {
  sceneImage = loadImage("assets/background.png");
  enemyImage = loadImage("assets/enemy.png");
}

function setup() {
  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(600, 600, 1200, 1, options);
  World.add(world, ground);

  tank = new Tank(270, 500, 400, 250, angle);
  bullet = new Bullet(tank.x + 100, tank.y);

  score = 0;
  rectMode(CENTER);
}

function draw() {
  background(sceneImage);
  image(sceneImage, 0, 0, width, height);
  Engine.update(engine);

  push();
  rect(ground.position.x, ground.position.y, 1200, 1);
  pop();

  tank.show();
  bullet.show();

  spawnEnemy();

  if (keyCode === 32) {
    bullet.shoot();
  }

  for (var i = 0; i < bullets.length; i++) {
    showBullets(bullets[i], i);
  }

  drawSprites();
}

function keyPressed() {
  if (keyCode === 32) {
    bullet = new Bullet(tank.x + 100, tank.y);
    bullets.push(bullet);
  }
}

function showBullets(bullet, i) {
  if (bullet) {
    bullet.show();
  }
}

function keyReleased() {
  if (keyCode === 32) {
    bullets[bullets.length - 1].shoot();
    enemy.destroy();
  }
}

function spawnEnemy() {
  if (frameCount % 100 === 0) {
    enemy = createSprite(1000, random(500, 550), 100, 100);
    enemy.addImage("enemy", enemyImage);
    enemy.scale = 0.2;
    enemy.velocityX = -5;
  }
}
