import express from "express";
import apiController from "../controller/apiController";
const router = express.Router();

const initApiRoutes = (app) => {
  // rest API
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  return app.use("/api/v1/", router);
  // Ứng dụng bắt đầu với /
};

export default initApiRoutes;
