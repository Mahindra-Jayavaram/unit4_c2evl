const mongoose = require("mongoose")

const connect=() =>{
    return mongoose.connect("mongodb+srv://mahindra:mahi_123@cluster0.p0wh2.mongodb.net/banks?retryWrites=true&w=majority")
}

module.exports =connect;