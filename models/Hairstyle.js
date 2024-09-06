const connection = require('config, dbConfig')

const HairstyleModel = function (model) {
    this.hairstyle_id = model.hairstyle_id
    this.name = model.name
    this.description = model.description
    this.image = model.image
}

HairstyleModel.getAll = result => {
    connection.query("SELECT * FROM users", (err, resp) => {
        if (err) {
            console.error("error getting all users", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}