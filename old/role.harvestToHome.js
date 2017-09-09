/* Purpose: Just harvesting to spawn */
var harvestToHome = {
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES)[0];
        //creep.pos.findClosestByRange(FIND_SOURCES);
        var home = Game.spawns[creep.memory.creepSpawn];
        if (creep.memory.isFull == undefined)
            creep.memory.isFull = false;

        if (creep.memory.sourceTo == undefined)
            creep.memory.sourceTo = false;

        if (!creep.memory.sourceTo) {
            creep.memory.targetSource = creep.room.find(FIND_SOURCES).sort(function(a, b) {
                return (a.energy - b.energy)
            })[1];
            creep.memory.sourceTo = true;
        }

        if (!creep.memory.isFull) {
            okSay.run(creep, 'HH:Source');
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

        var target = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity)
            }
        }) //Need to fix target code

        if (creep.memory.isFull) {
            okSay.run(creep, 'HH:Home');
            if (creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0], {
                    visualizePathStyle: {
                        stroke: '#008000'
                    }
                })
            }
            if (creep.carry.energy == 0) {
                creep.memory.isFull = false;
                creep.memory.sourceTo = false;
            }
        }
    }
}

module.exports = harvestToHome;
