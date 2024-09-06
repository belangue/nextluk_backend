const connection = require('config, dbConfig')

const PaymentModel = function (model) {
    this.payment_id = model.payment_id
    this.amount = model.amount
    this. paymentDate= model.paymentDate
    this.paymentMethod = model.paymentMethod
}

PaymentModel.getAll = result => {
    connection.query("SELECT * FROM users", (err, resp) => {
        if (err) {
            console.error("error getting all users", err)
            result(err, null)
            return;
        }
        result(null, resp)
    })
}