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

      if (!creep.memory.isFull) {
        creepRoutineFunctions.harvest(creep, src, harvest_color);
      } else {
        creepRoutineFunctions.build_to(creep, target, build_color);
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
          return [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]; //550 pts
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
          return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]; //550 pts
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

      if (!creep.memory.isFull) {
        creepRoutineFunctions.harvest(creep, src, harvest_color);
      } else {
        creepRoutineFunctions.repair_to(creep, target, repair_color);
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
          return 3;
        default:
          return 3;
      }
    },

    function(room) { //parts
      var level = roomVars[room][2];

      switch (level) {
        case 1:
        case 2:
          return [WORK, CARRY, MOVE]; // 200 pts
        case 3:
          return [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]; //550 pts
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
        creepRoutineFunctions.transfer_to(creep, target, transfer_color);
      }

    },
    function(room) { //numToBuild
      var level = roomVars[room][2];

      switch (level) {
        case 0:
          return 2;
        case 1:
          return 3;
        default:
          return 3;
      }
    },

    function(room) { //parts
      var level = roomVars[room][2];

      switch (level) {
        case 1:
        case 2:
          return [WORK, CARRY, MOVE]; // 200 pts
        case 3:
          return [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]; //550 pts
        default:
          return [WORK, CARRY, MOVE]; // 200 pts
      }
    }
  ]
};
