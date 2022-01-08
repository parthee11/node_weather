const request = require('postman-request')

const getWeather = (data, callback) => {
    const {latitude, longitude} = data;
    const url = `http://api.weatherstack.com/current?access_key=b577292861a7ce181252baec581e53db&query=${latitude},${longitude}&units=f`
    
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback("Unable to connect to the geocode service!", undefined)
        } else if(response.body.error) {
            callback("Unable to find the weather for the specified location, please retry!", undefined)
        } else {
            callback(undefined, response.body.current)
        }
    })
}

module.exports = getWeather;