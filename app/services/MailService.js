const provider = require('nodemailer');

class MailService {
  constructor() {
    this.connections = [];
    this.provider = provider;
  }

  connect(config, nameConnection = 'default') {
    const connection = this.connections.find(conn => conn.name === nameConnection);

    if (connection) {
      throw new Error('Connection already exists');
    }

    this.connections.push({
      name: nameConnection,
      transport: this.provider.createTransport(config),
      config,
    });
  }

  async send({
    from, to, subject, html, text, attachments,
  }, nameConnection = 'default') {
    try {
      const connection = this.connections.find(conn => conn.name === nameConnection);

      if (!connection) {
        throw new Error('Not found mail connection');
      }

      await connection.transport.sendMail({
        from,
        to,
        subject,
        html,
        text,
        attachments,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MailService();
