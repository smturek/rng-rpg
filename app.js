var RngRpg = RngRpg || {};

RngRpg.game = new Phaser.Game(1248, 640, Phaser.AUTO);

RngRpg.game.state.add('GameState', RngRpg.GameState);
RngRpg.game.state.start('GameState');
