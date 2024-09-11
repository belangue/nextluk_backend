const connection = require('../config/dbConfig')

const SalonModel = function (model, options) {
    this.SalonId = model.SalonId
    this.name = model.Name
    this.location = model.Location
    this.email = model.Email
    this.listHairdressers = model.listHairdressers
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
            connection.query(`SELECT * FROM salon where salonId = '${id}'`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    // console.log("Users objects:", resp[0]);
                    // console.log("Users objects:", new UserModel(resp[0]));
                    resolve(new SalonModel(resp[0]));
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
            Location: this.location,
        };
    } catch (error) {
        throw ("Can not save salon error", err)
    }
};

module.exports = SalonModel;