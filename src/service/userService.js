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
  // test relationship
  let newUser = await db.User.findOne({
    where: { id: 2 },
    raw: true,
    include: { model: db.Group, attributes: ["id", "name", "description"] },
    nest: true,
    attributes: ["id", "username"],
  });
  console.log("check new user: >>>  ", newUser);

  let roles = await db.Role.findAll({
    raw: true,
    nest: true,
    include: { where: { id: 1 }, model: db.Group },
  });

  console.log("check roles>>>:", roles);

  let users = [];
  users = await db.User.findAll();
  return users;
};

const deleteUser = async (id) => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(error);
  // }
  await db.User.destroy({
    where: {
      id: id,
    },
  });
};
const getUserById = async (id) => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "SELECT * FROM user WHERE id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(error);
  // }
  let user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user.get({ plain: true });
};

const updateUser = async (id, username, email) => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user SET username = ?, email= ? WHERE id = ?",
  //     [username, email, id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(error);
  // }

  await db.User.update(
    { username: username, email: email },
    {
      where: {
        id: id,
      },
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
};
