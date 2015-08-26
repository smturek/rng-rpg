RngRpg = RngRpg || {};

RngRpg.Battle = function(game) {
    this.game = game;

    //init battle overlay
    this.overlay = this.game.add.bitmapData(this.game.width, this.game.height);
    this.overlay.ctx.fillStyle = '#000';
    this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);

    this.battleDisplayGroup = this.game.add.group();
    this.battleDisplayGroup.y = this.game.height;
    this.battleBackground = new Phaser.Sprite(this.game, 0, 0, this.overlay);
    this.battleBackground.alpha = 0.7;
    this.battleBackground.fixedToCamera = true;
    this.battleDisplayGroup.add(this.battleBackground);
};

RngRpg.Battle.prototype.startBattle = function(player, monster) {
    this.player = player;
    this.monster = monster;

    //bring up battle screen
    var showBattleTween = this.game.add.tween(this.battleDisplayGroup);
    showBattleTween.to({y: 0}, 150);
    showBattleTween.start();

    showBattleTween.onComplete.add(this.setUpGUI, this);
};

RngRpg.Battle.prototype.setUpGUI = function(player, monster) {
    var style = {font: '14px Arial', fill: '#fff'};

    console.log(this.player.health);

    //creates text for battle screen
    this.playerHealth = this.game.add.text(30,10, '0', style);
    this.playerHealth.text = this.player.health;
};
