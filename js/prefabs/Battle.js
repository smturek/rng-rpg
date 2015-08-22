RngRpg = RngRpg || {};

RngRpg.Battle = function(game) {
    this.game = game;
};

RngRpg.Battle.prototype.initialize = function(player, monster) {
    console.log(player.key);
    console.log(monster.key);
};
