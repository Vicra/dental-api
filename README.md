## Node Version

```bash
v20.14.0
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

npx prisma
npx prisma init

npx prisma migrate dev --name init

# run seed


npx prisma db push --force-reset && npx prisma db seed
npx prisma db seed

# every database change

npx prisma generate


# docker

MYSQL_ROOT_PASSWORD=my-secret