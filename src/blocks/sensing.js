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
  askandwait: {inputs: ["QUESTION"]},
  dayssince2000: {mulangTag: "Reference"},
  loudness: {mulangTag: "Reference"},
  answer: {mulangTag: "Reference"},
  username: {mulangTag: "Reference"},
  timer: {mulangTag: "Reference"}
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
