import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import routes from "./app/routes/user.routes.js";

const app = express();

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true, 
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

console.log("db url:", db.url);
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Welcome to your User management application." });
});


routes(app); 


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
