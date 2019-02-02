# draft-js-ace

`draft-js-ace` is a decorator for DraftJS to highlight code blocks using [Ace](https://github.com/ajaxorg/ace).

![Ace](./preview.gif)

## Installation

```
$ npm install draft-js-ace
```

## Usage

```js
import Draft from 'draft-js'
import AceDecorator from 'draft-js-ace'

const decorator = new AceDecorator({
  mode: 'javascript', // Default is javascript.
  theme: 'monokai', // Default is monokai.
  filter: // Your filter function. Only applies syntax highlight to code-blocks by default.
});

const editorState = Draft.EditorState.createEmpty(decorator)
```

You'll also need to wrap your Editor Component like this:

```js
<div className='ace-[put theme name here]'>
  <Editor />
</div>
```