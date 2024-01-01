# Next Auth V5 - Advanced

**Tricks**

-To add a gradient use this in tailwind - `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800`

## Connect to database

-install prisma `npm i prisma `
-install prisma client `npm i @prisma/client`

**Add this to `util/db.ts`**

```ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
```

-now run this `npx prisma init ` it creates a prisma file and .env file

- add this in `schema.prisma` and also and database url in .env

```prisma
// prisma/schema.prisma
datasource db {
  provider  = "postgresql"
  url  	    = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

-creat a test user model add this in `prisma.schem` file

```prisma
// prisma/schema.prisma
datasource db {
  provider  = "postgresql"
  url  	    = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id String @id @default(uuid())
  name String
}
```

-- run this `npx prisma generate`
-- run this `npx prisma db push`

- now install this `npm i @auth/prisma-adapter`

-- add this is schema.prisma

```prisma

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  accounts      Account[]
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```
