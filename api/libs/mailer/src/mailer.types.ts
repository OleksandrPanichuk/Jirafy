import { MessageAttachment } from 'mailgun.js';

export type MailMessageData = {
  to: string;
  subject: string;
  attachment?: MessageAttachment;
};
