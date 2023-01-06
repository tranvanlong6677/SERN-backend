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

const getUserListWithPaginate = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    console.log("check offset", offset);
    const { count, rows } = await db.User.findAndCountAll({
      offset,
      limit,
    });

    let data = {
      totalRows: count, // tong so user
      totalPages: Math.ceil(count / limit), // tong so user chia cho so user 1 page roi lam tron len
      users: rows,
    };
    return {
      EM: "get user with paginate success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Somethings wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    await db.User.create({});
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
  getUserListWithPaginate,
};
