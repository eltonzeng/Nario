class Nario extends Phaser.Scene {
    constructor() {
        super("NarioScene");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 100;
        this.DRAG = 100;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 700;
        this.JUMP_VELOCITY = -310;
        this.SCALE = 3;
        this.scrollSpeed = 2;
        this.coinCount = 0;
        this.powerUp = false;
        this.useDamping = true;
    }
    
    preload() {
        this.load.setPath("./assets/");
        this.load.audio('theme', 'ground_theme.mp3');
        this.load.audio('flagpole', 'smb_flagpole.wav');
        this.load.audio('jump', 'smb_jump-small.wav');
        this.load.audio('jump_s', 'smb_jump-super.wav');
        this.load.audio('stage_clear', 'smb_stage_clear.wav');
        this.load.audio('stomp', 'smb_stomp.wav');
        this.load.audio('die', 'smb_mariodie.wav');
        this.load.audio('coinSound', 'Mario-coin-sound.mp3');
    }
    create() {
        // Create a new tilemap game object which uses 16x16 pixel tiles, and is
        // 120 tiles wide and 30 tiles tall.

        this.map = this.add.tilemap("Nario_1-1", 16, 16, 210, 16);
    
        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("NES - Super Mario Bros - Tileset (1)", "tilemap_tiles");
    
        // Create a layer
        this.skyLayer = this.map.createLayer("Sky", this.tileset, 0, 0);
        this.treelayer = this.map.createLayer("Trees-n-Clouds", this.tileset, 0, 0)
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
    
        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        this.coinSound = this.sound.add('coinSound');
    
        // create objects coin and powerup (mushroom)
        this.coins = this.map.createFromObjects("Flag-n-Items", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 57
        });

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
    
        // Create a Phaser group out of the array this.coins
        // This will be used for collision detection below.
        this.coinGroup = this.add.group(this.coins);
    
        // set up player avatar
        my.sprite.player = this.physics.add.sprite(0, -100, "marios", "mario_idle.png");
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setScale(.125);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // set physics world properties
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.physics.world.TILE_BIAS = 26  // increase to prevent sprite tunneling through tiles

        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            this.coinSound.play();
            obj2.destroy(); // remove coin on overlap
        });
    
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // TODO: add camera code here
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        // this.cameras.main.setFollowOffset(0, -100);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

        // music and sfx
        this.theme = this.sound.add('theme');
        this.flagpole = this.sound.add('flagpole');
        this.jump = this.sound.add('jump');
        this.jump_s = this.sound.add('jump_s');
        this.stage_clear = this.sound.add('stage_clear');
        this.stomp = this.sound.add('stomp');
        this.die = this.sound.add('die');
        this.theme.play();
    }
    
    update() {
    
        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.setFlipX(true);
            my.sprite.player.anims.play('walk', true);
    
        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(false);
            my.sprite.player.anims.play('walk', true);
    
        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
        }
    
        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
            this.jump.play();

        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }
    
    }
    
}

