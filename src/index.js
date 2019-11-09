/**
 * Page object building library.
 */

const createPO = (parent, shouldCopyProps = false) => (strings, ...keys) => {
  const ownSelector = strings.reduce((acc, str, i) => `${acc}${str}${keys[i] || ''}`, '');
  const wrappedFn = new Proxy(() => {}, {
    get(obj, prop) {
      if (prop === 'toString' || prop === 'toJSON') {
        return () => joinSelectors(parent, ownSelector);
      }
      if (prop === 'getOwnSelector') {
        return () => ownSelector;
      }
      return obj[prop];
    },
    set(obj, prop, value) {
      obj[prop] = createPO(wrappedFn)([value]);
      return true;
    },
    apply(obj, thisArg, argumentsList) {
      return argumentsList.length === 0
        // call without arguments: return string value
        ? wrappedFn.toString()
        // call with arguments: parse template literal and create new PO cloned from current
        : createPO(wrappedFn, true)(...argumentsList);
    }
  });

  if (parent && shouldCopyProps) {
    copyProps(parent, wrappedFn);
  }

  return wrappedFn;

};

const joinSelectors = (s1, s2) => {
  return `${s1}${s2.startsWith(':') ? '' : ' '}${s2}`.trim();
};

const copyProps = (from, to) => {
  Object.keys(from).forEach(key => {
    to[key] = from[key].getOwnSelector();
    copyProps(from[key], to[key]);
  });
};

module.exports = createPO('');

/*
const chat = po`.chat`; // parent = '', ownSelector = '.chat'
chat.title = po`.title`; // parent = null, ownSelector = '.messages'
chat.messages = po`.messages`; // parent = null, ownSelector = '.messages'
chat.messages.item = po`.item`; // parent = chat, ownSelector = '.messages', props = [item]
chat.messages.item2 = po`.item2`; // parent = chat, ownSelector = '.messages', props = [item, item2]

const myVar = chat.messages;
const myVar2 = chat.messages`:focus`.item2;

test(chat, '.chat');
test(chat(), '.chat');
test(chat`:focus`, '.chat:focus');
test(chat`:hover`, '.chat:hover');
test(chat.title, '.chat .title');
test(chat.messages, '.chat .messages');
test(chat.messages`:focus`, '.chat .messages:focus');
test(chat.messages`:hover`, '.chat .messages:hover');
test(chat`:focus`.messages`:focus`, '.chat:focus .messages:focus');
test(chat`:hover`.messages`:hover`, '.chat:hover .messages:hover');
test(chat.messages.item, '.chat .messages .item');
test(chat.messages.item2, '.chat .messages .item2');
test(chat.messages.item`:focus`, '.chat .messages .item:focus');
test(chat.messages.item`:hover`, '.chat .messages .item:hover');
test(chat.messages`:hover`, '.chat .messages:hover');
test(chat`:focus`.messages`:focus`.item`:focus`, '.chat:focus .messages:focus .item:focus');
test(chat`:focus`.messages`:focus`.item2`:focus`, '.chat:focus .messages:focus .item2:focus');

test(myVar, '.chat .messages');
test(myVar2, '.chat .messages:focus .item2');

function test(actual, expected) {
  console.log(expected === actual.toString(), `"${expected}" = "${actual}"`);
}
*/

