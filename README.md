# @vitalets/page-object
[![Actions Status](https://github.com/vitalets/pageobject/workflows/autotests/badge.svg)](https://github.com/vitalets/pageobject/actions)
[![npm](https://img.shields.io/npm/v/@vitalets/page-object.svg)](https://www.npmjs.com/package/@vitalets/page-object)
[![license](https://img.shields.io/npm/l/@vitalets/page-object.svg)](https://www.npmjs.com/package/@vitalets/page-object)

A library for building Page Object CSS selectors for UI testing.

## Installation
```bash
npm install -D @vitalets/page-object
```

## Usage
The syntax is based on [Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates).
It makes code short and readable:
```js
const po = require('@vitalets/page-object');

const chat = po`.chat`;                                 // => '.chat'
chat.title = chat` h2`;                                 // => '.chat h2'
chat.messages = chat` .messages`;                       // => '.chat .messages'
chat.messages.item = chat.messages` li`;                // => '.chat .messages li'
chat.messages.focusedItem = chat.messages.item`:focus`; // => '.chat .messages li:focus'
```

You can also attach selectors dynamically in tests:
```js
await page.click(chat.messages.item`:focus`);
```

## Converting to string
Any created page-object is actually a function - this is required for tagged templates.
If you pass page-object to `console.log`, you will not get just a string,
because `console.log` does not call `toString()` method automatically:
```js
console.log(chat.title); // => { [Function: ".chat h2"] toJSON: [Function], toString: [Function] }
```
Although there is a selector in function name that is useful for debugging.

To explicitly convert page-object to string - call it as a function without arguments:
```js
console.log(chat.title()); // => '.chat h2'
```


## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
