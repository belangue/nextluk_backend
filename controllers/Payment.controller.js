const PaymentModel = require("../models/Payment");


exports.getAll = async(req, res) => {
    try {
        res.status(200).send({
            payment: PaymentModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
exports.delete = async (req, res) => {
    try {
        console.log(req.body);
        const [payment] = await Promise.all([
            PaymentModel.getByID(req.params.id),
        ]);
        if (!payment)
            return res.status(401).json({ error: 'No payment made.' });

        // console.log(user);
        payment.delete()
        res.status(201).send({ message: `payment deleted successfully!` });
    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }
};
exports.getByID = async (req, res) => {
    try {
        res.status(200).json({
            "payment": await PaymentModel.getByID()
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
