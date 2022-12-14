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
    console.log(">>> check req body", req.body);
    let data = await userApiService.createNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(">>> check req.body in usercontrooler", req.body);
    let data = await userApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("check req.body", req.body);
    let data = await userApiService.deleteUser(+req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
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
