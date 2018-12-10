const argument = require("./argument");
const control = require("./control");
const event = require("./event");
const looks = require("./looks");
const math = require("./math");
const motion = require("./motion");
const operator = require("./operator");
const procedures = require("./procedures");
const sensing = require("./sensing");
const sound = require("./sound");
const text = require("./text");

const mulang = require("../mulang");

const blockCategories = {
  argument, control, event, looks, math,
  motion, operator, procedures, sound, sensing, text
};

const regularBlocks = {}, inputBlocks = {};

for (let category in blockCategories) {
    regularBlocks[category] = blockCategories[category].regularBlocks || {};

    inputBlocks[category] = blockCategories[category].inputBlocks || {};
}

function getBlockContents(block) {
  let [category, normalizedOpcode] = block.opcode.split(/_(.+)/);
  let [blockStructure, parsingFunction] = getBlockStructure(category, normalizedOpcode);
  let blockInfo = {blockStructure, block, normalizedOpcode};
  return [blockStructure, parsingFunction(blockInfo)];
}

function getRegularBlockStructure(category, opcode) {
  let blockStructure = regularBlocks[category][opcode];
  if(!blockStructure) return;
  blockStructure.mulangTag = blockStructure.mulangTag || "Application";
  return [blockStructure, mulang.parseRegularBlock]
}

function getInputBlockStructure(category, opcode) {
  let blockStructure = inputBlocks[category][opcode] || inputBlocks[category]['defaultStructure'];
  return [blockStructure, mulang.parseInputBlock];
}

function getBlockStructure(category, opcode) {
  return getRegularBlockStructure(category, opcode) ||
    getInputBlockStructure(category, opcode);
}

module.exports = {
  getBlockContents: getBlockContents
};

/*
TODO

En el parser poder definir que cierto bloque debe ser de cierto tipo.
Muchas veces si metes sarasa en un bloque, te ejecuta el shadow pero eso es medio antipedagogico.

*/


