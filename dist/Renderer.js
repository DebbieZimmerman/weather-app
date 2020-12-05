class Renderer {
    constructor () {

    }
    

    renderData (cities) {
        try {
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(cities)
        $('#cities-container').empty().append(newHTML)
        } catch {
            alert('Search and add cities to begin')
        }
    }
}