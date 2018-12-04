let mulang = require('./mulang');
let reporter = {};

function getJsonAstUsing(stringifier) {
  return function(code) {
    return stringifier(code);
  }
}

reporter.getMulangAst = getJsonAstUsing(targets => {
  let mulangAst = mulang.parse(JSON.parse(targets));
  return JSON.stringify(mulangAst);
});

module.exports = reporter;
