class Start extends Phaser.Scene {
    contructor() {
        super("startScene");
    }

    create() {
        // Add end game message
        this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2 - 50, 
            'Welcome to Super Nario Bros! Press any key to start.', 
            { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }
        ).setOrigin(0.5);

        // Display high score
        this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2, 
            `Coin Count: ${this.coinCount}`, 
            { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }
        ).setOrigin(0.5);
    }
}