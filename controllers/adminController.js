var { getappModel } = require('../models/applicantModel');
var applicantColRef = getappModel();
var path = require('path');

const { response } = require('express');

async function getAllApplicants(req, res) {
    try {
        let applicants = await applicantColRef.find({});
        res.send(applicants);
    } catch (error) {
        res.send(error.message);
    }
}

async function doApprove(req, res) {
    try {
        let result = await applicantColRef.updateOne(

            { email: req.body.email },
            { $set: { status: 1 } }

        );

        if (result) {
            res.send("Application Approved!");
        } else {
            res.send("Failed to approve application");
        }
    } catch (error) {
        res.send(error.message);
    }
}
async function doDecline(req, res) {
    try {
        let result = await applicantColRef.updateOne({ email: req.body.email }, { $set: { status: -1 } });
        if (result.modifiedCount > 0)
            res.send("Application Declined!");
        else
            res.send("Failed to decline application");
    } catch (error) {
        res.send(error.message);
    }
}
async function doFranchise(req, res) {
    try {
        let result = await applicantColRef.updateOne({ email: req.body.email }, { $set: { status: 2 } });
        if (result.modifiedCount > 0)
            res.send("Franchise Alloted!");
        else
            res.send("Failed to allot franchise");
    } catch (error) {
        res.send(error.message);
    }
}
module.exports = { getAllApplicants, doApprove, doDecline, doFranchise };