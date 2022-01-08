const request = require('postman-request');

const geocode = (address, callback) => {
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGFydGhlZWVlZWUiLCJhIjoiY2t4eXMwdTN2MjJwNTJ3bzV3enRvbDFlbiJ9.eZ6uuY7f07Bw-mrpvSGncw&limit=1`;

    request({url: geoCodeURL, json: true}, (error, response) => {
        if(error) {
            callback("Unable to connect to the geocode service!", undefined);
        } else if(response.body.message) {
            callback(response.body.message, undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;