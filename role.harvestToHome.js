/* Purpose: Just harvesting to spawn */

var harvestToHome = {
    run: function(creep) {
        var sources = creep.pos.findClosestByRange(FIND_SOURCES);
        while (creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, { visualizePathStyle: {stroke: '#ffff00'}});
            }
        }
        
    }
}

module.exports = roleHarvestToHome;
