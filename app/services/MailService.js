const provider = require('nodemailer');

const config = require('@config').smtp;

class MailService {
  constructor() {
    this.setupMailProvider({
      host: config.host,
      port: config.port,
      secure: config.sequre === true,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  setupMailProvider(smtpConfig) {
    this._serviceProvider = provider;
    this.smtpConfig = smtpConfig;
    this.transport = this._serviceProvider.createTransport(this.smtpConfig);

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
