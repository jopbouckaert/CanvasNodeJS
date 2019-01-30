// //canvas
// const fs = require('fs')
// const { createCanvas } = require('canvas')
// const canvas = createCanvas(96, 64)
// const ctx = canvas.getContext('2d')

var Jimp = require('jimp');


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
    var totalpeople = req.body.total;
    console.log(req.total);
    console.log("------------------------------------")
    console.log(req.body.total);
    var currentpeople = req.body.current;
    console.log(req.current);
    console.log("------------------------------------")
    console.log(req.body.current);

    new Jimp(96, 64, 0x000000ff, (err, image) => {
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
          var red = this.bitmap.data[idx + 0];
          var green = this.bitmap.data[idx + 1];
          var blue =  this.bitmap.data[idx + 2];
          var alpha = this.bitmap.data[idx + 3];
    
          if(x == image.bitmap.width - 1 || y == image.bitmap.height - 1 || x ==0 || y == 0){
            this.bitmap.data[idx + 0] = 0xFF;
           }
      });

      Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
        image.print(font, 10, 10, 'Current: ' + totalpeople);
        image.print(font, 10, 30, 'Total: ' + currentpeople);
  
        image.getBase64Async("image/png").then(result => {
          res.send(result);
        }).catch(err => {
          console.log("Failed to get the base 64 representation");
        })
      })
      .catch(err => {
        console.log("Failed to load font");
      });
  
  });
})