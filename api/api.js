const axios = require('axios');
const { log, log_err, log_warn } = require("../utils/logs")

const geocode = (address, callback) =>{
   //const name_param  = address.replace(/\s+/g, '%20')
   
   axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxleDE5ODgiLCJhIjoiY2tiYW0yMDI2MDZ4MDJxcW1kNHljNjZ2dyJ9.URwZnlthS7iNeluqWsbAlg`)
   .then( ({data})=> {
      const {features} = data
      if(!features){
         callback("Unable to find location . Try another search!",undefined)
      }
      else{
         const longitude  = features[0].center[0]
         const latitude  = features[0].center[1]
      
         //log(`longitude [${longitude}] latitude [${latitude}]` );
      
         callback(undefined, {latitude, longitude})
      }

   }).catch((err)=>{
      callback("Unable to connect to location services!",undefined)
   })
}


const getWeather =(latitude, longitude, callback)  => {
   const params = {
      access_key: '0f93b266b514a6b8fbbb584cb44a1e61',
      query: `${latitude},${longitude}`,
      units: "m" // Celsius
   }

   axios.get('http://api.weatherstack.com/current', {params})
      .then(({data}) => {
         // log(response.data.location);

         // log(response.data.current.weather_descriptions[0]);
         const {location} = data
         const {weather_descriptions, temperature} = data.current
         
         callback(undefined, {location,
             weather_descriptions : weather_descriptions[0],
             temperature : temperature})

      }).catch(error => {
         callback(error, undefined)
      });
}   


module.exports = {
   getWeather,
   geocode
}