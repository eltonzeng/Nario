class Gameover extends Phaser.Scene {
    constructor() {
        super("gameover_scene");

    }

    init(data) {
        this.coinCount = data.coinCount || 0; // Retrieve the coin count from the passed data
    }

    preload() {
        this.load.audio('gameover', 'smb_gameover.wav');
    }
    create() {
        // Add end game message
        this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2 - 50, 
            'Good Job! You finished the game!', 
            { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }
        ).setOrigin(0.5);

        // Display high score
        this.add.text(
            this.game.config.width / 2, 
            this.game.config.height / 2, 
            `Coin Count: ${this.coinCount}`, 
            { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }
        ).setOrigin(0.5);

        this.gameover = this.sound.add('gameover');
        this.gameover.play();
    }
}