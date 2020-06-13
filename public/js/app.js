//const { log, log_err, log_warn } = require("../../../utils/logs")

//import {log} from "../../../utils/logs"

console.log("JS says hello heroku")

const searchForm = document.querySelector("form")

const searchText = document.querySelector("input")

const messageOne = document.querySelector("#message-1")

const messageTwo = document.querySelector("#message-2")

//messageOne.textContent = "Hi"
//context




const secondLine = document.querySelector("#second_line")

searchForm.addEventListener(('submit'), (e) => {
   e.preventDefault();
   const address = searchText.value

   messageOne.textContent = "loading..."
   messageTwo.textContent = ""

   fetch("/weather?address=" + address)
      .then((response) => response.json()
         .then((data) => {

            if (data.err) {
               messageOne.textContent = data.err
               messageTwo.textContent = ""
            } else {
               messageOne.textContent = data.temperature
               messageTwo.textContent = data.weather_descriptions
            }
         })).catch((err)=>{
            console.log(err)
         })
})