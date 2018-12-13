const regularBlocks = {
  say: {inputs: ["MESSAGE"]},
  sayforsecs: {inputs: ["MESSAGE", "SECS"]},
  think: {inputs: ["MESSAGE"]},
  thinkforsecs: {inputs: ["MESSAGE", "SECS"]},
  show: {},
  hide: {},
  switchcostumeto: {inputs: ["COSTUME"]},
  costume: {fields: ["COSTUME"]}, //menu
  backdrops: {fields: ["BACKDROP"]}, //menu
  switchbackdropto: {inputs: ["BACKDROP"]},
  nextcostume: {},
  nextbackdrop: {},
  changesizeby: {inputs: ["CHANGE"]},
  setsizeto: {inputs: ["SIZE"]},
  cleargraphiceffects: {},
  changeeffectby: {fields: ["EFFECT"], inputs: ["CHANGE"]},
  seteffectto: {fields: ["EFFECT"], inputs: ["VALUE"]},
  gotofrontback: {fields: ["FRONT_BACK"]},
  goforwardbackwardlayers: {fields: ["FORWARD_BACKWARD"], inputs: ["NUM"]},
  // These 3 are just getters for variables, they aren't present in blocks
  size: {mulangTag: "Reference"},
  costumenumbername: {fields: ["NUMBER_NAME"]},
  backdropnumbername: {fields: ["NUMBER_NAME"]}
};

const inputBlocks = {
};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};

/*
  looks_changeeffectby:

  fields possible values: ["color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost"]

-------

  looks_gotofrontback:

  fields possible values: ["front", "back"]

 */
