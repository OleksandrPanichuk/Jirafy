
## Backend (API)

The backend is built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

### Dependencies

- **@nestjs/common**: Common utilities and decorators for NestJS.
- **@nestjs/config**: Configuration module for NestJS.
- **@nestjs/core**: Core module for NestJS.
- **@nestjs/mailer**: Mailer module for NestJS.
- **@nestjs/prisma**: Prisma module for NestJS.
- **bcrypt**: Library for hashing passwords.
- **uuid**: Library for generating unique identifiers.
- **prisma**: ORM for database interactions.

### Configuration

Configuration files are located in the `api/config` directory:

- `cors.config.ts`: CORS configuration.
- `env.config.ts`: Environment variables configuration.
- `session.config.ts`: Session management configuration.

### Environment Variables

Environment variables are managed using a `.env` file located in the root directory. Key variables include:

- `DATABASE_URL`: URL for the database connection.
- `JWT_SECRET`: Secret key for JWT authentication.
- `MAIL_HOST`: SMTP host for email services.
- `MAIL_PORT`: SMTP port for email services.
- `MAIL_USER`: SMTP user for email services.
- `MAIL_PASS`: SMTP password for email services.

### Prisma

Prisma is used as the ORM for database interactions. The Prisma schema and migrations are located in the `api/prisma` directory.

### Email Templates

Email templates are located in the `api/emails` directory. For example, `reset-password.tsx` is used for the password reset email.

## Frontend (Web)

The frontend is built with [Next.js](https://nextjs.org/), a React framework for production.

### Dependencies

- **next**: The Next.js framework.
- **react**: React library.
- **react-dom**: React DOM library.
- **tailwindcss**: Utility-first CSS framework.
- **postcss**: Tool for transforming CSS with JavaScript plugins.

### Configuration

Configuration files are located in the `web` directory:

- `.env`: Environment variables.
- `next.config.mjs`: Next.js configuration.
- `postcss.config.mjs`: PostCSS configuration.
- `tailwind.config.ts`: Tailwind CSS configuration.

### Environment Variables

Environment variables are managed using a `.env` file located in the root directory. Key variables include:

- `NEXT_PUBLIC_API_URL`: URL for the backend API.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: Google Analytics ID for tracking.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/OleksandrPanichuk/Jirafy.git