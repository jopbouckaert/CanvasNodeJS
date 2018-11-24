//POST 172.16.1.12/api/image body: image: base 64(bytes)->png format 96x64px

const fs = require('fs')
const { createCanvas } = require('canvas')
const canvas = createCanvas(96, 64)
const ctx = canvas.getContext('2d')
//Express
const express = require('express')
const app = express()
const port = 3000

var ttn = require("ttn")
var appID = "iot-tv"
var accessKey = "ttn-account-v2.Mf7Yb3RcFvB2q7wV09I1nbihROIlSrN_N9dSPc1xEWs"

ttn.data(appID, accessKey)
.then(function (client) {
    client.on("uplink", function (devID, payload) {
        var devID = "sensor-02"
        console.log("Received uplink from ", devID)
        console.log(payload.payload_fields.temperature)

        ctx.font = '20px Impact'
        ctx.fillStyle = "#ff0000";
        ctx.fillText(payload.payload_fields.temperature + "°C", 10, 50)

        //image source in de console
        console.log('<img src="' + canvas.toDataURL(canvas, '#ffffff') + '" />')
        
        //opslaan van afbeeldiing in images map
        const out = fs.createWriteStream('images/temperature.png')
        const stream = canvas.createPNGStream()
        stream.pipe(out)
        out.on('finish', () =>  console.log('The PNG file was created.'))
    })
})
.catch(function (error) {
    console.error("Error", error)
    process.exit(1)
})

//Express
app.get('/', (req, res) => res.send(canvas.toDataURL(canvas)))
app.listen(port, () => console.log(`Temperature app listening on port ${port}!`))