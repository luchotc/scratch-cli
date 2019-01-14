const regularBlocks = {
  wait: {inputs: ["DURATION"]},
  wait_until: {inputs: ["CONDITION"]},
  repeat: {inputs: ["TIMES"], mulangTag: "Repeat"},
  repeat_until: {inputs: ["CONDITION"], mulangTag: "While"}, //Parsed as while(!condition)
  forever: {inputs: ["SUBSTACK"], mulangTag: "While"}, // Parsed as while(true)
  if: {inputs: ["CONDITION"], mulangTag: "If"},
  if_else: {inputs: ["CONDITION"], mulangTag: "If"},
  stop: {fields: ["STOP_OPTION"]},
  create_clone_of: {inputs: ["CLONE_OPTION"]},
  delete_this_clone: {},
  start_as_clone: {mulangTag: "EntryPoint", customName: "when_i_start_as_a_clone"}
};

const inputBlocks = {
  create_clone_of_menu: {fields: ["CLONE_OPTION"]},
};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};

/*
Mulang related structures

(If Expression Expression Expression)

(While Expression Expression)

(Repeat Expression Expression)

(Application Expression [Expression])


HATS

control_start_as_clone es uno de ellos, son los bloques "listeners" que van arriba de todo

-----

control_create_clone_of_menu

fields: {CLONE_OPTION: Object { name: "CLONE_OPTION", id: undefined, value: "_myself_" }}

possible values: ["_myself_", SPRITE]



----

control_stop:

STOP_OPTION posibles valores: ["this scripts", "all", "other scripts in sprite"]

 */
