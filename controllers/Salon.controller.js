const SalonModel = require("../models/Salon");


exports.getAll = (req, res) => {
    try {
        res.status(200).send({
            salon: SalonModel.getAll()
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
        const [salon] = await Promise.all([
            SalonModel.getByID(req.params.id),
        ]);
        if (!salon)
            return res.status(401).json({ error: 'Account do not exist.' });

        // console.log(user);
        salon.delete()
        res.status(201).send({ message: `salon deleted successfully!` });
    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }
};
exports.getByID = async (req, res) => {
    try {
        res.status(200).json({
            "salon": await SalonModel.getByID()
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
exports.save = async (res, req) => {
    try {
        res.status(200).json({
            "salon": await SalonModel.save()
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};