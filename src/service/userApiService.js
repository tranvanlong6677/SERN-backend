import db from "../../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      raw: true,
      nest: true,
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      attributes: ["id", "email", "username", "phone"],
    });
    if (users) {
      console.log(">>> check users", users);
      //   let data = users.get({ plain: true });
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    let userUpdate = db.User.findOne({
      where: {
        id: data.id,
      },
    });
    if (userUpdate) {
      await db.User.update({});
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
