const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directrory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Adarsh Singh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About',
        name:'Adarsh Singh'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        helpText:'This is some helpful text',
        name: 'Adarsh Singh'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {weather_icons, forecast})=>{
            if(error){
                return res.send({error})
            }
            res.send({
                weather_icon: weather_icons,
                forecast: forecast,
                location,
                address: req.query.address
            })
        })
        
    })
  
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error',{
        title: '404',
        error: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('error',{
        title: '404',
        error: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
} )