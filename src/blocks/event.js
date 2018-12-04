const regularBlocks = {
  broadcast: {inputs: ["BROADCAST_INPUT"]},
  broadcastandwait: {inputs: ["BROADCAST_INPUT"]},
  whenflagclicked: {},
  whenkeypressed: {fields: ["KEY_OPTION"]},
  whenthisspriteclicked: {},
  whenbackdropswitchesto: {fields: ["BACKDROP"]},
  whengreaterthan: {fields: ["WHENGREATERTHANMENU"], inputs: ["VALUE"]},
  whenbroadcastreceived: {fields: ["BROADCAST_OPTION"]}
};

const inputBlocks = {
  broadcast_menu: {fields: ["BROADCAST_OPTION"]}
};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};

/*

event_whenkeypressed

fields: {KEY_OPTION: Object { name: "KEY_OPTION", id: undefined, value: "KEY" }}

possible values: Hardcoded values like a, b, c, space, left-arrow

---------

event_whenbackdropswitchesto

fields: {BACKDROP: Object { name: "BACKDROP", id: undefined, value: "BACKDROP" }}

possible values: backdrop names

---------

event_whengreaterthan

fields: {WHENGREATERTHANMENU: Object { name: "WHENGREATERTHANMENU", id: undefined, value: "LOUDNESS" }}

possible values: LOUDNESS | TIMER

---------

event_whengreaterthan

fields: {BROADCAST_OPTION: Object { name: "BROADCAST_OPTION", id: undefined, value: "BROADCAST_MESSAGE", variabconstype: "broadcast_msg" }}

possible values: One of the messages located in scratchVm.runtime.targets[0].variables with the type: "broadcast_msg"

*/
