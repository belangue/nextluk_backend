const AppointmentModel = require("../models/Appointment");


exports.getAll = async (req, res) => {
    try {
        res.status(200).send({
            appointment: await AppointmentModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
exports.createAppointment = async (req, res) => {
    try {
        let {
            date,
            phone,
        } = req.body
        let id = 1
        const appointment = new AppointmentModel({
            phone: phone,
            date: appointment
        })
        appointment.save()
        console.log("here");
        res.status(200).json({
            "message": "User Created Succesfully"
        });
    } catch (error) {
        console.log(error);
        res.status(501).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
exports.delete = async (req, res) => {
    try {
        console.log(req.body);
        const [appoinment] = await Promise.all([
            AppointmentModel.getByID(req.params.id),
        ]);
        if (!appointment)
            return res.status(401).json({ error: 'Appointment do not exist.' });

        // console.log(user);
        appoinment.delete()
        res.status(201).send({ message: `appointment deleted successfully!` });
    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }
};
exports.getByID = async (req, res) => {
    try {
        res.status(200).json({
            "appointment": await AppointmentModel.getByID()
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
