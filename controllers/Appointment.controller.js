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
            isPaid,
            salonId,
            userId,
        } = req.body
        let id = 2
        const appointment = new AppointmentModel({
            date: date,
            isPaid: isPaid,
            salonId: salonId,
            userId: userId
        })
        appointment.save()
        console.log("here");
        res.status(200).json({
            "message": "Appointment Created Succesfully"
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
        console.log('Delete request body:', req.body);
        console.log('Delete request params:', req.params);

        const appointmentId = req.params.id;
        const appointment = await AppointmentModel.getByID(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment does not exist.' });
        }

        await AppointmentModel.delete(appointmentId);

        res.status(200).json({ message: 'Appointment deleted successfully!' });
    } catch (e) {
        console.error('Error during appointment deletion:', e);
        return res.status(500).json({ error: 'Server error', details: e.message });
    }
};

exports.getByID = async (req, res) => {
    try {
        console.log(req.params.id);
        let appoinment =  await AppointmentModel.getByID(req.params.id)
        console.log(appoinment);
        
        res.status(200).json({
            "appointment":appoinment
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
exports.update = async (req, res) => {
    try {
        let { date} =req.body;
        console.log(req.body);
        const [appointment] = await Promise.all([
            AppointmentModel.getByID(req.params.id),
        ]);
        if (!appointment)
            return res.status(401).json({ error: 'Account do not exist.' });

        // console.log(user);
        appointment.date = date || appointment.date
        appointment.save()
        res.status(201).send({ message: `appointment updated successfully!` });
    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }
};