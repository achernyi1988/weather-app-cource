//const { log, log_err, log_warn } = require("../../../utils/logs")

//import {log} from "../../../utils/logs"

console.log("JS says hello heroku")

const searchForm = document.querySelector("form")

const searchText = document.querySelector("input")

const messageOne = document.querySelector("#message-1")

const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")
//messageOne.textContent = "Hi"
//context




const secondLine = document.querySelector("#second_line")

searchForm.addEventListener(('submit'), (e) => {
   e.preventDefault();
   const address = searchText.value

   messageOne.textContent = "loading..."
   messageTwo.textContent = ""
   messageThree.textContent = ""  

   fetch("/weather?address=" + address)
      .then((response) => response.json()
         .then((data) => {

            if (data.err) {
               messageOne.textContent = data.err
               messageTwo.textContent = ""
               messageThree.textContent = ""  
            } else {
               messageOne.textContent = "temperature: " + data.temperature
               messageTwo.textContent = "descriptions: " + data.weather_descriptions
               messageThree.textContent = "humidity: " + data.humidity
               
            }
         })).catch((err)=>{
            console.log(err)
         })
})