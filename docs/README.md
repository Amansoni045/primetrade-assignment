# API Documentation

The API for this project is documented using a Postman Collection.

## 🚀 How to Import and Use

1.  **Install Postman**: If you haven't already, download and install [Postman](https://www.postman.com/downloads/).
2.  **Import Collection**:
    *   Open Postman.
    *   Click the **Import** button (top left).
    *   Drag and drop the `docs/primetrade.postman_collection.json` file into the import window.
3.  **Environment Setup**:
    *   The collection comes with a `base_url` variable set to `http://localhost:3000`.
    *   The `token` variable will be automatically populated when you run the **Login** request.

## 📂 Collection Structure

*   **Auth**: Register, Login, Get Current User (`/api/auth/*`)
*   **Tasks**: Get, Create, Update, Delete Tasks (`/api/tasks/*`)
*   **Admin**: User Management (`/api/admin/*`)

## 🔑 Authentication Flow

1.  **Register**: Create a new account.
2.  **Login**: Use the `Login` request. The **Tests** script in this request will automatically save the JWT token to your environment variables.
3.  **Authenticated Requests**: All subsequent requests (Tasks, Admin) will automatically use this token in the `Authorization` header (`Bearer {{token}}`).

## ⚠️ Common Errors

*   **401 Unauthorized**: You are not logged in or your token has expired. Run the **Login** request again.
*   **403 Forbidden**: You are trying to access an Admin route as a standard User.
*   **400 Bad Request**: Your input (e.g., email, password, task title) failed validation. Check the error message for details.
