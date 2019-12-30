var config = {
    type: Phaser.AUTO,
    width: 240,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Example2, Example1]
};

var game = new Phaser.Game(config);