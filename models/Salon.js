const connection = require('./config/dbConfig')

const SalonModel = function (model, options) {
    this.SalonId = model.SalonId
    this.name = model.Name
    this.location = model.Location
    this.listHairdressers = model.listHairdressers
}

SalonModel.getAll = result => {
    connection.query("SELECT * FROM users", (err, resp) => {
        if (err) {
            console.error("error getting all users", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}