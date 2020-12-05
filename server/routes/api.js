const express = require('express')
const axios = require('axios').default
const router = express.Router()
const City = require('../models/CityModel')
const env = require('dotenv').config()

const apiKey = process.env.WEATHER_API_KEY

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
            temp: Math.round(weather.main.temp),
            condition: weather.weather[0].main,
            conditionPic: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        }
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