# Event Ease

This is a Node.js and Express.js application with TypeScript as the programming language, integrating MongoDB with Prisma ORM for user data and Event management. Ensure data integrity through validation using Zod and realtime notification using Socket.io.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- Express.js installed
- Typescript installed
- Prisma installed
- Zod installed
- Socket.io installed

## Features

#### Authentication

- User Registration and Login
- JWT (JSON Web Tokens) is used for secure authentication.

#### CRUD Operations

- Add and view events in the dashboard.
- Add view users and profiles.
- Add view event booking attendees.

## Getting Started

Follow these steps to get your project up and running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/touhidcodes/Task-Event-Ease-Server
   ```

2. **Navigate to the project folder:**

```
cd your-repository
```

3. **Install dependencies:**

```
npm install
```

4. **Configure environment variables:**
   Create a .env file in the project root and configure any necessary environment variables. For example:

```
NODE_ENV="development"
PORT=5000
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/EventEase"
ACCESS_TOKEN_SECRET="SECRET"
ACCESS_TOKEN_EXPIRES_IN="30d"
REFRESH_TOKEN_SECRET="SECRET"
REFRESH_TOKEN_EXPIRES_IN="30d"
ADMIN_USERNAME="admin"
ADMIN_EMAIL="admin@eventease.com"
ADMIN_PASSWORD="admin@eventease"
USER_USERNAME="user"
USER_EMAIL="user@eventease.com"
USER_PASSWORD="user@eventease"
```

3. **Run the application:**

```
npm run dev
```

Your application should now be running at http://localhost:5000.

## Live URLs

#### Live API URL: https://event-ease-server-alpha.vercel.app/

## Project Dependencies

#### Dependencies List

```
  "dependencies": {
    "@prisma/client": "^6.2.1",
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "http-status": "^2.1.0",
    "jsonwebtoken": "^9.0.2",
    "prisma": "^6.2.1",
    "socket.io": "^4.8.1",
    "zod": "^3.24.1"
  },
```

#### Dev Dependencies List

```
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cookie-parser": "^1.4.8",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^22.10.5",
    "@types/socket.io": "^3.0.1",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.7.3"
  }
```
