let mathDefaultInputs = {inputs: ["NUM1", "NUM2"]};
let operandDefaultInputs = {inputs: ["OPERAND1", "OPERAND2"]};
let stringDefaultInputs = {inputs: ["STRING1", "STRING2"]};

const regularBlocks = {
  add: {applicationAlias: "+", ...mathDefaultInputs},
  subtract: {applicationAlias: "-", ...mathDefaultInputs},
  multiply: {applicationAlias: "*", ...mathDefaultInputs},
  divide: {applicationAlias: "/", ...mathDefaultInputs},
  lt: {applicationAlias: "<", ...operandDefaultInputs},
  equals: {applicationAlias: "=", ...operandDefaultInputs},
  gt: {applicationAlias: ">", ...operandDefaultInputs},
  and: {...operandDefaultInputs},
  or: {...operandDefaultInputs},
  not: {inputs: ["OPERAND"]},
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
