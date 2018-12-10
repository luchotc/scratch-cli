const regularBlocks = {
  touchingobject: {fields: ["TOUCHINGOBJECTMENU"]},
  touchingcolor: {inputs: ["COLOR"]},
  coloristouchingcolor: {inputs: ["COLOR", "COLOR2"]},
  distanceto: {fields: ["DISTANCETOMENU"]},
  resettimer: {},
  of: {fields: ["PROPERTY"], inputs: ["OBJECT"]},
  mousex: {},
  mousey: {},
  setdragmode: {fields: ["DRAG_MODE"]},
  mousedown: {},
  keypressed: {inputs: ["KEY_OPTION"]},
  current: {fields: ["CURRENTMENU"]},
  dayssince2000: {},
  loudness: {},
  askandwait: {inputs: ["QUESTION"]},
  answer: {},
  username: {},
  timer: {}
};

const inputBlocks = {
  touchingobjectmenu: {fields: ["TOUCHINGOBJECTMENU"]},
  distancetomenu: {fields: ["DISTANCETOMENU"]},
  of_object_menu: {fields: ["OBJECT"]},
  keyoptions: {fields: ["KEY_OPTION"]}
  //define what to do with colour picker
};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};
