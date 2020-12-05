const express = require('express')
const app = express()
const path = require('path')

const api = require('./server/routes/api')

const axios=require('axios').default

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api)

const PORT = 4200
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
}) 