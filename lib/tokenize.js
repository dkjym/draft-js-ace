var ace = require('ace-builds/src-noconflict/ace')
var Tokenizer = ace.require('ace/tokenizer').Tokenizer

function tokenize(code, mode) {
  var Mode = ace.require('ace/mode/' + mode).Mode
  var HighlightRules = (new Mode).HighlightRules
  var $rules = (new HighlightRules).$rules
  var tokenizer = new Tokenizer($rules)
  return tokenizer.getLineTokens(code).tokens
}

module.exports = tokenize