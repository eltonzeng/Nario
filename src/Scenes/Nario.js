class Nario extends Phaser.Scene {
    constructor() {
        super("Nario");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 300;
        this.DRAG = 400;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
        this.scrollSpeed = 2;
        this.coinCount = 0;
    }
    
    preload() {
        this.load.setPath("./assets/");
        this.load.audio('coinSound', 'impactPlate_medium_003.ogg');
    }
    
    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("platformer-level-1", 16, 16, 120, 60);
    
        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");
    
        // Create a layer
        this.groundLayer = this.map.createLayer("Ground and Platforms", this.tileset, 0, 0);
    
        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });
        this.load.audio('coinSound', 'impactPlate_medium_003.ogg');
        this.coinSound = this.sound.add('coinSound');
    
        // create objects coin and powerup (mushroom)
        
        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.flagPole, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.flag, Phaser.Physics.Arcade.STATIC_BODY);
    
        // Create a Phaser group out of the array this.coins
        // This will be used for collision detection below.
        this.coinGroup = this.add.group(this.coins);
        this.flagGroup = this.add.group(this.flagPole, this.flag);
    
        // set up player avatar
        my.sprite.player = this.physics.add.sprite(30, 345, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);
    
        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);
    
        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            this.coinSound.play();
            obj2.destroy(); // remove coin on overlap
            this.coinCount++; // increment coin counter
        });
    
        this.physics.add.overlap(my.sprite.player, this.flagGroup, (obj1, obj2) => {
            this.scene.start("endScene", { coinCount: this.coinCount });
        });
    
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
    
        this.rKey = this.input.keyboard.addKey('R');
    
        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);
    
        // TODO: Add movement vfx here
        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['flare_01.png'],
            // TODO: Try: add random: true
            scale: {start: 0.03, end: 0.1},
            // TODO: Try: maxAliveParticles: 8,
            lifespan: 350,
            // TODO: Try: gravityY: -400,
            alpha: {start: 1, end: 0.1}, 
        });
    
        my.vfx.walking.stop();
    
        // TODO: add camera code here
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25, -500, 0); // (target, [,roundPixels][,lerpX][,lerpY])
        // this.cameras.main.setFollowOffset(0, -100);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);
    
    }
    
    update() {
    
        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);
    
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
    
            // Only play smoke effect if touching the ground
    
            if (my.sprite.player.body.blocked.down) {
    
                my.vfx.walking.start();
    
            }
        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);
    
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
    
            // Only play smoke effect if touching the ground
    
            if (my.sprite.player.body.blocked.down) {
    
                my.vfx.walking.start();
    
            }
    
        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            // TODO: have the vfx stop playing
            my.vfx.walking.stop();
        }
    
        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }
    
        if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }
    }
    
}

