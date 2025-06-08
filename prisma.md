# Reminders

## How to update data base

> [!WARNING]
> 'migrate dev' is a development command and should never be used in a production environment.

```text
pnpx prisma migrate dev
```

## How to verify if Prisma schema is up-to-date

```text
pnpx prisma db pull
```

if not up-to-date, you can do

```text
pnpx prisma generate
```

## How to reset the database (bis)

```text
pnpx prisma migrate reset
```

------------------

Prisma is a modern DB toolkit to query, migrate and model your database (<https://www.prisma.io>)

Usage

  $ prisma [command]

Commands

            init   Setup Prisma for your app
        generate   Generate artifacts (e.g. Prisma Client)
              db   Manage your database schema and lifecycle
         migrate   Migrate your database
          studio   Browse your data with Prisma Studio
        validate   Validate your Prisma schema
          format   Format your Prisma schema

Flags

     --preview-feature   Run Preview Prisma commands

Examples

  Setup a new Prisma project

    $ prisma init

  Generate artifacts (e.g. Prisma Client)

    $ prisma generate

  Browse your data

    $ prisma studio

  Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)

    $ prisma migrate dev

  Pull the schema from an existing database, updating the Prisma schema

    $ prisma db pull

  Push the Prisma schema state to the database

    $ prisma db push
