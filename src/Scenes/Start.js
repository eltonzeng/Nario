class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    create() {
        // Add end game message
        this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2 - 150, 
            'Welcome to Super Nario Bros! Press any key to start.', 
            { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }
        ).setOrigin(0.5);
        this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2 + 300, 
            'Credits: Elton Zeng', 
            { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }
        ).setOrigin(0.5);
    }
}