# Node.js API with MongoDB, Rate Limiting, and Authentication

## Project Overview

This project is a Node.js API built with Express and MongoDB, featuring rate limiting, authentication, and error handling. The API includes:

- *MongoDB Connection Handling:* Graceful error handling if the connection to MongoDB fails.
- *API Rate Limiting:* Limits the number of requests to 10 per minute for specified endpoints.
- *API Authentication:* Uses JWT for securing API routes.
- *Error Handling:* Returns appropriate HTTP status codes for different types of errors.

## Task Description

1. *Handle MongoDB connection errors and return appropriate error messages.* ✅ Completed
2. *Implement exception handling with HTTP status codes.* ✅ Completed
3. *Set up API rate limiting (10 requests per minute for 4 endpoints).* ✅ Completed
4. *Return a message if the rate limit is exceeded.* ✅ Completed
5. *Implement API authentication using JWT.* ✅ Completed

## How to Run the Project

1. *Clone the repository:*
    bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    

2. *Install dependencies:*
    bash
    npm install
    

3. *Set up environment variables:*

    Create a .env file in the root of the project and add the following:
    plaintext
     JWT_SECRET=edededededededeeee
    MONGO_URI=mongodb://127.0.0.1:27017/nodejscrud
    

4. *Start the MongoDB server:*
    bash
    mongod
    

5. *Run the application:*
    bash
    node index.js
    

6. *Access the API:*
    The API will be running on http://localhost:3000.

## API Endpoints

- *POST /api/register*: Register a new user.
- *POST /api/login*: Log in an existing user.
- *POST /api/users*: Create a new user (Protected, Rate Limited).
- *GET /api/users*: Get all users (Protected, Rate Limited).
- *GET /api/users/:id*: Get a user by ID (Protected, Rate Limited).
- *PATCH /api/users/:id*: Update a user by ID (Protected, Rate Limited).
- *DELETE /api/users/:id*: Delete a user by ID (Protected, Rate Limited).

## Rate Limiting

- *Limit:* 10 requests per minute.
- *Endpoints:* Protected user routes (/api/users, /api/users/:id).
- *Response if Limit Exceeded:* 
    json
    {
      "message": "Rate limit exceeded"
    }
    

## Error Handling

- *500 Internal Server Error:* If there’s an issue with MongoDB connection or internal logic.
- *401 Unauthorized:* If authentication fails or a JWT is missing/invalid.
- *429 Too Many Requests:* If the rate limit is exceeded.
