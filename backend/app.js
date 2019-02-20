//back end - express should connect to the database or server here.

const express = require('express')
const app = express()
var connection = require('./connection')
var beacon = require('./models/beacon')
var BeaconController = require('./controllers/beacons')
app.use('/beacons', BeaconController)

var i = 1

// //local DB info - different per person
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack)
//     return
//   }
//   console.log('connected as id ' + connection.threadId)
// })

app.use((req, res, next) => {
  res.send('Hello - !')
  next()
})

// app.use((req, res, next) => {
//   if(i == 2){
//     console.log("Function for Heat Map")
//     beacon.getBeaconsByDateTimeForHeatmap('2018-01-01', '2018-01-02', '07:30:00', '8:01:32')
//     next()
//   }
//   i++
//   //console.log(obj)
// })

app.use((req, res, next) => {
  if(i == 2){
    console.log("Function for Routing")
    beacon.getBeaconsByDateTimeForRouting('2018-01-19', '2018-08-02', '07:30:00', '8:01:32')
  }
  i++

  next()
})

module.exports = app