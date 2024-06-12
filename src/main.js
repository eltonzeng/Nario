// Elton Zeng
// Created 6/6/2024

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1920,
    height: 3200,
    scene: [Start, Load, Nario, Endscreen]
}

const game = new Phaser.Game(config);