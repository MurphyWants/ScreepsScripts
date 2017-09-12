//global.okSay = require('oksay');
global.roomVars = require('rooms');
global.creepRoles = require('creepRoles');
global.replace = require('replace');
global.creepRoutineFunctions = require('creepRoutineFunctions');
try {
  global.towerFunctions = require('towerFunctions');
}
catch(err){
  console.log(err);
}

module.exports.loop = function() {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == undefined)
      creep.memory.role = "none";
    var role = creep.memory.role;
    if (!(role == "none"))
      creepRoles[role][0](creep);
  }
  if (!(Game.time % 10)){
    replace();
    /*blue_flags = Game.flags.filter( function(f){
      return f.color == 3;
    })
    console.log(blue_flags);*/
    for (var i in Game.flags){
      if (Game.flags[i] == 3)
        Game.flags[i].memory.creepAssigned = false;
    }
  }

  towerFunctions();
}
