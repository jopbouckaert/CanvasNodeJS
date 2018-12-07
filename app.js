//POST 172.16.1.12/api/image body: image: base 64(bytes)->png format 96x64px
const fs = require('fs')
const { createCanvas } = require('canvas')
const canvas = createCanvas(96, 64)
const ctx = canvas.getContext('2d')

//bodyparser
const bodyParser = require('body-parser');

//Express
const express = require('express')
const app = express()
const port = 4000

var jsonParser = bodyParser.json() 
  
  app.listen(port, '0.0.0.0', function (err) {
    if (err) {
      throw err
    }
    
    //Express
    console.log(`Temperature app listening on port ${port}!`)
})

app.post('/', jsonParser, (req, res) => {
  console.log('request on /')
  var data = req.body.value;
  console.log(req.body);
  console.log(req.body.value);
  //image
  height = canvas.height
  width = canvas.width
    ctx.clearRect(0,0,width,height)    
    ctx.font = '28px Impact'
    ctx.fillStyle = "#ff0000"
    ctx.fillText(data + "°C", 5, 40)
    //image source in de console
    //console.log('<img src="' + canvas.toDataURL(canvas, '#ffffff') + '" />')
    //opslaan van afbeeldiing in images map
    const out = fs.createWriteStream('images/temperature.png')
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () =>  console.log('The PNG file was created.'))
    res.send(canvas.toDataURL(canvas))
  })