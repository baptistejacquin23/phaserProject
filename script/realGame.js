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


function preload() {

}

function create() {

}

function update() {

}
