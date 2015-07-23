var RngRpg = RngRpg || {};

RngRpg.game = new Phaser.Game(1248, 640, Phaser.AUTO);

RngRpg.game.state.add('Boot', RngRpg.BootState);
RngRpg.game.state.add('Game', RngRpg.GameState);
RngRpg.game.state.add('Menu', RngRpg.MenuState);
RngRpg.game.state.add('Preload', RngRpg.PreloadState);

RngRpg.game.state.start('Boot');
