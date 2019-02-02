var Draft = require('draft-js')
var expect = require('expect')

var AceDecorator = require('..')

describe('AceDecorator', function() {
  it('should use default mode', function() {
    var block = new Draft.ContentBlock({
      type: 'code-block',
      text: 'var a = "test"'
    })

    var decorator = new AceDecorator()
    var out = decorator.getDecorations(block)
    expect(out.toJS()).toEqual([
      "-tok0", "-tok0", "-tok0",
      "-tok1", 
      "-tok2",
      "-tok3",
      "-tok4",
      "-tok5",
      "-tok6", "-tok6", "-tok6", "-tok6", "-tok6", "-tok6",
    ])
  })

  it('should use specified mode', function() {
    var block = new Draft.ContentBlock({
      type: 'code-block',
      text: 'a := "test"'
    })

    var decorator = new AceDecorator({ mode: 'golang' })
    var out = decorator.getDecorations(block)
    expect(out.toJS()).toEqual([
      "-tok0",
      "-tok1",
      "-tok2", 
      "-tok3",
      "-tok4",
      "-tok5", "-tok5", "-tok5", "-tok5", "-tok5", "-tok5",
    ])
  })

  it('should not decorate none code-block by default', function() {
    var block = new Draft.ContentBlock({
      text: 'var a = "test"'
    })

    var decorator = new AceDecorator()
    var out = decorator.getDecorations(block)
    expect(out.toJS()).toEqual([
      null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    ])
  })
})