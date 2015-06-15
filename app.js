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
    var level = [];   //access specific coord -> level[y coord][x coord]
    var levelRow = [];

    var numberOfRooms = 3;
    var rooms = [];


    //creates a level of pure walls
    for(var i = 0; i < 20; i++) {
        for(var j = 0; j < 40; j++) {
            levelRow.push(1);
        }
        level.push(levelRow);
        levelRow = [];
    }

    //creates a seed array for the rooms
    for(var i = 0; i < numberOfRooms; i++) {
        //rooms[i][1] == y coord, rooms[i][0] == x coord
        rooms.push([getRandom(1, 37), getRandom(1, 19)]);
    }

    for(var i = 0; i < rooms.length; i++) {
        //carves out seed for room
        level[rooms[i][1]][rooms[i][0]] = 0;

        //carves out a 3x3 room with seed at center
        level[rooms[i][1] - 1][rooms[i][0]] = 0;
        level[rooms[i][1] + 1][rooms[i][0]] = 0;
        level[rooms[i][1]][rooms[i][0] - 1] = 0;
        level[rooms[i][1]][rooms[i][0] + 1] = 0;
        level[rooms[i][1] + 1][rooms[i][0] + 1] = 0;
        level[rooms[i][1] + 1][rooms[i][0] - 1] = 0;
        level[rooms[i][1] - 1][rooms[i][0] + 1] = 0;
        level[rooms[i][1] - 1][rooms[i][0] - 1] = 0;

        //carves out a hallway that connects rooms that are next to each other in the rooms array
        //skips the first room in the array and then compares all the following rooms to the one that comes before it
        if(i !== 0) {
            var yDifference;
            var xDifference;
            var xMagnitude;
            //carves out a vertical path from lower room to the y of the higher room's seed
            //greater y values = lower on the screen
            //if the room itself is lower
            if(rooms[i][1] > rooms[i - 1][1]) {
                yDifference = rooms[i][1] - rooms[i - 1][1];
                for(var j = 0; j <= yDifference; j++) {
                    level[rooms[i][1] - j][rooms[i][0]] = 0;
                }
                //carves out a horizontal path from the higher room to the path coming out of the lower room
                //greater x values = further right on the screen
                xDifference = rooms[i - 1][0] - rooms[i][0];

                if(xDifference < 0) {
                    xMagnitude = xDifference * -1;
                }
                else {
                    xMagnitude = xDifference;
                }

                for(var j = 0; j <= xMagnitude; j++) {
                    if(xDifference < 0) {
                        level[rooms[i - 1][1]][rooms[i - 1][0] + j] = 0;
                    }
                    else {
                        level[rooms[i - 1][1]][rooms[i - 1][0] - j] = 0;
                    }
                }
            }
            //if the room before it is lower
            else {
                yDifference = rooms[i - 1][1] - rooms[i][1];
                for(var j = 0; j <= yDifference; j++) {
                    level[rooms[i - 1][1] - j][rooms[i - 1][0]] = 0;
                }
                //carves out a horizontal path from the higher room to the path coming out of the lower room
                //greater x values = further right on the screen
                xDifference = rooms[i][0] - rooms[i - 1][0];

                if(xDifference < 0) {
                    xMagnitude = xDifference * -1;
                }
                else {
                    xMagnitude = xDifference;
                }

                for(var j = 0; j <= xMagnitude; j++) {
                    if(xDifference < 0) {
                        level[rooms[i][1]][rooms[i][0] + j] = 0;
                    }
                    else {
                        level[rooms[i][1]][rooms[i][0] - j] = 0;
                    }
                }
            }
        }
    }

    //puts player in the middle of the first room
    player.x = rooms[0][0] * 32;
    player.y = rooms[0][1] * 32;

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
