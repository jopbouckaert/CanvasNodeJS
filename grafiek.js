//POST 172.16.1.12/api/image body: image: base 64(bytes)->png format 96x64px

const fs = require('fs')
const out = fs.createWriteStream('images/grafiek.png')

const { createCanvas } = require('canvas')
const canvas = createCanvas(96, 64)
const ctx = canvas.getContext('2d')
const stream = canvas.createPNGStream()

//Express
const express = require('express')
const app = express()
const port = 3000

ctx.font = '10px Impact'
ctx.fillStyle = "#ff0000";
ctx.fillText('Temperature', 25, 10)
ctx.beginPath();
ctx.strokeStyle = "rgba(255, 0, 0, 1)"
height = canvas.height
width = canvas.width
ctx.moveTo(0, 0)
ctx.lineTo(0, height)
ctx.lineTo(width, height)

ctx.moveTo(5, 47)
ctx.lineTo(10,50)
ctx.lineTo(20, 48)
ctx.lineTo(30, 45)
ctx.lineTo(40, 42)
ctx.lineTo(50, 45)
ctx.lineTo(60, 50)
ctx.lineTo(70, 48)
ctx.lineTo(80, 52)
ctx.lineTo(90, 50)

ctx.lineWidth = 1

ctx.stroke()

console.log('<img src="' + canvas.toDataURL(canvas, '#ffffff') + '" />')

stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created.'))


//Express
app.get('/', (req, res) => res.send(canvas.toDataURL(canvas)))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))