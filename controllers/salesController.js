var { getSalesModel } = require("../models/salesModel");
var SalesColRef = getSalesModel();

function doSaveSalesWithPost(req, resp) {
        console.log(req.body);
        var SalesObj = new SalesColRef(req.body);
        SalesObj.save().then((document) => {
                resp.json({ doc: document, status: true, msg: "Saved!" });

        }).catch((err) => {
                console.log(err.message);
                resp.json({ status: false, msg: err.message });

        })
}

async function getAllHistory(req, resp) {
        try {
                let data = await SalesColRef.find();
                resp.json(data);
        } catch (error) {
                console.error("Error fetching sales data:", error);
                resp.status(500).json({ msg: "Internal Server Error" });
        }
}


async function getChartsdata(req, res) {
        const { email, startDate, endDate } = req.query;

        if (!email || !startDate || !endDate) {
                return res.status(400).json({ error: "Missing required parameters" });
        }

        try {
                console.log("Fetching sales data for Email:", email, "from", startDate, "to", endDate);

                const salesData = await SalesColRef.find({
                        email: email,
                        dos: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }).sort({ dos: 1 }).lean();

                console.log("Raw Sales Data from DB:", salesData);

                if (!salesData.length) {
                        console.log("No sales data found for the given Email and date range.");
                        return res.json([]);
                }

                // Format data properly
                const formattedSalesData = salesData.map(item => ({
                        date: item.dos.toISOString().split("T")[0], // Convert date to YYYY-MM-DD
                        sales: item.sales || 0,
                        customer: item.customer || 0
                }));

                console.log("Formatted Sales Data:", formattedSalesData);

                res.json(formattedSalesData);
        } catch (error) {
                console.error("Error fetching sales data:", error);
                res.status(500).json({ error: "Internal Server Error" });
        }
}



module.exports = {
        doSaveSalesWithPost,
        getAllHistory,
        getChartsdata,

}