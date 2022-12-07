import express from "express";

// app là ám chỉ app trong express
const configViewEngine = (app) => {
  app.use(express.static("../public"));
  app.set("view engine", "ejs");
  app.set("views", "../views");
};

export default configViewEngine;
