let _ = require("lodash");
let targetBlocks;

function createNode(tag, contents) {
  if(tag === "Equation") return [contents];
  return contents !== undefined ? {tag, contents} : {tag};
}

function nextBlockFor(block) {
  return getBlock(block.next);
}

function getBlock(blockId) {
  return targetBlocks[blockId]
}

function parse(solution) {
  let targetsContents = Object.values(solution.targets).map(target => buildTargetAst(target));
  return createNode("Sequence", targetsContents);
}

function buildTargetVariables(target) {
  let variables = buildVariables(target.variables, buildVariable);
  let lists = buildVariables(target.lists, buildList);
  return [...lists, ...variables];
}

function buildVariables(variables = {}, buildFunction) {
  return Object.values(variables).map(variable => buildFunction(variable[0]));
}

function buildList(name) {
  return buildVariable(name, createNode("MuList", []));
}

function buildVariable(name, contents) {
  return createNode("Variable", [
    name,
    contents || createNode("None")
  ]);
}

function buildSequenceAst(topLevelBlock) {
  if (!topLevelBlock) return createNode("None");
  let siblings = getBlockSiblings(topLevelBlock);
  if (siblings.length) {
    return createNode("Sequence", [topLevelBlock, ...siblings].map(b => buildBlockAst(b)))
  } else {
    return buildBlockAst(topLevelBlock);
  }
}

function buildTargetAst(target) {
  targetBlocks = target.blocks;
  let topLevelBlocks = _.pickBy(targetBlocks, b => b.topLevel);
  let topLevelSequence = [];
  _.forOwn(topLevelBlocks, block => {
    if(blocksStructures.validTopLevelBlock(block)){
      topLevelSequence.push(buildSequenceAst(block))
    }
  });
  topLevelSequence =  topLevelSequence.concat(buildTargetVariables(target));
  return buildEntryPoint(target.name, createNode("Sequence", topLevelSequence));
}

function hasSiblings(block) {
  return block.next && !hasImplicitSubstack(block.opcode);
}

function hasImplicitSubstack(opcode){
  /* Although it should be a substack, the procedure's body blocks are implemented
  as siblings, so this exception is needed; */
  return opcode === 'procedures_definition' || opcode.startsWith('event_when');
}

function getBlockSiblings(block) {
  const siblings = [];
  while (hasSiblings(block)){
    block = nextBlockFor(block);
    siblings.push(block);
  }
  return siblings;
}

function buildBlockAst(block) {
  let [blockStructure, contents] = blocksStructures.getBlockContents(block);
  let mulangTag = blockStructure.mulangTag;
  if(mulangTag) {
    return createNode(blockStructure.mulangTag, contents);
  } else {
    return contents[0];
  }
}

function parseRegularBlock(blockInfo) {
  let mulangTag = blockInfo.blockStructure.mulangTag;
  let parsingFunction = parseMulangTag(mulangTag);
  return parsingFunction(blockInfo);
}

function parseMulangTag(mulangTag) {
  return mulangTags[mulangTag];
}

function parseApplication(blockInfo) {
  let referenceName = blockInfo.blockStructure.applicationAlias || blockInfo.normalizedOpcode;
  return [
    createNode("Reference", referenceName),
    parseAttributes(blockInfo)
  ]
}

function parseField(input) {
  let fieldValue = input.value;
  return createNode("Reference", fieldValue);
}

function parseInput(input) {
  let inputBlock = getInputBlock(input);
  if (!inputBlock) return createNode("MuNil");
  return buildSequenceAst(inputBlock);
}

function getInputBlock(input) {
  let inputBlockId = input.block || input.shadow;
  return targetBlocks[inputBlockId];
}

function parseInputBlock(blockInfo) {
  if(blockInfo.blockStructure.mulangTag){
    return parseRegularBlock(blockInfo);
  }
  else {
    return parseAttributes(blockInfo);
  }
}

function parseBlockInputs(attributes = [], block) {
  return attributes.map(attr => doParseInput(attr, block))
}

function parseBlockFields(attributes = [], block) {
  return attributes.map(attr => doParseField(attr, block))
}

function doParseInput(attribute, block) {
  return parseAttribute(attribute, block, parseInput, 'inputs');
}

function doParseField(attribute, block) {
  return parseAttribute(attribute, block, parseField, 'fields');
}

function parseAttribute(attr, block, parseFunction, type) {
  let attribute = block[type][attr];
  if (attribute) {
    return parseFunction(attribute);
  } else {
    return createNode("None");
  }
}

function parseAttributes(blockInfo) {
  let {blockStructure, block} = blockInfo;
  let parsedFields = parseBlockFields(blockStructure.fields, block);
  let parsedInputs = parseBlockInputs(getBlockInputs(blockStructure, block), block);
  return [...parsedFields, ...parsedInputs];
}

function getBlockInputs(blockStructure, block) {
  if(blockStructure.unstructured) {
    return Object.keys(block.inputs);
  }
  else {
    return blockStructure.inputs;
  }
}

function getExpression(blockInfo) {
  let attributes = parseAttributes(blockInfo);
  return attributes[0];
}

function getContents(blockInfo) {
  return getExpression(blockInfo).contents;
}

function parseMuNumber(blockInfo) {
  return parseFloat(getContents(blockInfo));
}

function getRepeatExpression(blockInfo) {
  // Forever is parsed as while true as mulang doesn't support it natively
  if(blockInfo.normalizedOpcode === "forever"){
    return createNode("MuBool", true);
  } else {
    return getExpression(blockInfo)
  }
}

function parseRepeat(blockInfo) {
  return [
    getRepeatExpression(blockInfo),
    doParseInput("SUBSTACK", blockInfo.block)
  ]
}

function parseIf(blockInfo) {
  return [
    getExpression(blockInfo),
    doParseInput("SUBSTACK", blockInfo.block),
    doParseInput("SUBSTACK2", blockInfo.block)
  ]
}

function parseEquation(blockInfo) {
  let procedureBlock = getBlock(blockInfo.block.parent);
  return [
    parseEquationParams(blockInfo),
    parseEquationBody(procedureBlock)
  ]
}

function parseProcedure(blockInfo) {
  return [
    getProcedureName(blockInfo),
    doParseInput("custom_block", blockInfo.block),
  ];
}

function getProcedurePrototype(blockInfo) {
  return getBlock(blockInfo.block.inputs.custom_block.block);
}

function parseEquationParams(blockInfo) {
  let equationParams = getEquationParams(blockInfo);
  return equationParams.map( argument => createNode("VariablePattern", argument) );
}

function parseEquationBody(block) {
  let bodyContents = buildSequenceAst(nextBlockFor(block));
  return createNode("UnguardedBody", bodyContents);
}


function getEquationParams(blockInfo) {
  return JSON.parse(blockInfo.block.mutation.argumentnames);
}

// "proc test %s %b foo %b" is parsed as "proc test foo"
function parseProcedureName(prototypeBlock) {
  let procCode = prototypeBlock.mutation.proccode;
  return procCode.replace(/%./g, '').replace(/\s+/g, ' ').trim();
}

function getProcedureName(blockInfo) {
  let prototypeBlock = getProcedurePrototype(blockInfo);
  return parseProcedureName(prototypeBlock);
}

function buildEntryPoint(name, contents) {
  return createNode("EntryPoint", [name, contents]);
}

function parseAssignment(blockInfo) {
  return [
    getContents(blockInfo),
    doParseInput("VALUE", blockInfo.block)
  ]

}

function parseReference(blockInfo) {
  return blockInfo.normalizedOpcode;
}

function parseEntryPoint(blockInfo) {
  return [
    getListenerNormalizedName(blockInfo),
    buildSequenceAst(nextBlockFor(blockInfo.block))
  ]
}

/* This function generates the name of a listener by replacing the $N tokens, with the
   attributes that are located at the N position.
   For example the name of when_greater_than block is defined as when_$0_greater_than_$1
   so $0 is replaced by the first argument and $1 by the second one
*/

function normalizeListenerName(listenerName, attributes) {
  let normalizingRegex = new RegExp("\\$.", "g");
  return listenerName.replace(normalizingRegex, (token) => {
    let attributeIndex = token[1];
    let attribute = attributes[attributeIndex];
    return attribute instanceof Object ? "custom_block" : attribute.toString().toLowerCase();
  });
}


function getListenerNormalizedName(blockInfo) {
  let attributes = parseAttributes(blockInfo).map(attr => attr.contents);
  let customNamePlaceholder = blockInfo.blockStructure.customName;
  return normalizeListenerName(customNamePlaceholder, attributes);
}

let mulangTags = {
  "Application": parseApplication,
  "Reference": parseReference,
  "Repeat": parseRepeat,
  "While": parseRepeat,
  "If": parseIf,
  "Procedure": parseProcedure,
  "Equation": parseEquation,
  "MuNumber": parseMuNumber,
  "MuString": getContents,
  "Assignment": parseAssignment,
  "EntryPoint": parseEntryPoint
};


module.exports = {
  parse: parse,
  parseRegularBlock: parseRegularBlock,
  parseInputBlock: parseInputBlock
};

let blocksStructures = require("./blocks/blocks");
