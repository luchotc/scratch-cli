let should = require("should");
let _ = require("lodash");
let glob = require("glob");
let path = require("path");

let mulang = require("../src/mulang");
let mulangjs = require("mulang");

function getMulangAst(scratchAst) {
  let content = scratchAst.content;
  return mulang.parse(content);
}

function analyseWithMulang(ast, expectations = []) {
  return mulangjs.analyse({
    "sample" : {
      "tag": "MulangSample",
      "ast": ast
    },
    "spec": {
      "expectations": expectations,
      "smellsSet": {
        "tag": 'AllSmells',
      }
    }
  })
}

let fixtures = [];

glob.sync('test/fixtures/*.json').forEach(function(file) {
  let scratchAst = require(path.resolve(file));
  let fileName = file.split("/").reverse()[0];
  fixtures.push({scratchAst: scratchAst, file: fileName});
});

fixtures.forEach(function({scratchAst, file}) {
  describe(`The file ${file}`, function() {
    it('generates a valid Mulang ast', function() {
      let mulangAst = getMulangAst(scratchAst);
      analyseWithMulang(mulangAst);
    });
  });
});

