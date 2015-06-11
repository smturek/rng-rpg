var game = new Phaser.Game(1248, 640, Phaser.AUTO, 'game',
  { preload: preload, create: create, update: update });

var player;
var map = [];
var wallTiles = [];
var floorTiles = [];

var room_max_size = 4;
var room_min_size = 2;
var max_rooms = 7;


function preload() {
    game.load.image('player', 'assets/player.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('floor', 'assets/floor.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.keyboard = game.input.keyboard;

    makeMap(map);
    renderMap(map);

    player = game.add.sprite(0, 0, 'player');
    game.physics.arcade.enable(player);
}

function update() {
    for(var i = 0; i < wallTiles.length; i++) {
        for(var j = 0; j < floorTiles.length; j++) {
            if(game.physics.arcade.overlap(wallTiles[i], floorTiles[j])) {
                wallTiles.splice(i, 1);
            }
        }
    }

    for(var i = 0; i < wallTiles.length; i++) {
        game.physics.arcade.collide(this.wallTiles[i], player);
    }

    if(this.keyboard.isDown(Phaser.Keyboard.A)) {
        player.body.velocity.x = -175;
    }
    else if (this.keyboard.isDown(Phaser.Keyboard.D)) {
        player.body.velocity.x = 175;
    }
    else {
        player.body.velocity.x = 0;
    }

    if(this.keyboard.isDown(Phaser.Keyboard.W)) {
        player.body.velocity.y = -175;
    }
    else if (this.keyboard.isDown(Phaser.Keyboard.S)) {
        player.body.velocity.y = 175;
    }
    else {
        player.body.velocity.y = 0;
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Tile(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.object;
}

function Room(x, y, w, h) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + w;
    this.y2 = y + h;

    this.centerCoords = [];
    centerX = (this.x1 + this.x2) / 2;
    centerY = (this.y1 + this.y2) / 2;
    this.centerCoords.push(centerX);
    this.centerCoords.push(centerY);
}

function createRoom(room) {
    for(var x = room.x1; x < room.x2; x+=32) {
        for(var y = room.y1; y < room.y2; y+=32) {
            this.map.push(new this.Tile(x, y, false, false, 'floor'));
        }
    }
}

function createHorizontalTunnel(x1, x2, y) {
    this.min = Math.min(x1, x2);
    this.max = Math.min(x1, x2);
    for(var x = this.min; x < this.max + 32; x+=32) {
        this.map.push(new this.Tile(x, y, false, false, 'floor'));
    }
}

function createVerticalTunnel(y1, y2, x) {
    this.min = Math.min(y1, y2);
    this.max = Math.min(y1, y2);
    for(var y = this.min; y < this.max + 32; y+=32) {
        this.map.push(new this.Tile(x, y, false, false, 'floor'));
    }
}

function makeMap(map) {
    for(var y = 0; y < game.world.height; y+=16) {
        for( var x = 0; x < game.world.width; x+=16) {
            map.push(new this.Tile(x, y, true, true, 'wall'));
        }
    }

    this.rooms = [];
    this.numRooms = 0;

    for(var rooms = 0; rooms < this.max_rooms; rooms++) {
        w = this.getRandom(this.room_min_size, this.room_max_size) * 32;
        h = this.getRandom(this.room_min_size, this.room_max_size) * 32;

        x = this.getRandom(1, ((game.world.width) / 32) - (w/32 + 1)) * 32;
        y = this.getRandom(1, ((game.world.width) / 32) - (h/32 + 1)) * 32;

        this.newRoom = new Room(x, y, w, h);

        createRoom(this.new_room);

        if(this.numRooms == 0) {
            this.playerX = this.newRoom.centerCoords[0];
            this.playerY = this.newRoom.centerCoords[1];

            this.player.x = this.playerX;
            this.player.y = this.playerY;
        }
        else {
            this.newX = this.newRoom.centerCoords[0] - 16;
            this.newY = this.newRoom.centerCoords[1] - 16;

            this.prevX = this.rooms[this.numRooms - 1].centerCoords[0] - 16;
            this.prevY = this.rooms[this.numRooms - 1].centerCoords[1] - 16;

            this.createHorizontalTunnel(this.prevX, this.newX, this.prevY);
            this.createVerticalTunnel(this.prevY, this.newY, this.newX);
        }

        this.rooms.push(this.new_room);
        this.numRooms += 1;
    }
}

function renderMap(map) {
    for(var i = 0; i < map.length; i++) {
        if(map[i].image == 'floor') {
            this.floortile = game.add.sprite(map[i].x, map[i].y, map[i].image);
            game.physics.enable(this.floortile, Phaser.Physics.ARCADE);
            this.floortile.body.immovable = true;
            this.floorTiles.pish(this.floortile);
        }
        else if(map[i].image == 'wall') {
            this.walltile = game.add.sprite(map[i].x, map[i].y, map[i].image);
            game.physics.enable(this.walltile, Phaser.Physics.ARCADE);
            this.walltile.body.immovable = true;
            this.wallTiles.push(this.walltile);
        }
    }
}
