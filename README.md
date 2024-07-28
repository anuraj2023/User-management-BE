# User Management Application

This is a simple Node.js application that demonstrates CRUD (Create, Read, Update, Delete) operations along with a mailing functionality using MongoDB as the database.

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

   - Create a PostgreSQL database.
   - Update the `config/db.config.js` file with your database connection details.

4. Run the application:

   ```bash
   npm start
   ```

5. Access the application:

   Open your web browser and navigate to `http://localhost:8080` to access the API endpoints.

## Endpoints

- `POST /api/users`: Create a new user.
- `GET /api/users`: Retrieve all users.
- `GET /api/users/:id`: Retrieve a single user by id.
- `PUT /api/users/:id`: Update an user by id.
- `DELETE /api/users/:id`: Delete an user by id.
- `POST /api/users/mail?/sendMail`: Send email containing user information to recipient.

## Troubleshooting

- If you encounter issues with database constraints or null values, double-check the model, controller, and database configuration for consistency.
- Review the database integrity constraints and default values.
- Use extensive logging to trace the flow of data and identify potential issues.

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request.
