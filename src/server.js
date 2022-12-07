import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config(); // dùng để chạy câu lệnh process.env

const PORT = process.env.PORT || 8080;

const app = express();

configViewEngine(app);

initWebRoutes(app);

app.listen(PORT, () => {
  console.log("Server is running in " + PORT);
});
