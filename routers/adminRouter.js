var express = require("express");
var adminRouter = express.Router();
var obj=require("../controllers/adminController")


adminRouter.post("/showApplications",obj.getAllApplicants);
adminRouter.post("/approveApplication",obj.doApprove);
adminRouter.post("/declineApplication",obj.doDecline);
adminRouter.post("/allotFranchise",obj.doFranchise);




module.exports=adminRouter;