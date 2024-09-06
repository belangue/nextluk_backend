const express = require('express');
const cors = require('cors');

require('dotenv').config()
const connection = require('./config/dbConfig')

connection.getConnection((err,connection) => {
    if (err) {
        console.error(err,"error getting connection")
    } else {
        console.log("connected to database");
    }
});
let app = express();
let corsOptions ={
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions));
app.get('/',(req, res) => {
    res.json({"message": "welcome to the nextluk backend!"});
});

var server = app.listen(5000,function(){
    var port = server.address().port
    console.log("Your app is listening on localhost: " + port)
})