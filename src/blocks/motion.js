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
  changexby: {inputs: ["X"]},
  setx: {inputs: ["X"]},
  changeyby: {inputs: ["Y"]},
  sety: {inputs: ["Y"]},
  ifonedgebounce: {},
  setrotationstyle: {fields: ["STYLE"]}
};

const inputBlocks = {
  glideto_menu: {fields: ["TO"]},
  pointtowards_menu: {fields: ["TO"]},
};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};

/*
OTROS BLOQUES INVOLUCRADOS

motion_goto_menu, motion_glideto_menu:

fields: {​​TO: Object { name: "TO", id: undefined, value: "_random_" }}

possible values: ["_random_", "_mouse_", SPRITE]

-----

motion_pointtowards_menu:

fields: {TOWARDS: Object { name: "TOWARDS", id: undefined, value: "_mouse_" }}

possible values: ["_mouse_", SPRITE]

-----

motion_setrotationstyle:

No tiene motion_setrotationstyle asociado, porque los tres valores son fijos.
Por eso son fields y no inputs como los otros, no acepta uno.

fields: STYLE: Object { name: "STYLE", id: undefined, value: "all around" }

possible values: ["all around", "left-right", "don't rotate"]
*/
