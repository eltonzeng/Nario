class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        this.load.atlas("mario_and_goombas", "mario_and_goombas.png", "mario_and_goombas.json");
        this.load.atlas("marios", "marios.png", "marios.json");
        this.load.audio('coinSound', 'Mario-coin-sound.mp3');

        // Load tilemap information
        this.load.image("tilemap_tiles", "NES - Super Mario Bros - Tileset (1).png");                         // Packed tilemap
        this.load.tilemapTiledJSON("Nario_1-1", "NarioWorld.tmj");   // Tilemap in JSON

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "NES - Super Mario Bros - Tileset (1).png", {
            frameWidth: 16,
            frameHeight: 16
        });
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'marios', frame: 'mario_run1.png' },
                { key: 'marios', frame: 'mario_run2.png' }
            ],
            frameRate: 10,  // Adjust the frame rate as needed
            repeat: -1      // Loop the animation indefinitely
        });

        this.anims.create({
            key: 'walk_B',
            frames: [
                { key: 'marios', frame: 'b_mario_run1.png' },
                { key: 'marios', frame: 'b_mario_run2.png' }
            ],
            frameRate: 10,  // Adjust the frame rate as needed
            repeat: -1      // Loop the animation indefinitely
        });

        this.anims.create({
            key: 'turn',
            defaultTextureKey: "mario_and_goombas",
            frames: [
                { frame: "mario_turn.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'turn_b',
            defaultTextureKey: "mario_and_goombas",
            frames: [
                { frame: "b_mario_turn.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "marios",
            frames: [
                { frame: "mario_idle.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'idle_b',
            defaultTextureKey: "marios",
            frames: [
                { frame: "b_mario_idle.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "marios",
            frames: [
                { frame: "mario_jump.png" }
            ],
        });

        this.anims.create({
            key: 'jump_b',
            defaultTextureKey: "marios",
            frames: [
                { frame: "b_mario_jump.png" }
            ],
        });

        this.anims.create({
            key: 'collide',
            defaultTextureKey: "marios",
            frames: [
                { frame: "mario_collide.png" }
            ],
        });

        this.anims.create({
            key: 'collide_b',
            defaultTextureKey: "marios",
            frames: [
                { frame: "b_mario_collide.png" }
            ],
        });

        this.anims.create({
            key: 'death',
            defaultTextureKey: "mario_and_goombas",
            frames: [
                { frame: "mario_death.png" }
            ],
        });

         // ...and pass to the next Scene
         this.scene.start("NarioScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}