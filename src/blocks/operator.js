let mathDefaultInputs = {inputs: ["NUM1", "NUM2"]};
let operandDefaultInputs = {inputs: ["OPERAND1", "OPERAND2"]};
let stringDefaultInputs = {inputs: ["STRING1", "STRING2"]};

const regularBlocks = {
  add: {methodAlias: "+", ...mathDefaultInputs},
  subtract: {methodAlias: "-", ...mathDefaultInputs},
  multiply: {methodAlias: "*", ...mathDefaultInputs},
  divide: {methodAlias: "/", ...mathDefaultInputs},
  lt: {methodAlias: "<", ...operandDefaultInputs},
  equals: {methodAlias: "=", ...operandDefaultInputs},
  gt: {methodAlias: ">", ...operandDefaultInputs},
  and: {methodAlias: "&&", ...operandDefaultInputs},
  or: {methodAlias: "||", ...operandDefaultInputs},
  not: {methodAlias: "!", inputs: ["OPERAND1"]},
  random: {inputs: ["FROM", "TO"]},
  join: stringDefaultInputs,
  letter_of: {inputs: ["LETTER", "STRING"]},
  length: {inputs: ["STRING"]},
  contains: stringDefaultInputs,
  mod: mathDefaultInputs,
  round: {inputs: ["NUM"]},
  mathop: {inputs: ["NUM"], fields: ["OPERATOR"]}
};

const inputBlocks = {

};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};
