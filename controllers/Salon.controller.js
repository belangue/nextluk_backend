const SalonModel = require("../models/Salon");


exports.getAll = async (req, res) => {
    try {
        res.status(200).send({
            salon: await SalonModel.getAll()
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
        let { name } = req.body;
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
            SalonId: salonId,
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            longitude: longitude,
            latitude: latitude,
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
// Get all salons by manager
exports.getAllFromManager = async (req, res) => {
    try {
        const managerId = req.params.managerId;
        const [salons] = await Promise.all([
            SalonModel.getAllByManager(managerId),
        ]);
        res.status(200).json(salons);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get salons by manager', message: error.message });
    }
}
exports.changeStatus = async (req, res) => {
    try {
        const salonId = req.params.salonId;
        const status = req.body.status; // Assuming status is "blocked" or "unblocked"

        const [salon] = await Promise.all([
            SalonModel.getByID(req.params.id),
        ]);
        if (!salon) {
            return res.status(404).json({ error: 'Salon not found' });
        }

        salon.status = status;
        await salon.save();

        res.status(200).json({ message: 'Salon status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update salon status', message: error.message });
    }
};

// Add a member to a salon
exports.addMember = async (req, res) => {
    try {
        const salonId = req.params.salonId;
        const userId = req.body.userId;

        const [salon, user] = await Promise.all([
            SalonModel.getByID(req.params.id),
            UserModel.getByID(req.params.id),
        ]);
        if (!salon) {
            return res.status(404).json({ error: 'Salon not found' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newMember = new SalonMemberModel({ salonId, userId });
        await newMember.save();

        res.status(201).json({ message: 'Member added to salon successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add member to salon', message: error.message });
    }
};

// Remove a member from a salon
exports.removeMember = async (req, res) => {
    try {
        const salonId = req.params.salonId;
        const memberId = req.params.memberId;

        await SalonMemberModel.delete(salonId, memberId);

        res.status(200).json({ message: 'Member removed from salon successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove member from salon', message: error.message });
    }
};
