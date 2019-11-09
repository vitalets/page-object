describe('po', () => {

  const chat = po`.chat`;
  chat.title = po`.title`;
  chat.messages = po`.messages`;
  chat.messages.item = po`.item`;
  chat.messages.item2 = po`.item2`;

  it('usual selectors', () => {
    assertPO(chat, '.chat');
    assertPO(chat.title, '.chat .title');
    assertPO(chat.messages, '.chat .messages');
    assertPO(chat.messages.item, '.chat .messages .item');
    assertPO(chat.messages.item2, '.chat .messages .item2');
  });

  it('pseudo selectors at the end', () => {
    assertPO(chat`:focus`, '.chat:focus');
    assertPO(chat`:hover`, '.chat:hover');
    assertPO(chat.messages`:focus`, '.chat .messages:focus');
    assertPO(chat.messages`:hover`, '.chat .messages:hover');
    assertPO(chat.messages.item`:focus`, '.chat .messages .item:focus');
    assertPO(chat.messages.item`:hover`, '.chat .messages .item:hover');
  });

  it('pseudo selectors in the middle', () => {
    assertPO(chat`:focus`.messages, '.chat:focus .messages');
    assertPO(chat.messages`:focus`.item, '.chat .messages:focus .item');
  });

  it('pseudo selectors everywhere', () => {
    assertPO(chat`:hover`.messages`:focus`, '.chat:hover .messages:focus');
    assertPO(chat`:focus`.messages`:hover`.item`:focus`, '.chat:focus .messages:hover .item:focus');
    assertPO(chat`:hover`.messages`:focus`.item`:hover`, '.chat:hover .messages:focus .item:hover');
  });

  it('return selector when called', () => {
    assertPO(chat(), '.chat');
    assertPO(chat.title(), '.chat .title');
    assertPO(chat.messages.item(), '.chat .messages .item');
    assertPO(chat.messages.item`:focus`(), '.chat .messages .item:focus');
  });

});
