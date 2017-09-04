var makeCreep = {
    /** @param {Creep} creep **/
    run: function(type, spawn, extra) {
      var harvestToHomeRoles = "WORK, CARRY, MOVE";
      var name = "harvestToHome" + Game.time
        switch type {
            case 'harvestToHome':
              Game.spawns[spawn].createCreep([harvestToHomeRoles], name, {role: type, creepSpawn: spawn, extraVar: extra});
                break;
            default:
                break;
        }
    }

}
