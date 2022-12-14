import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";

require("dotenv").config(); // dùng để chạy câu lệnh process.env

const PORT = process.env.PORT || 8080;

const app = express();

// config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

app.listen(PORT, () => {
  console.log("Server is running in " + PORT);
});
