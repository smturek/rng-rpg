var game = new Phaser.Game(1248, 640, Phaser.AUTO, 'game',
  { preload: preload, create: create, update: update });

var player;
var walls;
var floors;

function preload() {
    game.load.image('player', 'assets/player.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('floor', 'assets/floor.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    walls = game.add.group();
    walls.enableBody = true;

    floors = game.add.group();

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds= true;

    renderLevel(generateLevel());
}

function update() {
    //collision groups
    game.physics.arcade.collide(player, walls);

    //controls for player
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

function generateLevel() {
    var level = [];
    var levelRow = [];

    //generates a row within the level and pushes it into the level array
    //generates a 1 for a wall and a 0 for a floor
    for(var i = 0; i < 20; i++) {

        if(i <= 7 || i >= 12) {
            for(var j = 0; j < 40; j++) {
                levelRow.push(1);
            }
        }

        if(i > 7 && i < 12) {
            levelRow.push(1);
            for(var j = 0; j < 37; j++) {
                levelRow.push(0);
            }
            levelRow.push(1);
        }

        level.push(levelRow);
        levelRow = [];
    }
    console.log(level);
    return level;
}

function renderLevel(level) {
    for(var i = 0; i < level.length; i++) {
        var y = i * 32;
        var wall;
        var floor;
        for(var j = 0; j < level[i].length; j++) {
            var x = j * 32;
            //creates a block for each level or wall in the level array at x,y coords
            if(level[i][j] == 1) {
                  wall = walls.create(x, y, 'wall');
                  wall.body.immovable = true;
            }
            else if(level[i][j] == 0) {
                  floor = floors.create(x, y, 'floor');
            }
        }
    }
}
