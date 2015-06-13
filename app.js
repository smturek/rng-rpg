var game = new Phaser.Game(1248, 640, Phaser.AUTO, 'game',
  { preload: preload, create: create, update: update });

var player;

function preload() {
    game.load.image('player', 'assets/player.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('floor', 'assets/floor.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(0, 0, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds= true;
}

function update() {
    if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        player.body.velocity.x = -175;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        player.body.velocity.x = 175;
    }
    else {
        player.body.velocity.x = 0;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        player.body.velocity.y = -175;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        player.body.velocity.y = 175;
    }
    else {
        player.body.velocity.y = 0;
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
