import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import connection from "../config/connectDB";
import configCors from "./config/cors";

require("dotenv").config(); // dùng để chạy câu lệnh process.env
const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

// config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect database with sequelize
connection();

//init routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log("Server is running in " + PORT);
});
