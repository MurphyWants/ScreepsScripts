// Game.spawns['HomeS'].createCreep([WORK, CARRY, MOVE], 'Harvester1', {role: 'harvester'});
var replaceScreeps = {
    run: function() {
        var numberHarvestToHome = 5;
        var numberHarvestToController = 2;
        var numberBuilder = 3;
        var numberRepairer = 2;
        var mainSpawn = "0.0";

        for (var i in Memory.creeps) {
            var creep = Game.creeps[i];
            if (!creep) {
                //makeCreep(Game.creeps[i].memory.role, Game.creeps[i].memory.creepSpawn)
                delete Memory.creeps[i];
                console.log("Deleting creep: " + i);
            }
        }

        if (_.sum(Game.creeps, (c) => c.memory.role == 'harvestToHome') < numberHarvestToHome)
            makeCreep.run('harvestToHome', mainSpawn);

        if (_.sum(Game.creeps, (c) => c.memory.role == 'harvestToController') < numberHarvestToController) {
            makeCreep.run('harvestToController', mainSpawn);
        }

        if (_.sum(Game.creeps, (c) => c.memory.role == 'builder') < numberBuilder) {
            makeCreep.run('builder', mainSpawn);
        }

        if (_.sum(Game.creeps, (c) => c.memory.role == 'repairer') < numberRepairer) {
            makeCreep.run('repairer', mainSpawn);
        }

    }

}

module.exports = replaceScreeps;
