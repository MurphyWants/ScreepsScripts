/*
"role" : [action(), numToBuild(), parts()]

use: role["rolename"][num](creep)
ex: role["harvester-general"][0](creep) == creep action
ex: role["harvester-general"][1] == numToBuild
ex: role["harvester-general"][2] == creepParts
*/

module.exports = {
  "builder": [ // Buidler Role
    function(creep) { //action
      const src = creep.room.find(FIND_SOURCES)[creep.memory.src];
      const home = Game.spawns[creep.memory.home];
      var target = creepRoutineFunctions.find_build(creep);
      var harvest_color = "#32CD32"; // trail color when going to harvest, green
      var build_color = "#DC7633"; // orange

      if (creep.memory.isFull == undefined)
        creep.memory.isFull = false;

      if (!creep.memory.isFull) { // Fill energy
        creepRoutineFunctions.harvest(creep, src, harvest_color);
      } else { // Energy is filled
        if (target == null) { // Check if there is anything to build
          target = creepRoutineFunctions.find_repair(creep);
          if (target == null) { // Check if there is anything to repair
            creepRoutineFunctions.upgrade_controller(creep); // Nothing to repair, go help build controller
          } else { // There was something to repair
            creepRoutineFunctions.repair_to(creep, target);
          }
        } else { // There was something to build
          creepRoutineFunctions.build_to(creep, target, build_color);
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
          return 2;
        default:
          return 2;
      }
    },
    function(room) { //body
      var level = roomVars[room][2];

      switch (level) {
        case 1:
        case 2:
          return [WORK, CARRY, MOVE]; // 200 pts
        case 3:
          return [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]; //550 pts
        default:
          return [WORK, CARRY, MOVE]; // 200 pts
      }
    }
  ],
  "harvest-controller": [ //Harvest role but only delivers to controller
    function(creep) { //action

      const src = creep.room.find(FIND_SOURCES)[creep.memory.src];
      const home = Game.spawns[creep.memory.home];
      var harvest_color = "#32CD32"; // trail color when going to harvest, green
      var controller_color = "#F1C40F"; // yellow

      if (creep.memory.isFull == undefined)
        creep.memory.isFull = false;

      if (!creep.memory.isFull) {
        creepRoutineFunctions.harvest(creep, src, harvest_color);
      } else {
        creepRoutineFunctions.upgrade_controller(creep, controller_color);
      }


    },
    function(room) { //numToBuild
      var level = roomVars[room][2];

      switch (level) {
        case 0:
          return 0;
        case 1:
          return 2
        default:
          return 2;
      }
    },

    function(room) { //parts
      var level = roomVars[room][2];

      switch (level) {
        case 1:
        case 2:
          return [WORK, CARRY, MOVE]; // 200 pts
        case 3:
        case 4:
          return [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]; //550 pts
        default:
          return [WORK, CARRY, MOVE]; // 200 pts
      }
    }
  ],
  "repairer": [ // repair role
    function(creep) { //action

      const src = creep.room.find(FIND_SOURCES)[creep.memory.src];
      const home = Game.spawns[creep.memory.home];
      var target = creepRoutineFunctions.find_repair(creep);
      var harvest_color = "#32CD32"; // trail color when going to harvest, green
      var repair_color = "#154360"; // blue

      if (creep.memory.isFull == undefined)
        creep.memory.isFull = false;

      if (!creep.memory.isFull) { // Fill Energy
        creepRoutineFunctions.harvest(creep, src, harvest_color);
      } else { // Once filled, go repair
        if (target == null) { // if nothing to repair, find something to build
          target = creepRoutineFunctions.find_build(creep);
          if (target == null) { // If there is nothing to build, go help upgrade the controller
            creepRoutineFunctions.upgrade_controller(creep);
          } else { // There was something to build
            creepRoutineFunctions.build_to(creep, target);
          }
        } else { // There was something to repair
          creepRoutineFunctions.repair_to(creep, target, repair_color);
        }
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
        case 1:
        case 2:
          return [WORK, CARRY, MOVE]; // 200 pts
        case 3:
          return [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]; //550 pts
        default:
          return [WORK, CARRY, MOVE]; // 200 pts
      }
    }
  ],
  "harvest-general": [ //Harvest role for everything else
    function(creep) { //action

      const src = creep.room.find(FIND_SOURCES)[creep.memory.src]; //energy source
      const home = Game.spawns[creep.memory.home]; //spawn
      var target = creepRoutineFunctions.find_transfer(creep); // target to fill
      var harvest_color = "#32CD32"; // trail color when going to harvest, green
      var transfer_color = "#FF0000"; // red

      if (creep.memory.isFull == undefined)
        creep.memory.isFull = false;

      if (!creep.memory.isFull) {
        creepRoutineFunctions.harvest(creep, src, harvest_color);
      } else {
        if (target == undefined) {
          target = creepRoutineFunctions.find_repair(creep);
          if (target == undefined) {
          creepRoutineFunctions.upgrade_controller(creep);
        } else {
          creepRoutineFunctions.repair_to(creep, target);
        }
        } else {
          creepRoutineFunctions.transfer_to(creep, target, transfer_color);
        }
      }
    },
    function(room) { //numToBuild
      var level = roomVars[room][2];

      switch (level) {
        case 0:
          return 2;
        case 1:
        case 2:
          return 3;
        case 3:
          return 5;
        default:
          return 5;
      }
    },

    function(room) { //parts
      var level = roomVars[room][2];

      switch (level) {
        case 1:
        case 2:
          return [WORK, CARRY, MOVE]; // 200 pts
        case 3:
          return [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]; //550 pts
        default:
          return [WORK, CARRY, MOVE]; // 200 pts
      }
    }
  ],
  "patrol": [ // General gaurd unit
    function(creep) { // routine
      var blue_flags;
      try {
        blue_flags = Game.rooms[room].find(FIND_FLAGS, {
          filter: (f) => {
            return (f.color == 3); // 3 == blue
          }
        });

        function filterArr(f) {
          if (f.memory.creepAssigned == undefined) {
            f.memory.creepAssigned = false;
          }
          return (!f.memory.creepAssigned);
        }

        if (blue_flags == undefined) {
          blue_flags = Game.flags[roomVars[creep.room][0]];
        } else {

          blue_flags.filter(filterArr);

          blue_flags.memory.creepAssigned = creep.name;
        }
      } catch (err) {
        blue_flags = Game.flags[roomVars[creep.room.name][0]];
      }
      var enemies = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

      if (creep.memory.mode == undefined)
        creep.memory.mode = "guard";

      if (enemies == undefined) {
        if (creep.carry.energy == false) {
          creep.memory.mode = "harvest";
        } else {
          creep.memory.mode = "guard";
        }
      } else {
        creep.memory.mode = "attack";
      }

      switch (creep.memory.mode) {
        case "harvest":
          creepRoutineFunctions.harvest(creep, creep.pos.findClosestByRange(FIND_SOURCES));
          break;
        case "guard":
          creepRoutineFunctions.move(creep, blue_flags);
          break;
        case "attack":
          if (creep.attack(enemies) == ERR_NOT_IN_RANGE) {
            if (creep.rangedAttack(enemies) == ERR_NOT_IN_RANGE) {
              creep.moveTo(enemies, {
                reusePath: 2
              });
            }
          }
          break;
      }


    },
    function(room) { // num to build
      var level = roomVars[room][2];
      var blue_flags = Game.rooms[room].find(FIND_FLAGS, {
        filter: (f) => {
          return (f.color == 3); // 3 == blue
        }
      });
      switch (level) {
        case 3:
          return 1;
        default:
          return 0;
      }
    },
    function(room) { // parts
      var level = roomVars[room][2];
      switch (level) {
        default: return [WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK]; // 990 Energy
      }
    }
  ]
};
