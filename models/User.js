const connection = require('./config/dbConfig')

const UserModel = function (model) {
    this.user_id = model.user_id
    this.password = model.password
    this.name = model.name
    this.email = model.email
    this.password_confirmation = model.password_confirmation
}

UserModel.getAll = result => {
    connection.query("SELECT * FROM users", (err, resp) => {
        if (err) {
            console.error("error getting all users", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}