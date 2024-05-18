const donors_schema = require("../models/doners_model")


const blood_donor_controller = async (req, res) => {
    const body = req.body;
    try {
        const donors = await donors_schema.create({
            ...body
        });
        return res.status(200).json({ message: "Donor is found", donors });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};

module.exports = blood_donor_controller