var express = require("express");
var obj = require("../controllers/applicantController");

var applicantRouter = express.Router();

applicantRouter.post("/saveuserWithPost", obj.doSaveUserWithPost);

module.exports = applicantRouter;