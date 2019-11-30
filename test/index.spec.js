describe('po', () => {

  const chat = po`.chat`;
  chat.title = chat` .title`;
  chat.messages = chat` .messages`;
  chat.messages.item = chat.messages` .item`;
  chat.messages.selectedItem = chat.messages.item`.item-selected`;
  chat.messages.item2 = chat.messages` .item2`;

  it('usual selectors', () => {
    assertPO(chat, '.chat');
    assertPO(chat.title, '.chat .title');
    assertPO(chat.messages, '.chat .messages');
    assertPO(chat.messages.item, '.chat .messages .item');
    assertPO(chat.messages.selectedItem, '.chat .messages .item.item-selected');
    assertPO(chat.messages.item2, '.chat .messages .item2');
  });

  it('pseudo selectors', () => {
    assertPO(chat`:focus`, '.chat:focus');
    assertPO(chat`:hover`, '.chat:hover');
    assertPO(chat.messages`:focus`, '.chat .messages:focus');
    assertPO(chat.messages`:hover`, '.chat .messages:hover');
    assertPO(chat.messages.item`:focus`, '.chat .messages .item:focus');
    assertPO(chat.messages.item`:hover`, '.chat .messages .item:hover');
  });

  it('return selector when called as function', () => {
    assertPO(chat(), '.chat');
    assertPO(chat.title(), '.chat .title');
    assertPO(chat.messages.item(), '.chat .messages .item');
    assertPO(chat.messages.item`:focus`(), '.chat .messages .item:focus');
  });

  it('insert variables as in normal string literal', () => {
    const n = 42;
    const focused = ':focus';
    chat.messages.item42 = chat.messages.item`:nth-child(${n})${focused}`;
    assertPO(chat.messages.item42, '.chat .messages .item:nth-child(42):focus');
  });

});
