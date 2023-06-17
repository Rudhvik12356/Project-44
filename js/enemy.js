class Enemy {
  constructor(x, y, w, h, enemyPos) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    var options = {
      restitution: 0.2
    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.image = loadImage("assets/enemy.png");
    this.w = w;
    this.h = h;
    this.enemyPos = enemyPos;
    World.add(world, this.body);
  }

  remove(i) {
    setTimeout(() => {
      World.remove(world, this.body);
      delete enemies[i];
    }, 2000);
  }

  show() {

    push();
    imageMode(CENTER);
    image(this.image, 1100, this.enemyPos, this.w, this.h);
    pop();
  }
}