const express = require('express')
const axios = require('axios').default
const router = express.Router()
const City = require('../models/CityModel')

router.get('/sanity', (req, res) => {
    res.send('Route works')
})

router.get('/:city', async (req, res) => {
    const apiKey = '723348825a8e44e130ab3d3b34b25f25'
    const city = req.params.city
    try {
        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        weather = weather.data
        const cityWeather = new City ({
            name: city,
            temp: weather.main.temp,
            condition: weather.weather[0].main,
            conditionPic: weather.weather[0].icon
        })
        cityWeather.save()
        res.send(cityWeather)
    } catch (err) {
        res.send(err.message)
    }
})

router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find({})
        res.send(cities)
    } catch {
        res.send(err.message)
    }
})


module.exports = router