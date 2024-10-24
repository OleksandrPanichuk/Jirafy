import { default as ResetPassword } from '@emails/reset-password';
import { default as VerifyEmail } from '@emails/verify-email';

export enum EmailTemplates {
  RESET_PASSWORD = 'reset-password',
  VERIFY_EMAIL = 'verify-email',
}

export const TemplatesMatch: Record<
  EmailTemplates,
  (...props: any) => JSX.Element
> = {
  [EmailTemplates.RESET_PASSWORD]: ResetPassword,
  [EmailTemplates.VERIFY_EMAIL]: VerifyEmail,
};
