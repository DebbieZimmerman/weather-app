class Weather {
    constructor () {
        this.cityData = []
    }

    async getDataFromDB () {
        try {
        const cities = await $.get(`/cities`)    
        this.cityData = cities
        } catch {
            alert(error.message)
        }
    }

    getCityData (){
        $get
    }
}