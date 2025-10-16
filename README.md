# Ecommerce Backend Project

## Overview

This backend project is a REST API for managing an ecommerce system. It includes clients, orders, order history, warehouses, order state, and order address management with Sequelize ORM, MySQL database, and Express.js framework.

The system supports full CRUD operations on each model through well-defined routes following best practices for API design and maintainability.

---

## Coder Information

- **Name:** Santiago Mendoza Almanza
- **Clan:** Tayrona

---

## Setup and Deployment Instructions

Follow these steps to get the project up and running efficiently:

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MySQL Server (5.7+)
- Docker & Docker Compose (if using Docker deployment)

### Steps to Run Locally

1. **Clone the Repository**

    ```
    git clone <your-repo-url>
    cd <repo-folder>/app/src
    ```

2. **Configure Environment Variables**

    Create a `.env` file in the root of `app/src` with the following template (customize values):

    ```
    # Node.js App
    APP_CONTAINER_NAME=XXXX
    APP_PORT=XXXX
    NODE_ENV=XXXX
    APP_CPU_LIMIT=0.50
    APP_MEM_LIMIT=512M

    # PostgreSQL
    DB_CONTAINER_NAME=XXX
    POSTGRES_USER=XXX
    POSTGRES_PASSWORD=XXX
    POSTGRES_DB=XXX
    POSTGRES_PORT=XXX
    POSTGRES_LOCAL=XXX
    DB_CPU_LIMIT=0.5
    DB_MEM_LIMIT=512M

    # JWT token and refresh token
    JWT_SECRET=XXXX
    JWT_EXPIRES_IN=XXXX
    JWT_REFRESH_SECRET=XXXX
    JWT_REFRESH_EXPIRES_IN=XXXX

    # KEYS
    PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
    XXXX
    -----END PUBLIC KEY-----"

    PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
    XXXX
    -----END PRIVATE KEY-----"
    ```

3. **Install Dependencies**

    ```
    npm install
    ```

4. **Database Setup**

    deploy the container and if done propperly the same container will deply the database and will create tables 

5. **Run the Server**

    ```
    npm run dev
    ```

    Server will start on `http://localhost:3000` (or your specified PORT).

### Using Docker Compose (Optional)

If preferred, run the MySQL and Node app containers with Docker Compose:

