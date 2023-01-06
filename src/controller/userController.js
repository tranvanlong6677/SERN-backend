import userApiService from "../service/userApiService";

const readUser = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let data = await userApiService.getUserListWithPaginate(page, limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
    let data = await userApiService.getAllUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -"1",
      DT: "",
    });
  }
};

const createUser = async (req, res) => {
  try {
    let listUser = await userApiService.getAllUser();
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    let listUser = await userApiService.getAllUser();
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    let listUser = await userApiService.getAllUser();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
};
