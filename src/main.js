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
    height: 1080,
    scene: [Start, Load, Endscreen, Nario]
}

const game = new Phaser.Game(config);