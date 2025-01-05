# Micro Instagram Backend API

A Node.js-based REST API that implements basic Instagram-like functionality with user and post management capabilities.

## Features

- User Management
  - Create users with name, mobile number, and address
  - Track post count for each user
  - View all users

- Post Management
  - Create posts with title, description, and images
  - Edit existing posts
  - Delete posts
  - View all posts
  - Posts are associated with users

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Jest (Testing Framework)

## Database Schema

### Users Table
- id (Primary Key, Auto-increment)
- name (VARCHAR 256)
- mobileNumber (BIGINT, Unique)
- address (TEXT)
- postCount (INTEGER)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Posts Table
- id (Primary Key, Auto-increment)
- title (TEXT)
- description (TEXT)
- userId (Foreign Key referencing Users)
- images (JSONB array)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

## API Endpoints

### User APIs
1. `GET /api/users`
   - Returns all users in the system
   - Response: Array of user objects

2. `POST /api/users`
   - Creates a new user
   - Request body: `{ name, mobileNumber, address }`
   - Response: Created user object

### Post APIs
1. `GET /api/posts`
   - Returns all posts with associated user details
   - Response: Array of post objects with user information

2. `POST /api/posts`
   - Creates a new post for a user
   - Request body: `{ title, description, userId, images }`
   - Response: Created post object
   - Automatically increments user's post count

3. `PUT /api/posts/:id`
   - Updates an existing post
   - Request body: `{ title, description, images }`
   - Response: Updated post object

4. `DELETE /api/posts/:id`
   - Deletes a post
   - Automatically decrements user's post count
   - Response: Success message

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
