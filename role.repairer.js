/* Purpose: Just harvesting to spawn */
var roleRepairer = {
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES)[1];
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
            okSay.run(creep, 'R:Source');
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

      /*  var target = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity)
            }
        }) //Need to fix target code*/

        var target = creep.pos.findClosestByRange(Game.STRUCTURES, {
          filter: function(structure){
            return structure.hits < structure.hitMax / 2;
          }
        });

        if (creep.memory.isFull) {
            okSay.run(creep, 'R:Home');
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {
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
        if (target == null){
          creep.moveTo(Game.flags["0.0Safe"], {
            visualizePathStyle: {
              stroke: '#9400d3'
            }
          });
        }
    }
}

module.exports = roleRepairer;
