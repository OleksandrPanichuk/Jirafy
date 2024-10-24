import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import FormData from 'form-data';
import Mailgun, { MailgunMessageData } from 'mailgun.js';
import { EmailTemplates, TemplatesMatch } from './mailer.constants';

@Injectable()
export class MailerService {
  private client = new Mailgun(FormData).client({
    username: 'api',
    key: this.config.get('MAILGUN_API_KEY'),
  });

  constructor(private readonly config: ConfigService) {}

  public async sendWithMailgun(
    template: EmailTemplates,
    options: Omit<MailgunMessageData, 'from' | 'html'>,
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
