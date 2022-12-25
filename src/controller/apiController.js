const testApi = (req, res) => {
  return res.status(200).json({
    message: "OK",
    data: "test api",
  });
};

const handleRegister = (req, res) => {
  console.log("check req body", req.body);
  console.log(">>> check res", res);
};

module.exports = {
  testApi,
  handleRegister,
};
