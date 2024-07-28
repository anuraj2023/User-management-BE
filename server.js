
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import db from "./app/models/index.js";
import routes from "./app/routes/user.routes.js";

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true, 
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

let BASE_URL;
if (NODE_ENV === 'production') {
  BASE_URL = `${HOST}`; 
} else {
  BASE_URL = `http://${HOST}:${PORT}`;
}

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'A simple Node.js with Express.js User Management API',
    },
    servers: [
      {
        url: BASE_URL,
        description: `${NODE_ENV.charAt(0).toUpperCase() + NODE_ENV.slice(1)} server`,
      },
    ],
  },
  apis: ['./app/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your User management application." });
});

app.get("/health", (req, res) => {
  res.json({ status: "User Management Backend App is healthy" });
});

routes(app); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Swagger UI is available at ${BASE_URL}/api-docs`);
});
