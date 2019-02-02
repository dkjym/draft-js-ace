var Immutable = require('immutable')

function defaultFilter(block) {
  return block.getType() === 'code-block'
}

var Options = Immutable.Record({
  // Default mode to use
  mode: 'javascript',

  // Default theme to use
  theme: 'monokai',

  // Filter block before highlighting
  filter: defaultFilter,
});

module.exports = Options