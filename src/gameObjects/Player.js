class Player extends Phaser.Physics.Arcade.Sprite {
    velocityIncrement = 0; // was 50
    velocityMax = 400; // was 500
    drag = 0; // was 1000
    fireRate = 10; // was 10
    fireCounter = 0;
    health = 1;
    moveDirection = new Phaser.Math.Vector2(0, 0);

    constructor(scene, x, y, shipId) {
        super(scene, x, y, ASSETS.spritesheet.ships.key, shipId);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true); // prevent ship from leaving the screen
        this.setDepth(100); // make ship appear on top of other game objects
        this.scene = scene;
        this.setMaxVelocity(this.velocityMax); // limit maximum speed of ship
        this.setDrag(this.drag);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.fireCounter > 0) this.fireCounter--;

        this.checkInputV2();
    }

    checkInputV1() {
        const cursors = this.scene.cursors; // get cursors object from Game scene
        const leftKey = cursors.left.isDown;
        const rightKey = cursors.right.isDown;
        const upKey = cursors.up.isDown;
        const downKey = cursors.down.isDown;
        const spaceKey = cursors.space.isDown;

        const moveDirection = { x: 0, y: 0 }; // default move direction

        if (leftKey) moveDirection.x--;
        if (rightKey) moveDirection.x++;
        if (upKey) moveDirection.y--;
        if (downKey) moveDirection.y++;

        if (leftKey) this.moveDirection.x = -1;
        if (rightKey) this.moveDirection.x = +1;
        if (upKey) this.moveDirection.y = -1;
        if (downKey) this.moveDirection.y = +1;
        if (spaceKey) this.fire();

        this.body.velocity.x += moveDirection.x * this.velocityIncrement; // increase horizontal velocity
        this.body.velocity.y += moveDirection.y * this.velocityIncrement; // increase vertical velocity
    }

    checkInputV2() {
        const cursors = this.scene.cursors; // get cursors object from Game scene
        const leftKey = cursors.left.isDown;
        const rightKey = cursors.right.isDown;
        const upKey = cursors.up.isDown;
        const downKey = cursors.down.isDown;

        this.moveDirection.set(0, 0);
        if (leftKey) this.moveDirection.x = -1;
        if (rightKey) this.moveDirection.x = +1;
        if (upKey) this.moveDirection.y = -1;
        if (downKey) this.moveDirection.y = +1;
        this.moveDirection.normalize();

        this.body.setVelocity(
            this.moveDirection.x * this.velocityMax,
            this.moveDirection.y * this.velocityMax,
        );

        const spaceKey = cursors.space.isDown;

        if (spaceKey) this.fire();
    }

    fire() {
        if (this.fireCounter > 0) return;

        this.fireCounter = this.fireRate;

        this.scene.fireBullet(this.x, this.y);
    }

    hit(damage) {
        this.health -= damage;

        if (this.health <= 0) this.die();
    }

    die() {
        this.scene.addExplosion(this.x, this.y);
        this.destroy(); // destroy sprite so it is no longer updated
    }
}
