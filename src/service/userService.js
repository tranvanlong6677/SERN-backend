import bcrypt from "bcryptjs";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = (email, password, username) => {
  let hashPassword = hashUserPassword(password);
  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?,?,?)",
    [email, hashPassword, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = () => {
  let usersList = [];
  connection.query("SELECT * FROM users", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("check results", results);
  });
};

module.exports = {
  createNewUser,
  getUserList,
};
