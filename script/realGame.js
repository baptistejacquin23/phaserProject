let config = {
    type: Phaser.Physics.Arcade,
    height: window.innerHeight,
    width: window.innerWidth,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};
let game = new Phaser.Game(config);
let paddle;
let cursors;


function preload() {
    this.load.image('paddle', 'assets/mexico.png');
}

function create() {
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
    cursors = this.input.keyboard.createCursorKeys();
    paddle = this.physics.add.sprite(window.innerWidth - (window.innerWidth / 2), window.innerHeight - 10, "paddle");
    paddle.enableBody = true;
    paddle.body.immovable = true;
    paddle.body.collideWorldBounds = true;

}

function update() {
    if (cursors.left.isDown) {
        paddle.body.velocity.x = -800;
    } else if (cursors.right.isDown ) {
        paddle.body.velocity.x = 800;
    } else {
        paddle.body.velocity.x = 0;
    }

}
