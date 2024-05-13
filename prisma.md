# Reminders

## How to reset data base

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
