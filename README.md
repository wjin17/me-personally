# Me Personal Site

Learn all [about me](http://www.willjin1796.com/) or steal this template if you want.

## Table of Contents

- [getting started](#getting-started)
- [features](#features)
- [customizing](#customizing)

## Getting started

### Download

```
git clone git@github.com:wjin17/me-personally.git
```

### Env variables

```bash
ADMIN_PASSWORD=**** # admin password
DATABASE_URL=**** # postgres connection string
AUTH_SECRET=**** # secret for signing jwt
```

### Install deps

```bash
npm install
```

### Run dev

```bash
npm run dev
```

### Run build

```bash
npm run build
```

### Run prod

Must be after build

```
npm start
```

## Features

- Projects display
- Blog
- Admin section with auth
- Rich text editing for da blog

### Admin section

The admin section can be accessed through /admin. There you can add, update, and delete projects/blog posts. Sign in with the same password you set in the environment variables.

## Customizing

You can use any Postgres service you want or switch SQL services by swapping the Drizzle connector.

The rest I'll leave as an exercise to the reader ; )
