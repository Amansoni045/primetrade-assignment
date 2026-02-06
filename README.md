# Primetrade Backend Assignment

A production-ready full-stack application built for the Primetrade internship assignment. This project demonstrates a secure, scalable backend architecture using Next.js, MongoDB, and Role-Based Access Control (RBAC).

## 🚀 Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Database**: MongoDB Atlas (Mongoose ODM)
-   **Authentication**: JWT (JSON Web Tokens) with Secure Cookies
-   **Validation**: Zod
-   **Styling**: Tailwind CSS
-   **Deployment**: Vercel

## ✨ Features

-   **Secure Authentication**: User registration and login with bcrypt password hashing.
-   **Role-Based Access Control (RBAC)**:
    -   **Users**: Can manage their own tasks.
    -   **Admins**: Have exclusive access to user management APIs.
-   **Task Management**: Complete CRUD operations for protected task resources.
-   **Input Validation**: Strict schema validation for all API inputs using Zod.
-   **Protected Routes**: Middleware and HOC-based protection for sensitive routes.
-   **Smart UI**: Conditional rendering based on user role and auth state.

## 📂 Project Structure

```bash
├── app
│   ├── api          # Backend API routes (Auth, Tasks, Admin)
│   ├── dashboard    # Protected dashboard pages
│   └── (auth)       # Login/Register pages
├── models           # Mongoose schemas (User, Task)
├── lib
│   ├── db.ts        # Database connection logic
│   └── validators   # Zod validation schemas
├── utils
│   └── auth.ts      # JWT and Auth helpers
└── docs             # API Documentation
```

## 🛠️ Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd primetrade-assignment
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory:
    ```env
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```

## 📖 API Documentation

The API is fully documented using Postman.

-   **Location**: `docs/primetrade.postman_collection.json`
-   **Usage**: Import this file into Postman to see all available endpoints (Auth, Tasks, Admin).
-   **Automation**: The collection automatically handles JWT tokens for you after login.

## 🛡️ Role-Based Access Control (RBAC)

This project implements a strict RBAC policy enforced via JWT payloads and server-side checks:

-   **User Role**: The default role. Access is limited to personal resources (e.g., `/api/tasks/*`).
-   **Admin Role**: Granted elevated privileges. Access to system-level resources (e.g., `/api/admin/users`).
-   **Security**: Role checks happen at the API route level to ensure frontend bypasses are impossible.

## 🏗️ Scalability & Architecture

This application is designed with scalability in mind:

-   **Modular API**: API routes are decoupled from the frontend, allowing for potential migration to a microservices architecture.
-   **Stateless Auth**: JWTs enable stateless authentication, making it easy to scale horizontally across serverless functions.
-   **Database Indexing**: MongoDB is schema-designed for efficient querying.
-   **Future-Proofing**: The architecture supports easy integration with Redis for caching or rate-limiting middleware.

## ☁️ Deployment

The application is deployed on **Vercel**, leveraging serverless functions for API endpoints to ensure automatic scaling and high availability.
