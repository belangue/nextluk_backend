const SalonModel = require("../models/Salon");


exports.getAll =async (req, res) => {
    try {
        res.status(200).send({
            salon:await SalonModel.getAll()
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
exports.update = async (req, res) => {
    try {
        let { name} =req.body;
        console.log(req.body);
        const [salon] = await Promise.all([
            SalonModel.getByID(req.params.id),
        ]);
        if (!salon)
            return res.status(401).json({ error: 'Account do not exist.' });

        // console.log(user);
        salon.name = name || salon.name
        salon.save()
        res.status(201).send({ message: `salon updated successfully!` });
    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }
};
exports.getByID = async (req, res) => {
    try {
        res.status(200).json({
            "salon": await SalonModel.getByID(req.params.id)
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
exports.createSalon = async (req, res) => {
    try {
        let {
            salonId,
            name,
            address,
            phoneNumber,
            longitude,
            latitude,
        } = req.body
        const salon = new SalonModel({
            SalonId : salonId,
            name :name,
            address : address,
            phoneNumber : phoneNumber,
            longitude :longitude,
            latitude :latitude,
        });
        salon.save()
        console.log("here");
        res.status(200).json({
            "message": "Salon Created Succesfully"
        });
    } catch (error) {
        console.log(error);
        res.status(501).send({
            message: `Something went wrong check you internet connection`
        });
    }
};