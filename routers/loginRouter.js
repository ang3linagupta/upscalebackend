var express = require("express");
var loginRouter = express.Router();
var obj = require("../controllers/loginController")

loginRouter.post("/saveFranchise", obj.doSaveFranchise);
loginRouter.post("/checkuser", obj.doCheckUser);
loginRouter.post("/updatepassword",obj.updatePassword);

module.exports = loginRouter;