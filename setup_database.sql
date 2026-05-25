-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- 2. Create Products Table (Initial Catalog)
-- Note: Sequelize will create these automatically if they don't exist when you start the server,
-- but here are the manual queries for your reference and for seeding.

CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Seed Sample Data (Products)
INSERT INTO Products (name, description, price, stock) VALUES
('Gaming Laptop', 'High-performance laptop with RTX 3060 and 16GB RAM', 1200.00, 10),
('Wireless Mouse', 'Ergonomic 2.4GHz wireless mouse', 25.50, 50),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard with blue switches', 75.00, 30),
('Monitor 27 inch', '4K Ultra HD IPS monitor', 350.00, 15),
('USB-C Hub', '7-in-1 multi-port adapter', 45.99, 100);

-- 4. User Table Structure (For Reference)
-- (Sequelize handles the bcrypt hashing, so don't insert users manually via SQL if you want to test login)

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- 5. Query to verify data
SELECT * FROM Products;
SELECT * FROM Users;
