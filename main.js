//global.okSay = require('oksay');
global.roomVars = require('rooms');
global.creepRoles = require('creepRoles');
global.replace = require('replace');

module.exports.loop = function() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == undefined)
            creep.memory.role = "none";
        var role = creep.memory.role;
        if (!(role == "none"))
            creepRoles[role][0](creep);
    }
    if(!(Game.time % 10))
      replace();
}
