import bcrypt from "bcryptjs";
// import mysql from "mysql2/promise";
// import bluebird from "bluebird";
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

  let roles = await db.Role.findAll({
    raw: true,
    nest: true,
    include: { where: { id: 1 }, model: db.Group },
  });

  let users = [];
  users = await db.User.findAll();
  return users;
};

const deleteUser = async (id) => {
  await db.User.destroy({
    where: {
      id: id,
    },
  });
};
const getUserById = async (id) => {
  let user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user.get({ plain: true });
};

const updateUser = async (id, username, email) => {
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
