# CRUD Mastery Mongoose API Documentation

This API allows you to perform CRUD (Create, Read, Update, Delete) operations on user data and manage orders associated with users.

## Endpoints

**Base URL:** `https://crud-mastery-mongoose.vercel.app`

### 1. Create User

- **Method:** POST
- **Endpoint:** `/api/users`

### 2. Get Users

- **Method:** GET
- **Endpoint:** `/api/users`

### 3. Get Single User

- **Method:** GET
- **Endpoint:** `/api/users/:userId`

### 4. Update User Data

- **Method:** PUT
- **Endpoint:** `/api/users/:userId`

### 5. Delete User

- **Method:** DELETE
- **Endpoint:** `/api/users/:userId`

### 6. Update Order Data

- **Method:** PUT
- **Endpoint:** `/api/users/:userId/orders`

### 7. Get Orders Data

- **Method:** GET
- **Endpoint:** `/api/users/:userId/orders`

### 8. Get Total Price from Orders

- **Method:** GET
- **Endpoint:** `/api/users/:userId/orders/total-price`

## Usage

- **Replace** `:userId` in the endpoint URLs with the actual user ID.
- **Make sure** to use appropriate request methods (e.g., POST, GET, PUT, DELETE) for respective operations.
