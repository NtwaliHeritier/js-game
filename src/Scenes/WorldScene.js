import 'phaser';

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('World');
    this.score = 0;
  }

  preload() {
    // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');

    this.load.image('star', 'assets/star.png');
    this.load.image('zombie', 'assets/zombie-png.png');

    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    this.cameras.main.setZoom(2);
    // create the map
    const map = this.make.tilemap({ key: 'map' });

    // first parameter is the name of the tilemap in tiled
    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    // creating the layers
    map.createStaticLayer('Map', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(100, 200, 'player', 6);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
      frameRate: 10,
      repeat: -1,
    });
    this.physics.add.collider(this.player, obstacles);

    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 20; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
      const enemy = this.physics.add.sprite(x, y, 'zombie', 1);
      this.spawns.add(enemy);
    }
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

    // stars
    this.stars = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 20; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

      const star = this.physics.add.image(x, y, 'star');
      this.stars.add(star);
    }

    // collide
    this.physics.add.collider(this.stars, map);

    // overlap
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
  }

  update() {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }

  onMeetEnemy(player, zone) {
    this.sys.game.globals.score = this.score;
    this.scene.start('GameOver');
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
    const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    const mystar = this.physics.add.image(x, y, 'star');
    this.stars.add(mystar);

    const v = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    const w = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    const myzombie = this.physics.add.image(v, w, 'zombie');
    this.spawns.add(myzombie);
  }
}