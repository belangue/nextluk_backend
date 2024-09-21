const HairstyleModel = require("../models/Hairstyle");


exports.getAll =async (req, res) => {
    try {
        res.status(200).send({
            hairstyle:await HairstyleModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
exports.createHairstyle = async (req, res) => {
    try {
        let {
            hairstyleId,
            name,
            description,
            previewImage,
        } = req.body
        const hairstyle = new HairstyleModel({
            hairstyleId: hairstyleId,
            name: name,
            description: description,
            previewImage: previewImage
        });
        hairstyle.save()
        console.log("here");
        res.status(200).json({
            "message": "hairstyle Created Succesfully"
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
        const [hairstyle] = await Promise.all([
            HairstyleModel.getByID(req.params.id),
        ]);
        if (!hairstyle)
            return res.status(401).json({ error: 'Hairstyle does not exist.' });

        // console.log(user);
        hairstyle.delete()
        res.status(201).send({ message: `hairstyle deleted successfully!` });
    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }
};
exports.update = async (req, res) => {
    try {
        console.log(req.body);
        const [hairstyle] = await Promise.all([
            HairstyleModel.getByID(req.params.id),
        ]);
        if (!hairstyle)
            return res.status(401).json({ error: 'Hairstyle does not exist.' });

        // console.log(user);
        hairstyle.name = req.body.name || hairstyle.name
        hairstyle.save()
        res.status(201).send({ message: `hairstyle deleted successfully!` });
    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }
};
exports.getByID = async (req, res) => {
    try {
        res.status(200).json({
            "hairstyle": await HairstyleModel.getByID(req.params.id)
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
exports.getBySalon = async (req, res) => {
    try {
        res.status(200).json({
            "hairstyle": await HairstyleModel.getBySalon(req.params.id)
        });
    } catch (error) {
        res.status(401).send({
            message: `Something went wrong check you internet connection`
        });
    }
};
// Upload hairstyle image
exports.addImage = async (req, res) => {
    try {
        const hairstyleId = req.params.hairstyleId;
        const image = req.file; // Assuming you're using a middleware to handle file uploads

        // Upload the image to your storage and get the URL or path
        const imageUrl = await uploadImage(image);

        const hairstyle = await HairstyleModel.getByID(hairstyleId);
        if (!hairstyle) {
            return res.status(404).json({ error: 'Hairstyle not found' });
        }

        hairstyle.image = imageUrl;
        await hairstyle.save();

        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image', message: error.message });
    }
};

