jest.mock('nodemailer');
const nodemailer = require('nodemailer');

const MailService = require('../../../app/services/MailService');

describe('Mail service test', () => {
  nodemailer.createTransport = jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockImplementation(({
      from, to, subject, html, text, attachments,
    }) => ({
      from, to, subject, html, text, attachments,
    })),
  }));
  beforeAll(async () => {
    MailService.connect({
      host: 'localhost',
      port: 25,
      user: 'test',
      pass: '12345',
      sequre: true,
    });
  });


  test('Test send email', async () => {
    const data = await MailService.send({
      from: 'from@test.com',
      to: 'to@mail.com',
      subject: 'Test',
      text: 'Text',
      html: 'html',
    });

    expect(data.from).toBe('from@test.com');
    expect(data.to).toBe('to@mail.com');
    expect(data.subject).toBe('Test');
    expect(data.text).toBe('Text');
    expect(data.html).toBe('html');
  });
});
