const manager = new TempManager()
const render = new Renderer()

const loadPage = async () => {
        try {
            render.renderData(await manager.getDataFromDB())
        } catch {
            console.log(error.message)
        }
    }

loadPage()

const handleSearch = async () => {
    try {
        const city = $(input).val()
        $(input).val('')
        await manager.getCityData(city)
        render.renderData(manager.cityData)
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

$('#cities-container').on('click', '.save', async function () {
    const cityName = $(this).closest('.cityWeather').find('.name').text()
    await manager.saveCity(cityName)
    render.renderData(manager.cityData)
})

$('#cities-container').on('click', '.delete', async function () {
    const cityName = $(this).closest('.cityWeather').find('.name').text()
    await manager.removeCity(cityName)
    render.renderData(manager.cityData)
})
