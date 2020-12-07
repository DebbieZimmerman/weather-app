class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        try {
            const cities = await $.get(`/cities`)
            cities.forEach(c => this.cityData.unshift(c))
            return (this.cityData)
        } catch (err) {
            console.log(err.message)
        }
    }

    async getCityData(city) {
        try {
            const cityWeather = await $.get(`/weather/${city}`)
            await this.cityData.unshift(cityWeather)
        } catch (err) {
            console.log(err.message)
        }
    }

    async updateCity(cityName) {
        const index = this.cityData.findIndex(c => c.name === cityName)
        await $.ajax({
            url: `weather/${cityName}`,
            method: 'PUT',
            success: (res) => this.cityData.splice(index, 1, res),
            error: function (req, msg, err) {
                console.log(err)
            }
        })
    }

    async saveCity(cityName) {
        try {
            const index = this.cityData.findIndex(c => c.name === cityName)
            const cityWeather = await $.post(`weather/:city`, this.cityData[index])
            this.cityData.splice(index, 1)
            this.cityData.unshift(cityWeather)
        } catch (err) {
            alert(err.message)
        }
    }

    removeCity(cityName) {
        const index = this.cityData.findIndex(c => c.name === cityName)
        this.cityData.splice(index, 1)
        $.ajax({
            url: `weather/${cityName}`,
            method: 'DELETE',
            success: (res) => console.log(res),
            error: function (req, msg, err) {
                console.log(err)
            }

        })
    }
}
