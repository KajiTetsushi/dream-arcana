const config = {
    type: Phaser.AUTO,
    title: 'Shmup',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: [
        Boot,
        Preloader,
        Start,
        Game,
        GameOver
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NO_CENTER
    },
}

const game = new Phaser.Game(config);
            
