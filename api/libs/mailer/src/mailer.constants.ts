import Invitation from '@emails/invitation';
import ResetPassword from '@emails/reset-password';
import VerifyEmail from '@emails/verify-email';

export enum EmailTemplates {
  RESET_PASSWORD = 'reset-password',
  VERIFY_EMAIL = 'verify-email',
  INVITATION = 'invitation',
}

export const TemplatesMatch: Record<
  EmailTemplates,
  (...props: any) => JSX.Element
> = {
  [EmailTemplates.RESET_PASSWORD]: ResetPassword,
  [EmailTemplates.VERIFY_EMAIL]: VerifyEmail,
  [EmailTemplates.INVITATION]: Invitation,
};
