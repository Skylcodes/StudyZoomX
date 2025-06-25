# Introduction

Next 15 starter kit designed to accelerate the development of modern web-based applications. It provides a robust foundation for creating efficient, scalable and high-performance solutions.

# Quickstart

Get started in about 30 minutes by following these steps.

## Preparation

1. **Unpack the Archive**

2. **Switch to the project's root directory**

```bash
cd basic-next-prisma-authjs
```

2. **Install the node dependencies**

```bash
npm install
```

3. **Copy the sample configuration**

```bash
cp .env.example .env
```

## Services

### Database

#### Docker

If you're using Docker for local development, you can start a PostgreSQL container with the following command.

```bash
docker compose up -d
```

#### Install PostgreSQL

1.  Install PostgreSQL via Homebrew, Chocolatey or download it from the [website](https://www.postgresql.org/download/).

```bash
brew install postgresql
```

2.  Add an initial user.

```bash
sudo -u postgres psql
CREATE USER postgres WITH PASSWORD 'password';
ALTER USER postgres WITH SUPERUSER;
\q
```

3.  Update `.env` with your database credentials.

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/achromatic_pro?schema=public
```

4. Apply the database migrations.

```bash
npx prisma migrate dev
```

### Google Login (Optional)

1. Visit the [Google Cloud Console](https://console.cloud.google.com/).
2. Create an account if you don't have one already.
3. Navigate to APIs or [click here](https://console.cloud.google.com/apis)
4. Configure the `OAuth consent screen` and add yourself as test user.
5. Click on `Credentials`, create new OAuth credentials and save those credentials.
6. Add the Authorized JavaScript origin to the credential settings.

```bash
http://localhost:3000
```

7. Add the Authorized redirect URI to the credential settings.

```bash
http://localhost:3000/api/auth/callback/google
```

8. Update `.env` with the created credentials.

```bash
AUTH_GOOGLE_CLIENT_ID=
AUTH_GOOGLE_CLIENT_SECRET=
```

### Microsoft Login (Optional)

1. Visit the [Azure Portal](https://portal.azure.com/).
2. Create an account if you don't have one already.
3. Navigate to your Entra ID (Active Directory).
4. Register a new application with platform web.
5. Click on `Authentication` in the menu and add the redirect URIs

```bash
http://localhost:3000
http://localhost:3000/api/auth/callback/microsoft-entra-id
```

6. Under `Certificates & Secrets`, create a new client secret.
7. Update `.env` with the created secret.

```bash
AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID=
AUTH_MICROSOFT_ENTRA_ID_CLIENT_SECRET=
```

### Stripe

1. Visit the [Stripe Dashboard](https://dashboard.stripe.com/).
2. Create an account if you don't have one already.
3. Activate test mode.
4. Activate the customer billing portal.
5. Create a product.
6. Create a price for the product.
7. Navigate to developer section and copy the API credentials.
8. Update `.env` with the IDs and credentials.

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PRO_PRODUCT_ID=
PRO_PRODUCT_PRICE_ID=
```

### SMTP Provider

Achromatic supports NodeMailer (SMTP) and Resend.

1. Choose an SMTP provider (Gmail for testing is fine).
2. Update `.env` with SMTP credentials.

```bash
EMAIL_SENDER=
EMAIL_MAILER=NodeMailer # NodeMailer (default) | Resend

# NodeMailer

EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASS=

# Resend
EMAIL_RESEND_API_KEY=
```

For Gmail you need an **app-specific password** and set it up like this

```bash
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=example@gmail.com
EMAIL_SERVER_PASS=suyz yeba qtgv xrnp
```

<Callout>SMTP provider is mandatory for credentials login.</Callout>

## Application

1. **Start the Application**

```bash
npm run dev
```

2. **Navigate to** http://localhost:3000

You’re all set to start!
