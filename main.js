var roleHarvester = require('role.harvester');
var respawnCreeps = require('replaceScreeps');

module.exports.loop = function() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                creep.say('Harvestor');
                roleHarvester.run(creep);
                break;
            case 'harvestToHome':
                creep.say('harvestToHome')
                roleHarvestToHome.run(creep);
                break;
            default:
                creep.say('No Role');
        }
    }
}
