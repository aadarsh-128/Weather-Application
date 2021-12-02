const request = require('postman-request')
require('dotenv').config();

const API_KEY = process.env.FORECAST_API_KEY
const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key='+ API_KEY+'&query='+(latitude)+','+(longitude)+'&units=m'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location.', undefined)
        } else{
            console.log(body.current.weather_icons)
            const fc = body.current.weather_descriptions[0]+ '. It is currently '+ body.current.temperature+' degres out. It feels like '+body.current.feelslike+' degress out'
            console.log(fc)
            callback(undefined,{
                weather_icons: body.current.weather_icons,
                forecast: fc
        })
        }
    })
}

module.exports = forecast