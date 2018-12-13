const regularBlocks = {
  playuntildone: {inputs: ["SOUND_MENU"]},
  play: {inputs: ["SOUND_MENU"]},
  stopallsounds: {},
  changevolumeby: {inputs: ["VOLUME"]},
  setvolumeto: {inputs: ["VOLUME"]},
  changeeffectby: {fields: ["EFFECT"], inputs: ["VALUE"]},
  seteffectto: {fields: ["EFFECT"], inputs: ["VALUE"]},
  volume: {mulangTag: "Reference"},
  cleareffects: {}
};

const inputBlocks = {
  sounds_menu: {fields: ["SOUND_MENU"]}
};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};
