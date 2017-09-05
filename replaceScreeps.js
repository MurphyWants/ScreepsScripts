// Game.spawns['HomeS'].createCreep([WORK, CARRY, MOVE], 'Harvester1', {role: 'harvester'});
var replaceScreeps = {
    run: function() {
        var numberHarvestToHome = 7;
        var numberHarvestToController = 5;
        var numberBuilder = 5;

        for (var i in Memory.creeps) {
            var creep = Game.creeps[i];
            if (!creep) {
                //makeCreep(Game.creeps[i].memory.role, Game.creeps[i].memory.creepSpawn)
                delete Memory.creeps[i];
                console.log("Deleting creep: " + i);
            }
        }

        if (_.sum(Game.creeps, (c) => c.memory.role == 'harvestToHome') < numberHarvestToHome)
            makeCreep.run('harvestToHome', 'HomeS');

        if (_.sum(Game.creeps, (c) => c.memory.role == 'harvestToController') < numberHarvestToController) {
            makeCreep.run('harvestToController', 'HomeS');
        }

        if (_.sum(Game.creeps, (c) => c.memory.role == 'builder') < numberBuilder) {
            makeCreep.run('builder', 'HomeS');
        }

    }

}

module.exports = replaceScreeps;
