let _ = require("lodash");
let targetBlocks;

function createNode(tag, contents) {
  return contents ? {tag, contents} : {tag};
}

function nextBlockFor(block) {
  return getBlock(block.next);
}

function getBlock(blockId) {
  return targetBlocks[blockId]
}

function parse(targets) {
  return targets.map(t => buildTargetAst(t.blocks));
}

function buildSequenceAst(topLevelBlock) {
  let siblings = getBlockSiblings(topLevelBlock);
  if (siblings.length) {
    return createNode("Sequence", [topLevelBlock, ...siblings].map(b => buildBlockAst(b)))
  } else {
    return buildBlockAst(topLevelBlock);
  }
}

function buildTargetAst(blocks) {
  targetBlocks = blocks;
  let topLevelBlocks = _.pickBy(blocks, b => b.topLevel);
  let topLevelSequence = [];
  _.forOwn(topLevelBlocks, block => { topLevelSequence.push(buildSequenceAst(block)) });
  return createNode("Sequence", topLevelSequence);
}

function hasSiblings(block) {
  /* Although it should be a substack, procedures body is implemented as sibling,
   so i had to introduce this exception; */
  return block.next && block.opcode !== 'procedures_definition';
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
  return createNode(blockStructure.mulangTag, contents);
}

function parseBlockInfo(blockInfo) {
  let contents = parseRegularBlock(blockInfo);
  return createNode(mulangTag, contents);
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
  let referenceName = blockInfo.blockStructure.applicationName || blockInfo.normalizedOpcode;
  return [
    createNode("Reference", referenceName),
    parseAttributes(blockInfo)
  ]
}

function parseField(input) {
  let fieldValue = input.value;
  return createNode("Reference", fieldValue); //TODO: parse field type
}

function parseInput(input) {
  let inputBlock = getInputBlock(input);
  return buildBlockAst(inputBlock);
}

function getInputBlock(input) {
  let inputBlockId = input.block || input.shadow; //TODO: validate if block has correct type.
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
    return createNode("MuNil");
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

function parseRepeat(blockInfo) {
  return [
    getExpression(blockInfo),
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
  return [
    parseEquationParams(blockInfo),
    parseEquationBody(blockInfo)
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
  let equationParams = getEquationParams(blockInfo)
  return equationParams.map( argument => createNode("VariablePattern", argument) );
}

function parseEquationBody(blockInfo) {
  let procedureBlock = getBlock(blockInfo.block.parent);
  return buildBlockAst(getBlock(procedureBlock.next))
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

let mulangTags = {
  "Application": parseApplication,
  "Repeat": parseRepeat,
  "While": parseRepeat,
  "If": parseIf,
  "Procedure": parseProcedure,
  "Equation": parseEquation,
  "MuNumber": parseMuNumber,
  "MuString": getContents
};


module.exports = {
  parse: parse,
  parseRegularBlock: parseRegularBlock,
  parseInputBlock: parseInputBlock
};

let blocksStructures = require("./blocks/blocks");
