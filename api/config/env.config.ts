import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().default(8080),
  DATABASE_URL: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GITHUB_CLIENT_ID: Joi.string().required(),
  GITHUB_CLIENT_SECRET: Joi.string().required(),
  MAILGUN_API_KEY: Joi.string().required(),
  TOKEN_EXPIRATION: Joi.number().optional(),
  JWT_SECRET: Joi.string().required(),

  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  CLOUDINARY_FOLDER: Joi.string().required(),
});
