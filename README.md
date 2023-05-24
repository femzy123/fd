# Frontdoor Assessment Server
## Description

This is a REST API application that provides API endpoints for managing user's highlighted texts and it's corresponding AI generated summaries. 

## Prerequisites

- Node.js
- pnpm

## Technologies Used

- NestJS - A progressive Node.js framework for building efficient and scalable server-side applications.
- TypeScript - A typed superset of JavaScript that compiles to plain JavaScript, adding static typing and other features to enhance development.
- MongoDB - A popular NoSQL database that uses a flexible, document-oriented data model, making it suitable for a wide range of applications.
- Jest - A JavaScript testing framework with a focus on simplicity, providing an intuitive API for writing tests and powerful features like mocking and code coverage.
- Supertest - A library for testing HTTP servers in Node.js, allowing you to make HTTP requests and assert their responses in your tests.
- JWT - A standard for securely transmitting information as a JSON object, often used for authentication and authorization in web applications.
- Argon2 - A modern and secure password hashing algorithm that provides resistance against various types of attacks, including brute-force and dictionary attacks.
## Installation

1. Clone the repository:
```bash
$ git clone https://github.com/femzy123/fd-server.git
```
2. Navigate to the project directory:
```bash
$ cd nestjs-api
```
3. Install the dependencies:
```bash
$ pnpm install
```
## Configuration
- Create a .env file in the root directory based on the .env.example file.
- Generate JWT_ACCESS_SECRET & JWT_REFRESH_SECRET by running
```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

# API Endpoints

## OpenAI
- `POST /ai/openaiResponse` - Fetch openAI response
Sends a request to OpenAI API to retrieve a response.

  **Request Body:**

  | Field | Type   | Description                |
  |-------|--------|----------------------------|
  | text  | string | The text to be processed.  |

## Summaries
- `GET /summaries` - Get all summaries
- `GET /summaries/:id` - Get a summaries by ID
- `POST /summaries` - Create a new summaries
- `PUT /summaries/:id` - Update a summaries by ID
- `DELETE /summaries/:id` - Delete a summaries by ID

## Auth
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login existing user

## License

Nest is [MIT licensed](LICENSE).
