import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  let listUsers = await userService.getUserList();
  await userService.deleteUser(8);
  return res.render("user.ejs", { listUsers });
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  userService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  // let listUsers = userService.deleteUser();
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
  // console.log("check id:", req.params.id);
};
const getUpdateUserPage = async (req, res) => {
  let userUpdate = await userService.getUserById(req.params.id);
  let userData = {};
  userData = userUpdate;
  // if (userUpdate && userUpdate.length > 0) {
  //   userData = userUpdate[0];
  // }

  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  // let userUpdate = await userService.getUserById(req.params.id);
  // let userData = {};
  // if (userUpdate && userUpdate.length > 0) {
  //   userData = userUpdate[0];
  // }
  await userService.updateUser(req.body.id, req.body.username, req.body.email);

  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
