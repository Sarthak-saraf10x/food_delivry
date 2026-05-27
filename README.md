# Food Delivery Platform - Backend

This is the backend service for the Food Delivery Platform. It provides a RESTful API built with Node.js, Express.js, and MongoDB (via Mongoose), handling user authentication, order processing, and database interactions.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Directory Structure](#directory-structure)
- [Environment Variables](#environment-variables)
- [How to Start](#how-to-start)
- [Available Scripts](#available-scripts)

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs (for password hashing)

---

## Key Features

- **Role-Based Authentication**: Secure JWT authentication supporting `customer`, `restaurant_owner`, and `delivery_partner` roles.
- **Restaurant Management API**: Endpoints for restaurant owners to manage their profiles, menus, and incoming orders.
- **Order Processing API**: Core logic for placing orders, assigning delivery partners, and updating order status.
- **Delivery Partner API**: Endpoints for drivers to fetch available delivery requests and update statuses.
- **CORS Configured**: Secure cross-origin resource sharing setup to communicate seamlessly with the frontend.

---

## Directory Structure

```text
backend/
├── src/                  
│   ├── config/           # Database connection and environment configurations
│   ├── controllers/      # Route controllers containing business logic
│   ├── middlewares/      # Express middlewares (e.g., JWT Auth, Role validation)
│   ├── models/           # Mongoose schemas (User, Order, Restaurant, etc.)
│   ├── routes/           # Express API route definitions
│   └── utils/            # Helper functions and reusable utilities
├── server.js             # Main backend application entry point
├── .env                  # Backend environment variables (not tracked by git)
└── package.json          # Backend dependencies and configuration scripts
```

---

## Environment Variables

Create a `.env` file in the `backend` root directory and add the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Add any other required variables here
```

---

## How to Start

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Setup Instructions

1. Install backend dependencies:
   ```bash
   npm install
   ```

2. Create and configure your `.env` file as shown in the section above.

3. Start the server:
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Or production mode
   npm start
   ```

---

## Available Scripts

In the `backend` directory, you can run:

- `npm start`: Starts the application in production mode using `node server.js`.
- `npm run dev`: Starts the application in development mode using `nodemon`. The server will automatically restart if you make changes to the code.
