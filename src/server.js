import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connection from "../config/connectDB";

require("dotenv").config(); // dùng để chạy câu lệnh process.env

const PORT = process.env.PORT || 8080;

// this is a middleware
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect database with sequelize
connection();

//init routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log("Server is running in " + PORT);
});
