const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const getWeather = require('./utils/getWeather')

const app = express();
const PORT = 3000;

const publicDirPath = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath));

// init route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Parthiban'
    })
});

// help route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Parthiban',
        helpText: 'Sample help text!'
    })
});

// about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Parthiban'
    })
});

// api
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Address not found"
        })
    }

    geocode(req.query.address, (error, response) => {
        if(error) {
            return res.send(error)
        } else {
            getWeather(response, (_error, _repsonse) => {
                if(error) {
                    return res.send(_error)
                }
                res.send({..._repsonse, location: req.query.address})
            })
        }
    })
})

// 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Parthiban',
        errorMsg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Parthiban',
        errorMsg: 'OOPS! Page not found.'
    })
})

// to start up the server in a desired port
app.listen(PORT, () => {
    console.log("Server is up in port:", PORT)
})