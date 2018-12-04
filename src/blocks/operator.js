let mathDefaultInputs = {inputs: ["NUM1", "NUM2"]};
let operandDefaultInputs = {inputs: ["OPERAND1", "OPERAND2"]};
let stringDefaultInputs = {inputs: ["STRING1", "STRING2"]};

const regularBlocks = {
  add: {applicationName: "+", ...mathDefaultInputs},
  subtract: {applicationName: "-", ...mathDefaultInputs},
  multiply: {applicationName: "*", ...mathDefaultInputs},
  divide: {applicationName: "/", ...mathDefaultInputs},
  lt: {applicationName: "<", ...operandDefaultInputs},
  equals: {applicationName: "=", ...operandDefaultInputs},
  gt: {applicationName: ">", ...operandDefaultInputs},
  and: {applicationName: "&&", ...operandDefaultInputs},
  or: {applicationName: "||", ...operandDefaultInputs},
  not: {applicationName: "!", inputs: ["OPERAND1"]},
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
