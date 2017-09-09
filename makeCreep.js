var makeCreep = {
    run: function(roleType, spawn) {
        var name = roleType + Game.time;
        switch (roleType) {
            case 'harvestToHome':
                Game.spawns[spawn].createCreep([WORK, CARRY, MOVE], name, {
                    role: roleType,
                    creepSpawn: spawn,
                });
                break;
            case 'harvestToController':
                Game.spawns[spawn].createCreep([WORK, CARRY, MOVE], name, {
                    role: roleType,
                    creepSpawn: spawn,
                });
                break;
            case 'builder':
                Game.spawns[spawn].createCreep([WORK, CARRY, MOVE], name, {
                    role: roleType,
                    creepSpawn: spawn,
                });
                break;
            case 'repairer':
                Game.spawns[spawn].createCreep([WORK, CARRY, MOVE], name, {
                    role: roleType,
                    creepSpawn: spawn,
                });
                break;
        }
    }
}

module.exports = makeCreep;
