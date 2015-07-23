var RngRpg = RngRpg || {};

RngRpg.MenuState = {
    create: function() {
        this.startButton = this.add.button(this.game.world.centerX, this.game.world.centerY, 'start');
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(5);

        this.startButton.events.onInputDown.add(function() {
            this.state.start('Game');
        }, this);
    }
};
