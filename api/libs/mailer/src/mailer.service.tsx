import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { EmailTemplates, TemplatesMatch } from './mailer.constants';
import { MailMessageData } from './mailer.types';

@Injectable()
export class MailerService {
  private client = new Mailgun(FormData).client({
    username: 'api',
    key: this.config.get('MAILGUN_API_KEY'),
  });

  constructor(private readonly config: ConfigService) {}

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
