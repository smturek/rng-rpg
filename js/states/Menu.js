var RngRpg = RngRpg || {};

RngRpg.MenuState = {
    create: function() {
        this.gameTitle = this.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'RNG - RPG', {font: '42px Arial', fill: '#000'});
        this.gameTitle.anchor.setTo(0.5);

        this.startButton = this.add.button(this.game.world.centerX, this.game.world.centerY + 50, 'sword');
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(5, 5);

        this.startButton2 = this.add.button(this.game.world.centerX, this.game.world.centerY + 50, 'sword');
        this.startButton2.anchor.setTo(0.5);
        this.startButton2.scale.setTo(-5, 5);

        this.gameTitle = this.add.text(this.game.world.centerX, this.game.world.centerY + 150, 'Click the swords to start', {font: '20px Arial', fill: '#000'});
        this.gameTitle.anchor.setTo(0.5);

        this.startButton2.events.onInputDown.add(function() {
            this.state.start('Game');
        }, this);
    }
};
