import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../../models/index";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);
  try {
    db.User.create({
      username,
      email,
      password: hashPassword,
    });
  } catch (error) {
    console.log(error);
  }

  // connection.query(
  //   "INSERT INTO user (email, password, username) VALUES (?,?,?)",
  //   [email, hashPassword, username],
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //     }
  //   }
  // );
};

const getUserList = async () => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM user");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM user WHERE id=?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM user WHERE id=?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (id, username, email) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE user SET username = ?, email= ? WHERE id = ?",
      [username, email, id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
};
