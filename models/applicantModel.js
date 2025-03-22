var mongoose = require("mongoose");
function getappModel() {
    var userScheema = mongoose.Schema;


    var userColSchema = {

        txtFName: String,
        txtLName: String,
        email: { type: String, required: true, index: true, unique: true },
        txtAdd: String,
        txtExp: String,
        txtYears: String,
        txtLoc: String,
        txtCity: String,
        txtPin: String,
        txtArea: String,
        txtDim: String,
        txtFloor: String,
        dateofapp: { type: Date, default: Date.now },
        status: Number,

    }
    var ver = {
        versionKey: false,
    }

    // var userColSchema = new userSchema(userColSchema, ver);
    // var UserColRef = mongoose.model("applicantCollection", userColSchema);
    // return UserColRef;

     return mongoose.models.applicantCollection || mongoose.model("applicantCollection", userColSchema);
}
module.exports = { getappModel }