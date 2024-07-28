# User Management Application

This is a simple Node.js application that demonstrates CRUD (Create, Read, Update, Delete) operations along with a mailing functionality using MongoDB as the database.

## Deployed version

You may checkout the deployed app API here: <br>
https://user-management-be-lgf8.onrender.com/api-docs/

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ravix007/User-Management-Backend
   cd User-Management-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the database:

   - Create a Mongo DB.
   - Update the `config/db.config.js` file with your database connection details.

4. Run the application:

   ```bash
   npm start
   ```

5. Access the application:

   Open your web browser and navigate to `http://localhost:8080` to access the API endpoints.
   Swagger API documentation is available here: `http://localhost:8000/api-docs/` 

## Endpoints

- `POST /api/users`: Create a new user.
- `GET /api/users`: Retrieve all users.
- `GET /api/users/:id`: Retrieve a single user by id.
- `PUT /api/users/:id`: Update an user by id.
- `DELETE /api/users/:id`: Delete an user by id.
- `POST /api/users/mail?/sendMail`: Send email containing user information to recipient.

