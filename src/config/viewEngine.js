import express from "express";

// app là ám chỉ app trong express
const configViewEngine = (app) => {
  app.use(express.static("../public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
  // nên nhớ đường dẫn đến views phải bắt đầu từ src chứ ko phải tử thư mục viewEngine.js này
};

export default configViewEngine;
