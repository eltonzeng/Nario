class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    create() {
        // Add start game message
        this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2 - 150, 
            'Welcome to Super Nario Bros! Press any key to start.', 
            { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }
        ).setOrigin(0.5);
        this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2 + 300, 
            'Credits: Elton Zeng (code), The Mushroom Kingdom (sfx), The Spriters Resource (assets)', 
            { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }
        ).setOrigin(0.5);
        // Create an input event listener
        this.input.keyboard.on('keydown', this.startNextScene, this);
    }

    startNextScene() {
        // Start the 'Load' scene
        this.scene.start('loadScene');
    }
}