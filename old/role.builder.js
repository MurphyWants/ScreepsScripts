var roleBuilder = {
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES)[1];
        //creep.pos.findClosestByRange(FIND_SOURCES);
        if (creep.memory.isFull == undefined)
            creep.memory.isFull = false;

        if (!creep.memory.isFull) {
            okSay.run(creep, 'B:Source');
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            if (creep.carry.energy == creep.carryCapacity)
                creep.memory.isFull = true;
        }

        var target = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (creep.memory.isFull) {
            okSay.run(creep, 'B:Build');
            if (creep.carry.energy == 0)
                creep.memory.isFull = false;
            if (creep.build(target[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0], {
                    visualizePathStyle: {
                        stroke: '#000000'
                    }
                });
            }
        }
    }
}

module.exports = roleBuilder;
