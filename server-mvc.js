var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var path = require("path");

var { url } = require("./config/config");

var app = express();

app.use(cors());
app.use(express.json()); 

app.listen(2004, function () {
    console.log("Server Started!");
})

app.use(express.urlencoded({ extended: true }));

var urll = url;

mongoose.connect(urll).then(() => {
    console.log("Connected!");
}).catch((err) => {
    console.log(err.message);
})

var applicantRouter = require("./routers/applicantRouter");
app.use("/applicant", applicantRouter);

var salesRouter = require("./routers/salesRouter");
app.use("/sales", salesRouter);

var adminRouter = require("./routers/adminRouter");
app.use("/admin", adminRouter)

var loginRouter = require("./routers/loginRouter");
app.use("/login", loginRouter)

var admin_login = require("./routers/adminloginrouter");
app.use("/adminlogin", admin_login);