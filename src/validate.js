const validateChannelName = (name) => {
  if (name === '') {
    return 'Required';
  }

  const value = name.trim();
  if (!/[\p{L}\d]/u.test(value)) {
    return 'Must have letters or numbers';
  }
  if (value.length < 3 || value.length > 20) {
    return 'Must be 3 to 20 characters long';
  }

  return null;
};

const validateChatMessage = (message) => (message.trim() === '' ? 'Required' : null);

const validators = {
  channelName: validateChannelName,
  chatMessage: validateChatMessage,
};

export default (type) => validators[type];
