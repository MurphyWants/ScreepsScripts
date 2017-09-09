var harvester - home = {
    run: function(creep) {
        var source = creep.room.find(FIND_SOURCES)[creep.memory.src];
        var home = Game.spawns[creep.memory.creepSpawn];

        if (creep.memory.isFull == undefined)
            creep.memory.isFull = false;

        if (!creep.memory.isFull == undefined) {
            ok.Say.run(creep, 'HH:Src');
            if (cree.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: '#32CD32'
                    }
                });
            }

          if (creep.carry.energy == creep.carryCapacity)
            creep.memory.isFull = true;
        }


      if(creep.memory.isFull) {
        ok.Say.run(creep, 'HH: Home');
      }
    }
}
