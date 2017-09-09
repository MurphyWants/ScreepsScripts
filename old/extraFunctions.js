var countRoles = {
  run: function(str) {
    _.sum(Game.creeps, (c) => c.memory.role == str);
  }
}
module.exports = countRoles;
