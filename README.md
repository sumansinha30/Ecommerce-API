# E-commerce API (Node.js + MySQL)

A complete RESTful API for an e-commerce platform built with Express and Sequelize.

## Features
- **Signup/Login:** Secure authentication using JWT and bcrypt.
- **Product Catalog:** List and view detailed product information.
- **Shopping Cart:** Add, view, and remove items from a personal cart.
- **Order Management:** Place orders and view order history.

## Prerequisites
- Node.js installed.
- MySQL Server running locally.

## Setup Instructions

1.  **Clone/Download** this project to your machine.
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Database Configuration:**
    - Open the `.env` file.
    - Update `DB_USER`, `DB_PASSWORD`, and `DB_NAME` with your MySQL credentials.
    - Create the database in MySQL (e.g., `CREATE DATABASE ecommerce_db;`).
4.  **Start the server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user (`username`, `email`, `password`).
- `POST /api/auth/login` - Login (`email`, `password`). Returns a token.

### Products
- `GET /api/products` - List all products.
- `GET /api/products/:id` - Get one product's details.
- `POST /api/products` - Create a product (for testing).

### Cart (Requires Token)
- `GET /api/cart` - View your cart.
- `POST /api/cart` - Add item (`productId`, `quantity`).
- `DELETE /api/cart/:id` - Remove item by its cart item ID.

### Orders (Requires Token)
- `POST /api/orders` - Checkout your cart items into a new order.
- `GET /api/orders` - View your order history.

## Testing with Postman
1. Use `POST /api/auth/signup` to create a user.
2. Use `POST /api/auth/login` to get a JWT token.
3. For protected routes (Cart/Orders), add the token to the **Authorization** header as a **Bearer Token**.
