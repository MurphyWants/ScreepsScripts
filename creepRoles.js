/*
"role" : [action(), numToBuild(), parts()]

use: role["rolename"][num](creep)
ex: role["harvester-home"][0](creep) == creep action
ex: role["harvester-home"][1] == numToBuild
*/

module.exports = {
    "harvester-home": [ //Harvest role but only delivers to home
        function(creep) { //action

            const src = creep.room.find(FIND_SOURCES)[creep.memory.src];
            const home = Game.spawns[creep.memory.home];

            if (creep.memory.isFull == undefined)
                creep.memory.isFull = false;

            if (!creep.memory.isFull) {
                if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(src, {
                         reusePath: 25,
                        visualizePathStyle: {
                            stroke: '#32CD32'
                        }
                    });
                }
                if (creep.carry.energy == creep.carryCapacity)
                    creep.memory.isFull = true;
            }

            if (creep.memory.isFull) {
                if (creep.transfer(home, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(home, {
                         reusePath: 25,
                        visualizePathStyle: {
                            stroke: '#008000'
                        }
                        //
                    });
                }

                if (creep.carry.energy == 0)
                    creep.memory.isFull = false;
            }



        },
        function(room) { //numToBuild
            var level = roomVars[room][2];

            switch (level) {
                case 0:
                    return 4;
                case 1:
                    return 3;
                case 2:
                    return 1;
                default:
                    return 1;
            }
        },

        function(room) { //parts
            var level = roomVars[room][2];

            switch (level) {
                case 3:
                    return [WORK, CARRY, CARRY, MOVE, MOVE]; //300 pts
                case 4:
                    return [WORK, WORK, CARRY, CARRY, MOVE, MOVE]; // 400 pts
                default:
                    return [WORK, CARRY, MOVE]; // 200 pts
            }
        }
    ],
    "builder": [ // Buidler Role
        function(creep) { //action
            const src = creep.room.find(FIND_SOURCES)[creep.memory.src];
            const home = Game.spawns[creep.memory.home];

            if (creep.memory.isFull == undefined)
                creep.memory.isFull = false;

            //creep.say(creep.memory.isFull);

            if (!creep.memory.isFull) {
                if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(src, {
                         reusePath: 25,
                        visualizePathStyle: {
                            stroke: '#32CD32'
                        }
                    });
                }
                if (creep.carry.energy == creep.carryCapacity)
                    creep.memory.isFull = true;
            }

            var target = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (creep.memory.isFull) {
                if (target[0] == undefined) {
                    creep.moveTo(Game.flags[roomVars[creep.room.name][0]], {
                         reusePath: 25,
                        visualizePathStyle: {
                            stroke: '#9400d3'
                        }
                    });
                }
                if (creep.carry.energy == 0)
                    creep.memory.isFull = false;
                if (creep.build(target[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0], {
                         reusePath: 25,
                        visualizePathStyle: {
                            stroke: '#000000'
                        }
                    });
                }
            }
        },
        function(room) { //num to build
            var level = roomVars[room][2];

            switch (level) {
                case 0:
                    return 0;
                case 1:
                    return 2;
                case 2:
                    return 3;
                default:
                    return 3;
            }
        },
        function(room) { //body
            var level = roomVars[room][2];

            switch (level) {
                case 3:
                    return [WORK, CARRY, CARRY, MOVE, MOVE]; //300 pts
                case 4:
                    return [WORK, WORK, CARRY, CARRY, MOVE, MOVE]; // 400 pts
                default:
                    return [WORK, CARRY, MOVE]; // 200 pts
            }
        }
    ],
    "harvest-controller": [ //Harvest role but only delivers to controller
        function(creep) { //action

            const src = creep.room.find(FIND_SOURCES)[creep.memory.src];
            const home = Game.spawns[creep.memory.home];

            if (creep.memory.isFull == undefined)
                creep.memory.isFull = false;

            if (!creep.memory.isFull) {
                if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(src, {
                         reusePath: 25,
                        visualizePathStyle: {
                            stroke: '#32CD32'
                        }
                    });
                }
                if (creep.carry.energy == creep.carryCapacity)
                    creep.memory.isFull = true;
            }

            if (creep.memory.isFull) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                         reusePath: 25,
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
            var level = roomVars[room][2];

            switch (level) {
                case 0:
                    return 0;
                case 1:
                    return 3;
                case 2:
                    return 5;
                default:
                    return 5;
            }
        },

        function(room) { //parts
            var level = roomVars[room][2];

            switch (level) {
                case 3:
                    return [WORK, CARRY, CARRY, MOVE, MOVE]; //300 pts
                case 4:
                    return [WORK, WORK, CARRY, CARRY, MOVE, MOVE]; // 400 pts
                default:
                    return [WORK, CARRY, MOVE]; // 200 pts
            }
        }
    ],
    "repairer": [ // repair role
        function(creep) { //action

            const src = creep.room.find(FIND_SOURCES)[creep.memory.src];
            const home = Game.spawns[creep.memory.home];

            if (creep.memory.isFull == undefined)
                creep.memory.isFull = false;

            if (!creep.memory.isFull) {
                if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(src, {
                         reusePath: 25,
                        visualizePathStyle: {
                            stroke: '#32CD32'
                        }
                    });
                }
                if (creep.carry.energy == creep.carryCapacity)
                    creep.memory.isFull = true;
            }

            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.hits < 1000;
                }
            });

            if (creep.memory.isFull) {
                if (target == null) {
                    target = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (target[0] == undefined) {
                        creep.moveTo(Game.flags[roomVars[creep.room.name][0]], {
                             reusePath: 25,
                            visualizePathStyle: {
                                stroke: '#9400d3'
                            }
                        });
                    } else if (creep.build(target[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target[0], {
                             reusePath: 25,
                            visualizePathStyle: {
                                stroke: '#000000'
                            }
                        });
                    }

                }
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                         reusePath: 25,
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
            var level = roomVars[room][2];

            switch (level) {
                case 0:
                    return 0;
                case 1:
                    return 1;
                case 2:
                    return 2;
                default:
                    return 2;
            }
        },

        function(room) { //parts
            var level = roomVars[room][2];

            switch (level) {
                case 3:
                    return [WORK, CARRY, CARRY, MOVE, MOVE]; //300 pts
                case 4:
                    return [WORK, WORK, CARRY, CARRY, MOVE, MOVE]; // 400 pts
                default:
                    return [WORK, CARRY, MOVE]; // 200 pts
            }
        }
    ],
    "harvest-general": [ //Harvest role for everything else
        function(creep) { //action

            const src = creep.room.find(FIND_SOURCES)[creep.memory.src];
            const home = Game.spawns[creep.memory.home];

            if (creep.memory.isFull == undefined)
                creep.memory.isFull = false;

            if (!creep.memory.isFull) {
                if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(src, {
                         reusePath: 25,
                        visualizePathStyle: {
                            stroke: '#32CD32'
                        }
                    });
                }
                if (creep.carry.energy == creep.carryCapacity)
                    creep.memory.isFull = true;
            }

            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });

            if (creep.memory.isFull) {
                if (target.length > 0) {
                    if (creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target[0], {
                             reusePath: 25,
                            visualizePathStyle: {
                                stroke: '#008000'
                            }
                        });
                    }
                } else {
                    target = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (target[0] == undefined) {
                        creep.moveTo(Game.flags[roomVars[creep.room.name][0]], {
                             reusePath: 25,
                            visualizePathStyle: {
                                stroke: '#9400d3'
                            }
                        });
                    } else if (creep.build(target[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target[0], {
                             reusePath: 25,
                            visualizePathStyle: {
                                stroke: '#000000'
                            }
                        });
                    }
                }

                if (creep.carry.energy == 0)
                    creep.memory.isFull = false;
            }



        },
        function(room) { //numToBuild
            var level = roomVars[room][2];

            switch (level) {
                case 0:
                    return 0;
                case 1:
                    return 2;
                case 2:
                    return 4;
                default:
                    return 6;
            }
        },

        function(room) { //parts
            var level = roomVars[room][2];

            switch (level) {
                case 3:
                    return [WORK, CARRY, CARRY, MOVE, MOVE]; //300 pts
                case 4:
                    return [WORK, WORK, CARRY, CARRY, MOVE, MOVE]; // 400 pts
                default:
                    return [WORK, CARRY, MOVE]; // 200 pts
            }
        }
    ]
};
