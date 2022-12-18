import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
  // router.get(path,handler)
  // path là đường link
  // handler là 1 function được thực thi khi router.get đến đường link chỉ định
  router.post("/user/update-user/:id", homeController.handleUpdateUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.get("/user", homeController.handleUserPage);
  router.get("/", homeController.handleHelloWorld);

  return app.use("/", router);
  // Ứng dụng bắt đầu với /
};

export default initWebRoutes;
