var express = require("express");
var SalesRouter = express.Router();
var obj = require("../controllers/salesController")


SalesRouter.post("/savesaleswithpost", obj.doSaveSalesWithPost);
SalesRouter.get("/getallhistory",obj.getAllHistory);
SalesRouter.get("/charts",obj.getChartsdata);

module.exports = SalesRouter