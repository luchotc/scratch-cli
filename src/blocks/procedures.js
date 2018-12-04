const regularBlocks = {
  definition: {inputs: ["custom_block"], mulangTag: "Procedure"},
  prototype: {mulangTag: "Equation"},
  call: {unstructured: true}
};

const inputBlocks = {

};

module.exports = {
  inputBlocks: inputBlocks,
  regularBlocks: regularBlocks
};

/*

function foo(x, y) { }

(Function "foo"
  [(Equation
      [(VariablePattern "x"), (VariablePattern "y")]
      (UnguardedBody MuNil))])




 */
