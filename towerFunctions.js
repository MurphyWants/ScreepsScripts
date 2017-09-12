module.exports = function() {
    for (var room in roomVars) {
      var towers = Game.rooms[room].find(FIND_STRUCTURES, {
        filter: (t) => {
          return (t.structureType == STRUCTURE_TOWER);
        }
      });
      for (var i in towers) {
        var repair_target = creepRoutineFunctions.find_repair(towers[i]);
        var enemies = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if (enemies == undefined) {
          if (!(repair_target == undefined))
            towers[i].repair(repair_target);
        } else {

          towers[i].attack(enemies);
        }
      }
    }
}
