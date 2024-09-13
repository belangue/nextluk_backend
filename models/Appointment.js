const connection = require('../config/dbConfig')

const AppointmentModel = function (model) {
    this.appointmentId = model.appointmentId
    this.date = model.date
    this.isPaid = model.isPaid
    this.userId = model.userId
    this.hairdresserId = model.hairdresserId
    this.salonId = model.salonId
}

AppointmentModel.getAll = async () => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM appointment`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    console.log("Appointment objects:", resp[0]);
                    console.log(new AppointmentModel(resp[0]));
                    const appointmentList = resp.map(row => new AppointmentModel(row).toJson());
                    resolve(appointmentList);
                } else {
                    resolve([]);
                }
            });
        });
    } catch (error) {
        throw ("Can not save appointment error", err)
    }

};
AppointmentModel.prototype.save = async function () {
    try {
        if (this.appointmentId) {
            await connection.query("UPDATE users SET ? WHERE appointmemtId = ?", [this, this.appointmentId], (err, res) => {
                if (err) {
                    throw ("Can not save appointment error", err)
                }
            });
        } else {
            this.token = null
            console.log(this);
            await connection.query("INSERT INTO appointment SET ?", this, (err, res) => {
                if (err) {
                    throw ("Can not save appointment error", err)
                }
                this.appointmentId = res.insertId;
                console.log(this.appointmentId);
            });
        }
    } catch (error) {
        throw ("Can not save appointment error", err)
    }

};
AppointmentModel.getByID = (id) => {
    connection.query(`SELECT * FROM appointment where appointment_id = '${id}'`, (err, resp) => {
        if (err) {
            throw ("can not get data", err)
        }
        if (resp.length) {
            // console.log("Users objects:", resp[0]);
            return new AppointmentModel(resp[0])
        }
        return null
    })
}
AppointmentModel.prototype.delete = async function () {
    console.log(this);
    try {
        connection.query(`DELETE FROM appointment WHERE appointment_id = ${this.Id}`, (err, res) => {
            if (err) {
                throw ("can not delete data", err)
            }
        });
    } catch (error) {
        throw ("can not delete data", err)
    }
};

// method to send data to the front end
AppointmentModel.prototype.toJson = function () {
    try {
        return {
            "appointmentId": this.appointment_id,
            "date": this.date,
            "isPaid": this.isPaid,
            "userId": this.user_id,
            "salonId": this.salon_id,
            "hairdresserId": this.hairdresser_id,
        };
    } catch (error) {
        throw ("Can not save appoinment error", err)
    }
};
module.exports = AppointmentModel;