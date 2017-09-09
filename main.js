
var roleHarvester = require('role.harvester');
var roleHarvestToHome = require('role.harvestToHome');
var roleHarvestToController = require('role.harvestToController');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer')
global.respawnCreeps = require('replaceScreeps');
global.makeCreep = require('makeCreep');
global.okSay = require('oksay');
global.testfile = require('testfile');

module.exports.loop = function() {
  /*if(Memory.MainPause == undefined)
     Memory.MainPause = false;

  if(Memory.MainPause)
     return*/
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                creep.say('Harvestor');
                roleHarvester.run(creep);
                break;
            case 'harvestToHome':
                //creep.say('H_Home')
                roleHarvestToHome.run(creep);
                break;
            case 'harvestToController':
                roleHarvestToController.run(creep);
                break;
            case 'builder':
              roleBuilder.run(creep);
              break;
            case 'repairer':
              roleRepairer.run(creep);
              break;
            default:
                creep.say('No Role');
        }
    }
    respawnCreeps.run();
}
