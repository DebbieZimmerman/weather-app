const express = require('express')
const axios = require('axios').default
const router = express.Router()
const City = require('../models/CityModel')

router.get('/sanity', (req, res) => {
    res.send('Route works')
})

router.get('/weather/:city', async (req, res) => {
    const city = req.params.city
    try {
        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        weather = weather.data
        const cityWeather = {
            name: city,
            temp: weather.main.temp,
            condition: weather.weather[0].main,
            conditionPic: weather.weather[0].icon
        }
        res.send(cityWeather)
    } catch (err) {
        res.send(err.message)
    }
})

router.get('/cities', async (req, res) => {
       try {
        console.log('try')
        const cities = await City.find({})
        res.send(cities)
    } catch {
        console.log('error')
        res.send(err.message)
    }
})

router.post('/weather/:city', async (req, res) => {
    const city = new City ({...req.body})
    await city.save()
    res.send(city)
})

router.delete('/weather/:city', async (req, res) => {
    const id = req.params.city
    console.log(id)
    await City.findOneAndDelete({name: id})
    res.end()
})

module.exports = router