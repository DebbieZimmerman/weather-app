class Renderer {
    constructor () {

    }
    

    renderData (cities) {
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(cities)
        $('#cities-container').empty().append(newHTML)
    }
}