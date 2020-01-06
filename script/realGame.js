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
let score = 0;
let scoreText;
let bestScore = 0;
let bestScoreText;
let WallText;
let pause_label;


function preload() {
    this.load.image('paddle', 'assets/mexico.png');
    this.load.image('ball', 'assets/trump.png');
    this.load.image('brick', 'assets/wall.png');
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

    this.bricks = this.add.group();

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 4; j++) {
            let brick = this.physics.add.sprite((window.innerWidth - window.innerWidth + 50) + i * 70, 100 + j * 35, 'brick');

            brick.body.immovable = true;

            if (brick.body.x > window.innerWidth) {
                brick.destroy();
            } else {
                this.bricks.add(brick);
            }
        }
    }

    scoreText = this.add.text(window.innerWidth - (window.innerWidth - 20), 46, 'Score: ' + score, {fontSize: '28px', fill: '#000'});
    bestScoreText = this.add.text(window.innerWidth - (window.innerWidth - 20), 16, 'Best: ' + bestScore, {fontSize: '28px', fill: '#000'});
    WallText = this.add.text((window.innerWidth - window.innerWidth / 2 - 120), 400, 'Break that Wall: ', {fontSize: '28px', fill: '#000'});
    pause_label = this.add.text(window.innerWidth - 100, 20, 'Pause', {font: '24px Arial', fill: '#000'}).setInteractive();

    pause_label.on('pointerdown', function () {
        if (ball.pause === true) {
            ball.body.enable = true;
            ball.pause = false
        } else {
            ball.body.enable = false;
            ball.pause = true;
        }
    });


}

function update() {
    if (cursors.left.isDown && ball.pause === false) {
        paddle.body.velocity.x = (-ballVelocity - 800);
    } else if (cursors.right.isDown && ball.pause === false) {
        paddle.body.velocity.x = (ballVelocity + 800);
    } else {
        paddle.body.velocity.x = 0;
    }

    this.physics.world.collide(paddle, ball);
    this.physics.add.collider(ball, this.bricks, hit, null, this);

    if (this.bricks.getLength() === 0){
        this.scene.restart();
        ballVelocity += 50;
    }
    if (ball.y > paddle.y) {
        this.scene.restart();

        if (score > bestScore) {
            bestScore = score;
        }
        score = 0;
        ballVelocity = 350;
    }
}

function hit(ball, brick) {
    brick.destroy();
    score += 10;
    scoreText.text = 'Score: ' + score;
}
