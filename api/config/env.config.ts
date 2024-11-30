import * as Yup from 'yup';

export const envSchema = Yup.object().shape({
  PORT: Yup.number().default(8080),
  DATABASE_URL: Yup.string().required(),
  GOOGLE_CLIENT_ID: Yup.string().required(),
  GOOGLE_CLIENT_SECRET: Yup.string().required(),
  GITHUB_CLIENT_ID: Yup.string().required(),
  GITHUB_CLIENT_SECRET: Yup.string().required(),
  MAILGUN_API_KEY: Yup.string().required(),
  TOKEN_EXPIRATION: Yup.number().optional(),
  JWT_SECRET: Yup.string().required(),
  CLOUDINARY_CLOUD_NAME: Yup.string().required(),
  CLOUDINARY_API_KEY: Yup.string().required(),
  CLOUDINARY_API_SECRET: Yup.string().required(),
  CLOUDINARY_FOLDER: Yup.string().required(),
});
