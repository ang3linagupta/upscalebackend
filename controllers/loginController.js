var { getLoginModel } = require("../models/loginModel");
var LoginRef = getLoginModel();

function doSaveFranchise(req, resp) {
    console.log(req.body);

    var LoginObj = new LoginRef(req.body);
    LoginObj.save().then((document) => {
        resp.json({ doc: document, status: true, msg: "Saved Credentials!" });
    }).catch((err) => {
        console.log(err.message);
        resp.json({ status: false, msg: err.message });
    });
}

async function doCheckUser(req, resp) {
    const { email, password } = req.body;

    try {
        const user = await LoginRef.findOne({ email });

        if (!user) {
            return resp.status(404).json({ status: false, msg: "User not found" });
        }

        if (user.password !== password) {
            return resp.status(401).json({ status: false, msg: "Invalid password" });
        }

        resp.json({ status: true, msg: "Logged In!" });

    } catch (error) {
        console.error("Login Error:", error);
        resp.status(500).json({ status: false, msg: "Server error" });
    }
}

async function updatePassword(req, resp) {
    console.log("Full request received:", req.headers["content-type"]); 
    console.log("Raw request body:", req.body); 

    const { email, oldPassword, newPassword } = req.body;

    console.log("Received UID:", email);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    if (!email) {
        return resp.status(400).json({ success: false, message: "UID is missing from request." });
    }

    try {
        const user = await LoginRef.findOne({ email });

        if (!user) {
            console.log("User not found for email:", email);
            return resp.status(404).json({ success: false, message: "User not found" });
        }

        if (user.password !== oldPassword) {
            return resp.status(400).json({ success: false, message: "Old password is incorrect." });
        }

        const updateResult = await LoginRef.findOneAndUpdate(
            { email },
            { $set: { password: newPassword } },
            { new: true }
        );

        console.log("MongoDB Update Result:", updateResult);

        return resp.json({ success: true, message: "Password updated successfully!" });
    } catch (error) {
        console.error("Error updating password:", error);
        return resp.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

module.exports = { doSaveFranchise, doCheckUser, updatePassword };
