var RngRpg = RngRpg || {};

RngRpg.PreloadState = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(3);

        this.load.setPreloadSprite(this.preloadBar);

        this.game.load.image('player', 'assets/images/player.png');
        this.game.load.image('wall', 'assets/images/wall.png');
        this.game.load.image('floor', 'assets/images/floor.png');
        this.game.load.image('start', 'assets/images/arrowBlue_right.png');

    },
    create: function() {
        this.state.start('Menu');
    }
};
