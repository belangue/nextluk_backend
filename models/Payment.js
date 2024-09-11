const connection = require('../config/dbConfig')

const PaymentModel = function (model) {
    this.payment_id = model.payment_id
    this.amount = model.amount
    this.paymentDate = model.paymentDate
    this.paymentMethod = model.paymentMethod
}

PaymentModel.getAll = async () => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM payment`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    console.log("Salon objects:", resp[0]);
                    console.log(new PaymentModel(resp[0]));
                    const paymentList = resp.map(row => new PaymentModel(row).toJson());
                    resolve(paymentList);
                } else {
                    resolve([]);
                }
            });
        });
    } catch (error) {
        throw ("Can not save payment error", err)
    }

};

PaymentModel.prototype.save = async function () {
    try {
        if (this.paymentId) {
            await connection.query("UPDATE payment SET ? WHERE salonId = ?", [this, this.paymentId], (err, res) => {
                if (err) {
                    throw ("Can not save payment error", err)
                }
            });
        } else {
            this.token = null
            console.log(this);
            await connection.query("INSERT INTO payment SET ?", this, (err, res) => {
                if (err) {
                    throw ("Can not save payment error", err)
                }
                this.paymentId = res.insertId;
                console.log(this.paymentId);
            });
        }
    } catch (error) {
        throw ("Can not save payment error", err)
    }

};
PaymentModel.getByID = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM payment where paymentId = '${id}'`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    // console.log("Users objects:", resp[0]);
                    // console.log("Users objects:", new UserModel(resp[0]));
                    resolve(new PaymentModel(resp[0]));
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw ("Can not save payment error", err)
    }
}
PaymentModel.prototype.delete = async function () {
    console.log(this);
    try {
        connection.query(`DELETE FROM payment WHERE paymentId = ${this.Id}`, (err, res) => {
            if (err) {
                throw ("can not delete data", err)
            }
        });
    } catch (error) {
        throw ("can not delete data", err)
    }
};
// method to send data to the front end
PaymentModel.prototype.toJson = function () {
    try {
        return {
            payment_id: this.payment_id,
            amount: this.amount,
            paymentDate: this.paymentDate,
            paymentMethod: this.paymentMethod
        };
    } catch (error) {
        throw ("Can not save payment error", err)
    }
};

module.exports = PaymentModel;