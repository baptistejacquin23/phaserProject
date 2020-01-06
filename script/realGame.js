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
let ball;
let ballVelocity = 350;


function preload() {
    this.load.image('paddle', 'assets/mexico.png');
    this.load.image('ball', 'assets/trump.png');
}

function create() {
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
    cursors = this.input.keyboard.createCursorKeys();
    paddle = this.physics.add.sprite(window.innerWidth - (window.innerWidth / 2), window.innerHeight - 50, "paddle");
    paddle.enableBody = true;
    paddle.body.immovable = true;
    paddle.body.collideWorldBounds = true;

    ball = this.physics.add.sprite((window.innerWidth - window.innerWidth / 2 - 110), (window.innerHeight - window.innerHeight / 2), "ball");
    ball.body.velocity.x = ballVelocity;
    ball.body.velocity.y = ballVelocity;
    ball.pause = false;
    ball.body.bounce.setTo(1);
    ball.body.collideWorldBounds = true;

}

function update() {
    if (cursors.left.isDown && ball.pause === false) {
        paddle.body.velocity.x = (-ballVelocity - 800);
    } else if (cursors.right.isDown && ball.pause === false) {
        paddle.body.velocity.x = (ballVelocity + 800);
    } else {
        paddle.body.velocity.x = 0;
    }

}
