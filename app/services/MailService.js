const provider = require('nodemailer');

class MailService {
  constructor(config) {
    this.setupMailProvider(config);
  }

  setupMailProvider(config) {
    this._serviceProvider = provider;
    this.config = config;
    this.transport = this._serviceProvider.createTransport(this.config);

    return this.transport;
  }

  async send({
    from, to, subject, html, text, attachments,
  }) {
    await this.transport.sendMail({
      from,
      to,
      subject,
      html,
      text,
      attachments,
    });
  }
}

module.exports = new MailService();
