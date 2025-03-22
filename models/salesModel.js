var mongoose = require("mongoose");

function getSalesModel() {
    var userScheema = mongoose.Schema;

    var SalesColSchema = {
        dos: { type: Date },
        sales: Number,
        customer: Number,
        email: String,

    }
    var ver = {
        versionKey: false, // to avoid __v field in table come by default
    }
    var SalesColShema = new userScheema(SalesColSchema, ver);
    var SalesColRef = mongoose.model("Sales", SalesColShema);
    return SalesColRef;
}

module.exports = { getSalesModel }