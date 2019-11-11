# @vitalets/page-object
[![Actions Status](https://github.com/vitalets/pageobject/workflows/autotests/badge.svg)](https://github.com/vitalets/pageobject/actions)
[![npm](https://img.shields.io/npm/v/@vitalets/page-object.svg)](https://www.npmjs.com/package/@vitalets/page-object)
[![license](https://img.shields.io/npm/l/@vitalets/page-object.svg)](https://www.npmjs.com/package/@vitalets/page-object)

A framework-agnostic library for building Page Object CSS selectors.

## Installation
```bash
npm install -D @vitalets/page-object
```

## Usage
The syntax is based on [Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates).
It makes code shorter and readable:

```js
const po = require('@vitalets/page-object');

const chat = po`.chat`;                // => '.chat'
chat.title = po`h2`;                   // => '.chat h2'
chat.messages = po`.messages`;         // => '.chat .messages'
chat.messages.item = po`.messages li`; // => '.chat .messages li'
```

The main power - you can apply pseudo-selectors later in your tests:
```js
chat`:disabled`                  // => '.chat:disabled'
chat.title`:focused`             // => '.chat h2:focused'
chat.messages.item`:last-child`  // => '.chat .messages li:last-child'
```

Even several extra pseudo-selectors in one line:
```js
chat`:disabled`.messages.item`:last-child` // => '.chat:disabled .messages li:last-child'
```

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
