var { getappModel } = require("../models/applicantModel");
var path = require("path");

var UserColRef = getappModel();

function doSaveUserWithPost(req, resp) {
    console.log(req.body);
    // req.body.picpath=req.body.ppic;

    var userObj = new UserColRef(req.body);
    userObj.save().then((document) => {
        //resp.send(document)
        resp.json({ doc: document, status: true, msg: "Saved!" });

    }).catch((err) => {
        console.log(err.message);
        //resp.send(err.message)
        resp.json({ status: false, msg: err.message });

    })
}

module.exports = { doSaveUserWithPost }
