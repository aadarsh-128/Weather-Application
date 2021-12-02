// const { response } = require("express")

console.log('Client side js file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const weather_icon = document.getElementById("weather_icon")

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    
    message1.textContent = "Loading..."
    weather_icon.src = ""
    message2.textContent = '..'

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent=data.error
            }else{
                console.log(data)
                message1.textContent=data.location
                weather_icon.src=data.weather_icon
                message2.textContent=data.forecast
            }
        })
    })
})