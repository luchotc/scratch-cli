const regularBlocks = {
  movesteps: {inputs: ["STEPS"]},
  turnright: {inputs: ["DEGREES"]},
  turnleft: {inputs: ["DEGREES"]},
  goto: {inputs: ["TO"]},
  goto_menu: {fields: ["TO"]},
  gotoxy: {inputs: ["X", "Y"]},
  glideto: {inputs: ["SECS", "TO"]},
  glidesecstoxy: {inputs: ["SECS", "X", "Y"]},
  pointindirection: {inputs: ["DIRECTION"]},
  pointtowards: {inputs: ["TOWARDS"]},
  changexby: {inputs: ["DX"]},
  setx: {inputs: ["X"]},
  changeyby: {inputs: ["DY"]},
  sety: {inputs: ["Y"]},
  ifonedgebounce: {},
  setrotationstyle: {fields: ["STYLE"]},
  xposition: {mulangTag: "Reference"},
  yposition: {mulangTag: "Reference"},
  direction: {mulangTag: "Reference"}
};

const inputBlocks = {
  goto_menu: {fields: ["TO"]},
  glideto_menu: {fields: ["TO"]},
  pointtowards_menu: {fields: ["TOWARDS"]}
};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};
