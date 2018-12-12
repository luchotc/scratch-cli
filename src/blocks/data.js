const regularBlocks = {
  setvariableto: {fields: ["VARIABLE"], mulangTag: "Assignment"}, //inputs: ["VALUE"]
  changevariableby: {fields: ["VARIABLE"], inputs: ["VALUE"]},
  addtolist: {inputs: ["ITEM"], fields: ["LIST"]},
  deleteoflist: {inputs: ["INDEX"], fields: ["LIST"]},
  deletealloflist: {fields: ["LIST"]},
  insertatlist: {inputs: ["ITEM", "INDEX"], fields: ["LIST"]},
  replaceitemoflist: {inputs: ["ITEM", "INDEX"], fields: ["LIST"]},
  itemoflist: {inputs: ["INDEX"], fields: ["LIST"]},
  itemnumoflist: {inputs: ["ITEM"], fields: ["LIST"]},
  lengthoflist: {fields: ["LIST"]},
  listcontainsitem: {inputs: ["ITEM"], fields: ["LIST"]},
  // This last four are just visual, i'm not sure if it makes sense to include them
  hidevariable: {fields: ["VARIABLE"]},
  showvariable: {fields: ["VARIABLE"]},
  hidelist: {fields: ["LIST"]},
  showlist: {fields: ["LIST"]}
};

const inputBlocks = {
  variable: {fields: ["VARIABLE"]},
  listcontents: {fields: ["LIST"]}
};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};
