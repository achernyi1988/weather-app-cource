const { log, log_err, log_warn } = require("../../utils/logs")
const { geocode, getWeather } = require("../api/api")

const path = require("path")

const express = require("express")
const port = process.env.PORT || 3000

const hbs = require("hbs")
const app = express()

//Define paths for Express config
const public_dir = path.join(__dirname, "../public")
const views_dir = path.join(__dirname, "../templates/views")
const partials_dir = path.join(__dirname, "../templates/partials")

//setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", views_dir)
hbs.registerPartials(partials_dir)

//setup static dir to serve
app.use(express.static(public_dir))

app.get("/products", (req, res) => {
   const { search, rating } = req.query

   if (!search) {
      return res.send({ error: "must provide a search term" })
   }

   log(search)
   log(rating)
   res.send({
      products: []
   })
})

app.get("/weather", (req, res) => {

   const { address } = req.query

   if (!address) {
      return res.send({ error: "must provide a address term" })
   }

   geocode(address, (err, { latitude, longitude } = {}) => {
      if (err) {
         return res.send({ err })
      } else {
         getWeather(latitude, longitude, (err, weatherData) => {
            if (err) {
               return res.send({ err })
            } else {
               res.send(weatherData)
               // log(weatherData)
            }
         })
      }

   })
})

app.get("/", (req, res) => {
   res.render("index", {
      header: "Weather",
      page: "Home page"
   })
})

app.get("/about", (req, res) => {
   res.render("about", {
      header: "Weather",
      page: "About us"
   })
})

app.get("/help", (req, res) => {
   res.render("help", {
      header: "Weather",
      page: "How can we help?"
   })
})


app.get("/help/*", (req, res) => {
   res.render("404", {
      header: "Weather",
      page: "Help article not found"
   })
})

app.get("*", (req, res) => {
   res.render("404", {
      header: "Weather",
      page: "Page not found"
   })
})



//const port = 3000
app.listen(port, () => {
   log("Server is up on port", port)
})