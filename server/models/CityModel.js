const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherDB', {useNewUrlParser: true, useUnifiedTopology:true})

const Schema = mongoose.Schema

const citySchema = new Schema ({
    name: String,
    temp: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model('city', citySchema)

module.exports = City