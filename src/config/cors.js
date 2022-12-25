require("dotenv").config(); // dùng để chạy câu lệnh process.env

const configCors = (app) => {
  // this is a middleware
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
};

export default configCors;
