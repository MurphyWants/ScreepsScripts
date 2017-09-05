/* Purpose: Just harvesting to controller */
var harvestToController = {
    run: function(creep) {
        var sources = creep.pos.findClosestByRange(FIND_SOURCES);
        var home = Game.spawns[creep.memory.creepSpawn];
        if (creep.memory.isFull == undefined)
            creep.memory.isFull = false;

        if (!creep.memory.isFull) {
            okSay.run(creep, 'HC:Source');
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            if (creep.carry.energy == creep.carryCapacity)
                creep.memory.isFull = true;
        }

        if (creep.memory.isFull) {
            okSay.run(creep, 'HC:Controller');
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: {
                        stroke: '#008000'
                    }
                })
            }
            if (creep.carry.energy == 0)
                creep.memory.isFull = false;
        }
    }
}

module.exports = harvestToController;
