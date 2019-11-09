# pageobject
[![npm](https://img.shields.io/npm/v/pageobject.svg)](https://www.npmjs.com/package/pageobject)
[![license](https://img.shields.io/npm/l/pageobject.svg)](https://www.npmjs.com/package/pageobject)

A library for building Page Object CSS selectors for your testing framework.

## Installation
```bash
npm install -D pageobject
```

## Usage
The syntax is based on [Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates).
It makes code shorter and readable:

```js
const po = require('pageobject');

const chat = po`.chat`;                // => '.chat'
chat.title = po`h2`;                   // => '.chat h2'
chat.messages = po`.messages`;         // => '.chat .messages'
chat.messages.item = po`.messages li`; // => '.chat .messages li'
```

The main power is that you can apply pseudo-selectors later in your tests:
```js
chat`:disabled`             // => '.chat:disabled'
chat.title`:focused`        // => '.chat h2:focused'
chat.messages.item`:last-child`  // => '.chat .messages li:last-child'
```

Even several extra pseudo-selectors in one line:
```js
chat`:disabled`.messages.item`:last-child` // => '.chat:disabled .messages li:last-child'
```

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
