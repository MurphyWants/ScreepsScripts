var okSay = {
    run: function(creep, msg) {
        if (Memory.roleSay == undefined)
            Memory.roleSay = false;

        if (Memory.roleSay == creep.memory.role)
          creep.say(msg);
    }
}

module.exports = okSay;
