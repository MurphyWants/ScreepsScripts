module.exports = {
  move: function(creep, target) {
    creep.moveTo(target, {
      reusePath: 25
    });
    return 0;
  },
  move: function(creep, target, color) {
    creep.moveTo(target, {
      reusePath: 25,
      visualizePathStyle: {
        stroke: color,
        opacity: .5
      }
    });
  },
  harvest: function(creep, target) {
    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
      this.move(creep, target);
    }
    if (creep.carry.energy == creep.carryCapacity)
      creep.memory.isFull = true;
  },
  harvest: function(creep, target, color) {
    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
      this.move(creep, target, color);
    }
    if (creep.carry.energy == creep.carryCapacity)
      creep.memory.isFull = true;
  },
  find_transfer: function(creep) { //returns a list
    return creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return ((structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.energy < structure.energyCapacity);
      }
    })[0];
  },
  transfer_to: function(creep, target) {
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.move(creep, target);
    }
    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  transfer_to: function(creep, target, color) {
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      this.move(creep, target, color);
    }
    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  find_repair: function(creep) {
    return creep.room.find(FIND_STRUCTURES, {
      filter: function(structure) {
        var struct = structure.structureType;
        switch (struct) {
          case "tower":
          case "extension":
          case "controller":
          case "spawn":
            return (structure.hits < structure.hitsMax);
          case "container":
          case "road":
            return (structure.hits < (structure.hitsMax * (3 / 4)));
            case "rampart":
          case "constructedWall":
            return (structure.hits < 200000);
          default:
            return false;
        }
      }
    })[0];
  },
  repair_to: function(creep, target) {
    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
      this.move(creep, target);
    }

    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  repair_to: function(creep, target, color) {
    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
      this.move(creep, target, color);
    }

    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  upgrade_controller: function(creep) {
    controller = creep.room.controller;
    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
      this.move(creep, controller);
    }
    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  upgrade_controller: function(creep, color) {
    controller = creep.room.controller;
    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
      this.move(creep, controller, color);
    }
    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  find_build: function(creep) {
    return creep.room.find(FIND_CONSTRUCTION_SITES)[0];
  },
  build_to: function(creep, target) {
    if (creep.build(target) == ERR_NOT_IN_RANGE) {
      this.move(creep, target);
    }
    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  build_to: function(creep, target, color) {
    if (creep.build(target) == ERR_NOT_IN_RANGE) {
      this.move(creep, target, color);
    }
    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  idle: function(creep) {
    var room = creep.room.name;
    var flag = roomVars[room][0];
    this.move(creep, Game.flags[flag]);
  },
  find_flag_by_color(room, color) {
    return Game.rooms[room].find(FIND_FLAGS, {
      filter: (flag) => {
        return flag.color == color
      }
    });
  },
  test_path: function(target1, target2){
    path = target1.pos.findPathTo(target2.pos);
    console.log("Total points: " ,path.length);
    for (var p in paths){
      console.log("X: ", paths[p].x);
    }
  }
}
