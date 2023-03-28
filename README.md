# Create T3 Turbo with Clerk Authentication

## Clerk Dashboard Setup

For this template to work you need to enable an OAuth provider. You can find the social options under `User & Authentication / Social Providers` in the [Clerk Dashboard](https://dashboard.clerk.dev)

> If you change any setting here outside of adding Discord, you may need to update your code to handle any requirements you change.

It uses [Turborepo](https://turborepo.org/) and contains:

## Code Layout

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 └─ db
     └─ typesafe db-calls using Prisma
```

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# In packages/db/prisma update schema.prisma provider to use sqlite
# or use your own database provider
- provider = "postgresql"
+ provider = "sqlite"

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to your database
pnpm db-push
```

## Deployment

### Next.js

#### Prerequisites

_This template is provided with a SQLite database as an example and should be replaced. A quick Postgresql database can be provisioned on [Railway](https://railway.app), but you can use any other database provider. Make sure the prisma schema is updated to use the correct database._

#### Deploy to Vercel

Deploying the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the turbo build settings.

2. Add the `DATABASE_URL`,`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` environment variable.

3. Done! Your app should successfully deploy.

## References

The stack originates [t3-turbo-and-clerk](https://github.com/clerkinc/t3-turbo-and-clerk) which originiates from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).
