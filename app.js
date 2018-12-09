//canvas
const fs = require('fs')
const { createCanvas } = require('canvas')
const canvas = createCanvas(96, 64)
const ctx = canvas.getContext('2d')

//imagestream
const out = fs.createWriteStream('images/temperature.png')
const stream = canvas.createPNGStream()

//bodyparser
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json() 

//Express
const express = require('express')
const app = express()
const port = 4000

app.listen(port, '0.0.0.0', function (err) {
    if (err) {
      throw err
    }
      console.log(`Temperature app listening on port ${port}!`)
})

app.post('/', jsonParser, (req, res) => {
    var data = req.body.value;
    console.log(req.body);
    console.log("------------------------------------")
    console.log(req.body.value);
  
    //image
    height = canvas.height
    width = canvas.width
    ctx.clearRect(0,0,width,height)    
    ctx.font = '25px Impact'
    ctx.fillStyle = "#ff0000"
    ctx.fillText(data + "°C", 5, 40)

    stream.pipe(out)
    out.on('finish', () =>  console.log('The PNG file was created.'))
    res.send(canvas.toDataURL(canvas))
})