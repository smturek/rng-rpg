var RngRpg = RngRpg || {};

RngRpg.GameState = {
    init: function() {

    },
    create: function() {
        this.walls = this.game.add.group();
        this.walls.enableBody = true;

        this.floors = this.game.add.group();

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds= true;

        this.exit = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'exit');
        this.game.physics.arcade.enable(this.exit);

        this.monster = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'enemy');
        this.game.physics.arcade.enable(this.monster);

        this.battle = new RngRpg.Battle(this.game);

        this.renderLevel(this.generateLevel());
    },
    update: function() {
        //collision groups
        this.game.physics.arcade.collide(this.player, this.walls);
        this.game.physics.arcade.overlap(this.player, this.exit, this.nextLevel, null, this);
        this.game.physics.arcade.overlap(this.player, this.monster, this.prepBattle, null, this);

        //controls for player
        if(!this.noMovement) {
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.player.body.velocity.x = -175;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.player.body.velocity.x = 175;
            }
            else {
                this.player.body.velocity.x = 0;
            }

            if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.player.body.velocity.y = -175;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                this.player.body.velocity.y = 175;
            }
            else {
                this.player.body.velocity.y = 0;
            }
        }
    },
    getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    generateLevel: function() {
        this.level = [];   //access specific coord -> level[y coord][x coord]
        var levelRow = [];

        var numberOfRooms = 15;
        var rooms = [];


        //creates a level of pure walls
        for(var i = 0; i < 20; i++) {
            for(var j = 0; j < 40; j++) {
                levelRow.push(1);
            }
            this.level.push(levelRow);
            levelRow = [];
        }

        //creates a seed array for the rooms
        for(var i = 0; i < numberOfRooms; i++) {
            //rooms[i][1] == y coord, rooms[i][0] == x coord
            rooms.push([this.getRandom(1, 37), this.getRandom(1, 19)]);
        }

        for(var i = 0; i < rooms.length; i++) {
            //carves out seed for room
            this.level[rooms[i][1]][rooms[i][0]] = 0;

            //carves out a 3x3 room with seed at center
            this.level[rooms[i][1] - 1][rooms[i][0]] = 0;
            this.level[rooms[i][1] + 1][rooms[i][0]] = 0;
            this.level[rooms[i][1]][rooms[i][0] - 1] = 0;
            this.level[rooms[i][1]][rooms[i][0] + 1] = 0;
            this.level[rooms[i][1] + 1][rooms[i][0] + 1] = 0;
            this.level[rooms[i][1] + 1][rooms[i][0] - 1] = 0;
            this.level[rooms[i][1] - 1][rooms[i][0] + 1] = 0;
            this.level[rooms[i][1] - 1][rooms[i][0] - 1] = 0;

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
                        this.level[rooms[i][1] - j][rooms[i][0]] = 0;
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
                            this.level[rooms[i - 1][1]][rooms[i - 1][0] + j] = 0;
                        }
                        else {
                            this.level[rooms[i - 1][1]][rooms[i - 1][0] - j] = 0;
                        }
                    }
                }
                //if the room before it is lower
                else {
                    yDifference = rooms[i - 1][1] - rooms[i][1];
                    for(var j = 0; j <= yDifference; j++) {
                        this.level[rooms[i - 1][1] - j][rooms[i - 1][0]] = 0;
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
                            this.level[rooms[i][1]][rooms[i][0] + j] = 0;
                        }
                        else {
                            this.level[rooms[i][1]][rooms[i][0] - j] = 0;
                        }
                    }
                }
            }
        }

        //puts player in the middle of the first room
        this.player.x = rooms[0][0] * 32;
        this.player.y = rooms[0][1] * 32;

        //puts exit in the middle of the last room
        this.exit.x = rooms[rooms.length - 1][0] * 32;
        this.exit.y = rooms[rooms.length - 1][1] * 32;

        //puts exit in the middle of the penultimate room
        this.monster.x = rooms[rooms.length - 2][0] * 32;
        this.monster.y = rooms[rooms.length - 2][1] * 32;


        return this.level;
    },
    renderLevel: function(level) {
        for(var i = 0; i < level.length; i++) {
            var y = i * 32;
            var wall;
            var floor;
            for(var j = 0; j < level[i].length; j++) {
                var x = j * 32;
                //creates a block for each level or wall in the level array at x,y coords
                if(level[i][j] == 1) {
                      wall = this.walls.create(x, y, 'wall');
                      wall.body.immovable = true;
                }
                else if(level[i][j] == 0) {
                      floor = this.floors.create(x, y, 'floor');
                }
            }
        }
    },
    nextLevel: function() {
        this.walls.callAll('kill');
        this.walls.removeChildren();
        this.floors.removeChildren();
        this.renderLevel(this.generateLevel());
    },
    prepBattle: function() {
        //stop the player and prevent any further movement
        this.noMovement = true;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        this.battle.startBattle();
    }
};
