var mongoose = require("mongoose");

function getLoginModel() {
    var LoginSchema = mongoose.Schema;

    var LoginColSchema = {
        email: { type: String, required: true, unique: true },
        password: { type: String }
    }

    var ver = {
        versionKey: false,
    }

    var LoginColSchema = new LoginSchema(LoginColSchema, ver);
    var LoginRef = mongoose.model("Login", LoginColSchema);

    return LoginRef;
}

module.exports = { getLoginModel }

