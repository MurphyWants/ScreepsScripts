/*
"role" : [action(), numToBuild(), parts()]

use: role["rolename"][num](creep)
ex: role["harvester-home"][0](creep) == creep action
ex: role["harvester-home"][1] == numToBuild
*/

module.exports = {
    "harvester-home": [ //Harvest role but only delivers to home
        function(creep) { //action
            if (creep.memory.srcNum == undefined)
                creep.memory.srcNum = 0;

            const src = creep.room.find(FIND_SOURCES)[creep.memory.srcNum];
            const home = Game.spawns[creep.memory.home];

            if (creep.memory.isFull == undefined)
                creep.memory.isFull = false

            if (!creep.memory.isFull) {
                okSay(creep, 'HH: Src');
                if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {
                        visualizePathStyle: {
                            stroke: '#32CD32'
                        }
                    });
                }
                if (creep.carry.energy == creep.carryCapacity)
                    creep.memory.isFull = true;
            }

            if (creep.memory.isFull) {
                okSay(creep, 'HH: Home');
                if (creep.transfer(home, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(home, {
                        visualizePathStyle: {
                            stroke: '#008000'
                        }
                    });
                }

                if (creep.carry.energy == 0)
                    creep.memory.isFull = false;
            }



        },
        function(room) { //numToBuild
            if (room.memory.level == undefined) {
                room.memory.level = 0;
            }

            switch (room.memory.level) {
                case 0:
                    return 3;
                case 1:
                    return 5;
                default:
                    return 5;
            }
        };

        function(room) { //parts
            if (room.memory.level == undefined) {
                room.memory.level = 0;
            }

            switch (room.memory.level) {
                default: return [game.WORK, game.CARRY, game.MOVE];
            }
        }
    ]
}
