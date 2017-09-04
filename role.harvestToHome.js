/* Purpose: Just harvesting to spawn */
var harvestToHome = {
    run: function(creep) {
        var sources = creep.pos.findClosestByRange(FIND_SOURCES);
        var home = Game.spawns[creep.memory.creepSpawn];
        while (creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
        }
        while (creep.carry.energy > 0) {
            if (creep.transfer(home, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(home, {
                    visualizePathStyle: {
                        stroke: '#008000'
                    }
                })
            }
        }
    }
}
}

module.exports = roleHarvestToHome;
