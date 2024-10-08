const connection = require('../config/dbConfig')

const SalonModel = function (model, options) {
    this.SalonId = model.SalonId
    this.name = model.name
    this.address = model.address
    this.phoneNumber = model.phoneNumber
    this.manager = model.manager
    this.createdBy = model.createdBy
    this.createdDate = model.createdDate
    this.town = model.town
    this.longitude = model.longitude
    this.latitude = model.latitude
}

SalonModel.getAll = async () => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM salon`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    console.log("Salon objects:", resp[0]);
                    console.log(new SalonModel(resp[0]));
                    const salonList = resp.map(row => new SalonModel(row).toJson());
                    resolve(salonList);
                } else {
                    resolve([]);
                }
            });
        });
    } catch (error) {
        throw ("Can not save salon error", err)
    }

};

SalonModel.prototype.save = async function () {
    try {
        if (this.salonId) {
            await connection.query("UPDATE salon SET ? WHERE salonId = ?", [this, this.salonId], (err, res) => {
                if (err) {
                    throw ("Can not save salon error", err)
                }
            });
        } else {
            this.token = null
            console.log(this);
            await connection.query("INSERT INTO salon SET ?", this, (err, res) => {
                if (err) {
                    throw ("Can not save user error", err)
                }
                this.salonId = res.insertId;
                console.log(this.salonId);
            });
        }
    } catch (error) {
        throw ("Can not save salon error", err)
    }

};
SalonModel.getByID = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT *  from salon where salonId ='${id}'`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                // console.log(resp);
                
                if (resp.length) {
                    // console.log("Users objects:", resp[0]);
                    // console.log("Users objects:", new UserModel(resp[0]));
                    resolve(new SalonModel(resp[0]).toJson());
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw ("Can not save salon error", err)
    }
}
SalonModel.getAllByManager = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT *  from salon where manager ='${id}'`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                // console.log(resp);
                
                if (resp.length) {
                    resolve(new SalonModel(resp[0]).toJson());
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw ("Can not save salon error", err)
    }
}
SalonModel.prototype.delete = async function () {
    console.log(this);
    try {
        connection.query(`DELETE FROM salon WHERE userId = ${this.Id}`, (err, res) => {
            if (err) {
                throw ("can not delete data", err)
            }
        });
    } catch (error) {
        throw ("can not delete data", err)
    }
};
// method to send data to the front end
SalonModel.prototype.toJson = function () {
    try {
        return {
            salonId: this.salonId,
            name: this.name,
            address: this.address,
            phoneNumber: this.phoneNumber,
            longitude: this.longitude,
            latitude: this.latitude,
        };
    } catch (error) {
        throw ("Can not save salon error", err)
    }
};

module.exports = SalonModel;