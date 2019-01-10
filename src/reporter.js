let mulang = require('./mulang');
let reporter = {};

function getJsonAstUsing(stringifier) {
  return function(code) {
    return stringifier(code);
  }
}

reporter.getMulangAst = getJsonAstUsing(solution => {
  let solutionContent = JSON.parse(solution).content;
  let mulangAst = mulang.parse(solutionContent);
  return JSON.stringify(mulangAst);
});

module.exports = reporter;

