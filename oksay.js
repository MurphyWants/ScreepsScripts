module.exports = {
  function (creep,msg) {
    role = creep.memory.role;
    mem = "Memory.okSay" + role;

    if(eval(mem) == undefined)
      eval(mem + " = false")

    if(eval(mem))
      creep.say(msg);
  }
}
