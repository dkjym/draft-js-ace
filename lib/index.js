var Immutable = require('immutable')
var React = require('react')
var tokenize = require('./tokenize')
var Options = require('./options');
var ace = require('ace-builds/src-noconflict/ace')

function AceDecorator(options) {
  this.options = Options(options || {});
  this.highlighted = {};

  require('ace-builds/src-noconflict/mode-' + this.options.get('mode'))
  require('ace-builds/src-noconflict/theme-' + this.options.get('theme'))
}

AceDecorator.prototype.getDecorations = function(block) {
  var tokens, token, tokenId, resultId, offset = 0, tokenCount = 0
  var filter = this.options.get('filter')
  var mode = this.options.get('mode')
  var theme = this.options.get('theme')
  var blockKey = block.getKey()
  var blockText = block.getText()
  var decorations = Array(blockText.length).fill(null)
  var highlighted = this.highlighted

  highlighted[blockKey] = {}

  if (!filter(block)) {
    return Immutable.List(decorations);
  }

  tokens = tokenize(blockText, mode)

  function processToken(decorations, token, offset) {
    tokenId = 'tok' + (tokenCount++)
    resultId = blockKey + '-' + tokenId
    highlighted[blockKey][tokenId] = token
    occupySlice(decorations, offset, offset + token.value.length, resultId)
  }

  for (var i = 0; i < tokens.length; i++) {
    token = tokens[i]
    processToken(decorations, token, offset)
    offset += token.value.length
  }
  return Immutable.List(decorations)
}

AceDecorator.prototype.getComponentForKey = function() {
  return function(props) {
    var types = props.type.split('.')
    var classNames = []
    for (var i = 0; i < types.length; i++) {
      classNames[i] = 'ace_' + types[i]
    }
    return React.createElement(
      "span",
      { className: classNames.join(' ') },
      props.children,
    )
  }
}

AceDecorator.prototype.getPropsForKey = function(key) {
  var parts = key.split('-')
  var blockKey = parts[0]
  var tokId = parts[1]
  var token = this.highlighted[blockKey][tokId]

  return {
    type: token.type,
  }
}

function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey
  }
}

module.exports = AceDecorator