class MessageService {
  constructor(app) {
    this.app = app;
  }

  async add({
    customerId,
    type,
    title,
    message,
  }) {
    const newMessage = {
      customerId,
      type,
      title,
      message,
    };
    this.app.pubsub.publish('newMessage', { messageAdded: newMessage });
    this.app.logger.info('MessageService (add): %s', customerId);
    return newMessage;
  }
}

module.exports = MessageService;
