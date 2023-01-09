import db from "../../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const checkEmailExist = async (email) => {
  let userFind = await db.User.findOne({ where: { email: email } });
  if (userFind) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (phone) => {
  let userFind = await db.User.findOne({ where: { phone: phone } });
  if (userFind) {
    return true;
  }
  return false;
};

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
    const { count, rows } = await db.User.findAndCountAll({
      offset,
      limit,
      include: {
        model: db.Group,
        attributes: ["id", "name", "description", "id"],
      },
      attributes: ["id", "email", "username", "phone", "address"],
      order: [["id", "DESC"]],
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
    //check data user
    let checkEmail = await checkEmailExist(data.email);
    let checkPhone = await checkPhoneExist(data.phone);
    if (checkEmail) {
      return {
        EM: "Email is exist",
        EC: "1",
        DT: "email",
      };
    }
    if (checkPhone) {
      return {
        EM: "Phone is exist",
        EC: "1",
        DT: "phone",
      };
    }
    //hash user password
    let hashPassword = hashUserPassword(data.password);
    data.password = hashPassword;

    await db.User.create(data);
    return {
      EM: "create OK",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "create failed",
      EC: 1,
      DT: [],
    };
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
    await db.User.destroy({
      where: {
        id: id,
      },
    });
    return {
      EM: "delete user success",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with services",
      EC: 1,
      DT: "",
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserListWithPaginate,
};
