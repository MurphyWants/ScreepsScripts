module.exports = {
  move: function(creep, target) {
    creep.moveTo(target, {
      reusePath: 50
    });
    return 0;
  },
  move: function(creep, target, color) {
    creep.moveTo(target, {
      reusePath: 50,
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
          case "constructedWall":
          case "extension":
          case "controller":
          case "spawn":
            return (structure.hits < structure.hitsMax);
          case "rampart":
          case "container":
          case "road":
            return (structure.hits < (structure.hitsMax * (3 / 4)));
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
  find_build: function(creep){
    return creep.room.find(FIND_CONSTRUCTION_SITES)[0];
  },
  build_to: function(creep, target){
    if (creep.build(target) == ERR_NOT_IN_RANGE){
      this.move(creep, target);
    }
    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  build_to: function(creep, target, color){
    if (creep.build(target) == ERR_NOT_IN_RANGE){
      this.move(creep, target, color);
    }
    if (creep.carry.energy == 0)
      creep.memory.isFull = false;
  },
  testfn: function() {
    console.log("2");
  },
  otherfn: function() {
    this.testfn();
    return 2;
  }
}
