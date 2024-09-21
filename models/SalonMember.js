const connection = require('../config/dbConfig')

const SalonMemberModel = function (model, options) {
    this.salonId = model.salonId
    this.userId = model.userId
}
SalonMemberModel.getAll = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM SalonMember where salonId = ${id}'`, async (err, resp) => {
                if (err) {
                    reject("can not get data", err);
                }
                if (resp.length) {
                    const salonMemberList = resp.map(row => new SalonMemberModel(row).toJson());
                    resolve(salonMemberList);
                } else {
                    resolve([]);
                }
            });
        });
    } catch (error) {
        throw ("Can not save salon error", err)
    }

};
SalonMemberModel.getMember = async (salonId, memberId) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM SalonMember where salonId = '${salonId}' AND userId = '${memberId}'`,
                async (err, resp) => {
                    if (err) {
                        reject("can not get data", err);
                    }
                    if (resp.length) {
                        // const salonMemberList = resp.map(row => new SalonMemberModel(row).toJson());
                        resolve(new SalonMemberModel(resp[0]));
                    } else {
                        resolve([]);
                    }
                });
        });
    } catch (error) {
        throw ("Can not save salon error", err)
    }

};
SalonMemberModel.prototype.save = async function () {
    try {
        await connection.query("INSERT INTO SalonMember SET ?", this, (err, res) => {
            if (err) {
                throw ("Can not save user error", err)
            }
        });
    } catch (error) {
        throw ("Can not save user error", err)
    }

};
SalonMemberModel.delete = async function (salonId, userId) {
    try {
        connection.query(`DELETE FROM SalonMember WHERE userId = ${userId} AND salonId = ${salonId}`, (err, res) => {
            if (err) {
                throw ("can not delete data", err)
            }
        });
    } catch (error) {
        throw ("can not delete data", err)
    }
};
SalonMemberModel.prototype.toJson = function () {
    try {
        return {
            salonId: this.salonId,
            userId: this.userId
        };
    } catch (error) {
        throw ("Can not save salon error", err)
    }
};

module.exports = SalonMemberModel;