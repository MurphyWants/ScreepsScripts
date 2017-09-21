module.exports = function() {
    //console.log("Rplace filler");
    for (var i in Game.rooms) {
        /* Saved values for each needed variable */
        var roomSpawn = roomVars[i][1];
        var waitFlag = roomVars[i][0];
        var roomLevel = roomVars[i][2];
        var creepsInRoom = _.filter(Game.creeps, (c) => c.room.name == i);

        /* Sort Sources by number */
        var numSrcs = Game.rooms[i].find(FIND_SOURCES).length;
        var srcArr = new Array(numSrcs);
        var index;
        for (index = 0; index < srcArr.length; ++index) {
            srcArr[index] = [index, _.sum(creepsInRoom, (c) => c.memory.src == index)];
        }
        /* Function for sort srcArr by value */
        function compareArr(a, b) {
            if (a[1] < b[1])
                return -1;
            if (a[1] > b[1])
                return 1;
            return 0;
        }
        srcArr = srcArr.sort(compareArr);

        /* Respawn needed creeps */
        for (var r in creepRoles) {
            var sumRole = _.sum(creepsInRoom, (c) => c.memory.role == r);
            //for (var s in )

            var roleNum = creepRoles[r][1](i);
            var creepBody = creepRoles[r][2](i);
            var creepName = r + Game.time;

            if (sumRole < roleNum) {
                Game.spawns[roomSpawn].createCreep(creepBody, creepName, {
                    role: r,
                    src: srcArr[0][0],
                    home: roomSpawn,
                    isFull: false,
                });
            }
        }


        //console.log(creepsInRoom);
        //console.log(i);
        //console.log(roomVars[i][1]);
    }

    // Delete Old creeps
    for (var i in Memory.creeps) {
        var creep = Game.creeps[i];
        if (!creep) {
            console.log(Memory.creeps[i].role);
            delete Memory.creeps[i];
            console.log("Deleting creep: " + i);
        }
    }
}
