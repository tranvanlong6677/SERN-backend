import db from "../../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

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

const registerNewUser = async (userData) => {
  try {
    //check email or phone is exist
    let checkEmail = await checkEmailExist(userData.email);
    let checkPhone = await checkPhoneExist(userData.phone);
    if (checkEmail) {
      return {
        EM: "Email is exist",
        EC: "1",
        DT: "",
      };
    }
    if (checkPhone) {
      return {
        EM: "Phone is exist",
        EC: "1",
        DT: "",
      };
    }
    //hash user password
    let passwordHash = hashUserPassword(userData.password);

    //create new user
    await db.User.create({
      email: userData.email,
      password: passwordHash,
      phone: userData.phone,
      username: userData.username,
    });
    return {
      EM: "A user is created successfully",
      EC: "0",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs from services",
      EC: "1",
    };
  }
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const handleLogin = async (dataLogin) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          {
            email: dataLogin.valueLogin,
          },
          {
            phone: dataLogin.valueLogin,
          },
        ],
      },
    });
    console.log(">>> check user fineone:", user.get({ plain: true }));
    if (user) {
      let isCorrectPassword = checkPassword(dataLogin.password, user.password);
      if (isCorrectPassword) {
        return {
          EM: "Login succesfully!",
          EC: "0",
          DT: "",
        };
      }
    }
    return {
      EM: "Your information is incorrect",
      EC: "1",
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from server ",
      EC: "-2",
    };
  }
};

module.exports = {
  registerNewUser,
  handleLogin,
};
