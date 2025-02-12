import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import { EmailTemplates, TemplatesMatch } from './mailer.constants';
import { MailMessageData } from './mailer.types';

@Injectable()
export class MailerService {
  private client = new Mailgun(FormData).client({
    username: 'api',
    key: this.config.get('MAILGUN_API_KEY'),
  });

  private readonly logger = new Logger(MailerService.name);
  private transporter: Transporter;

  constructor(private config: ConfigService) {
    this.transporter = createTransport({
      host: config.get('MAIL_HOST'),
      secure: true,
      port: parseInt(config.get<string>('MAIL_PORT') ?? ''),
      auth: {
        user: config.get<string>('MAIL_USER'),
        pass: config.get<string>('MAIL_PASSWORD'),
      },
      from: config.get<string>('MAIL_FROM'),
    });

    this.verifyTransporter();
  }

  private verifyTransporter() {
    if (!this.transporter.verify) return;
    Promise.resolve(this.transporter.verify())
      .then(() => this.logger.debug(`Transporter is ready`))
      .catch((error) =>
        this.logger.error(
          `Error occurred while verifying the transporter: ${error.message}`,
        ),
      );
  }

  public async sendMail(
    template: EmailTemplates,
    mailOptions: Omit<SendMailOptions, 'html'>,
    data: any,
  ) {
    try {
      const Component = TemplatesMatch[template];

      const emailHtml = await render(<Component {...data} />);

      return this.transporter.sendMail(
        { ...mailOptions, html: emailHtml },
        (err) => {
          if (err) {
            this.logger.error(err.message);
          }
        },
      );
    } catch (err) {
      this.logger.error('Failed to send email', { error: err });
    }
  }

  public async sendHTML(
    template: EmailTemplates,
    options: MailMessageData,
    data?: any,
  ) {
    try {
      const Component = TemplatesMatch[template];

      const emailHtml = await render(<Component {...data} />);
      return await this.client.messages.create(
        this.config.get('MAILGUN_DOMAIN'),
        {
          from: `Jirafy <jirafy@${this.config.get('MAILGUN_DOMAIN')}>`,
          html: emailHtml,
          ...options,
        },
      );
    } catch (err) {
      console.log(err);
    }
  }
}
