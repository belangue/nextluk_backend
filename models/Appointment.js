const connection = require('./config/dbConfig')

const AppointmentModel = function (model) {
    this.appointment_id = model.appointment_id
    this.date = model.date
    this.time = model.time
    this.isPaid = model.isPaid
    this.user_id = model.user_id 
    this.hairdresser_id_id = model.hairdresser_id 
    this.salon_id = model.salon_id 
}

AppointmentModel.getAll = result => {
    connection.query("SELECT * FROM users", (err, resp) => {
        if (err) {
            console.error("error getting all users", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}