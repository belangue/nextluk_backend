const connection = require('../config/dbConfig')

const HairstyleModel = function (model) {
    this.hairstyleId = model.hairstyleId
    this.name = model.name
    this.description = model.description
    this.previewImage = model.previewImage
}

HairstyleModel.getAll = async () => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM hairstyle`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    console.log("Hairstyle objects:", resp[0]);
                    console.log(new HairstyleModel(resp[0]));
                    const hairstyleList = resp.map(row => new HairstyleModel(row).toJson());
                    resolve(hairstyleList);
                } else {
                    resolve([]);
                }
            });
        });
    } catch (error) {
        throw ("Can not save hairstyle error", err)
    }

};

HairstyleModel.prototype.save = async function () {
    try {
        if (this.hairstyleId) {
            await connection.query("UPDATE hairstyle SET ? WHERE salonId = ?", [this, this.hairstyleId], (err, res) => {
                if (err) {
                    throw ("Can not save hairstyle error", err)
                }
            });
        } else {
            this.token = null
            console.log(this);
            await connection.query("INSERT INTO hairstyle SET ?", this, (err, res) => {
                if (err) {
                    throw ("Can not save hairstyle error", err)
                }
                this.hairstyleId = res.insertId;
                console.log(this.hairstyleId);
            });
        }
    } catch (error) {
        throw ("Can not save hairstyle error", err)
    }

};
HairstyleModel.getByID = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM hairstyle where hairstyleId = '${id}'`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    // console.log("Users objects:", resp[0]);
                    // console.log("Users objects:", new UserModel(resp[0]));
                    resolve(new HairstyleModel(resp[0]));
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw ("Can not save hairstyle error", err)
    }
}
HairstyleModel.getHairstyleAndSalon = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM hairstyle innerjoin salon in where hairstyleId = '${id}'`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    resolve(new HairstyleModel(resp[0]));
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw ("Can not save hairstyle error", err)
    }
}
HairstyleModel.prototype.delete = async function () {
    console.log(this);
    try {
        connection.query(`DELETE FROM hairstyle WHERE hairstyleId = ${this.Id}`, (err, res) => {
            if (err) {
                throw ("can not delete data", err)
            }
        });
    } catch (error) {
        throw ("can not delete data", err)
    }
};

// method to send data to the front end

HairstyleModel.prototype.toJson = function () {
    try {
        return {
            "hairstyleId": this.hairstyle_id,
            "name": this.name,
            "description": this.description,
            "image": this.image,
        };
    } catch (error) {
        throw ("Can not save hairstyle error", err)
    }
};
module.exports = HairstyleModel;