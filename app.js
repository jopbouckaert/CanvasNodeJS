//POST 172.16.1.12/api/image body: image: base 64(bytes)->png format 96x64px

const { createCanvas } = require('canvas')
const canvas = createCanvas(96, 64)
const ctx = canvas.getContext('2d')

ctx.font = '35px Impact'
ctx.fillText('15°C', 30, 30)
console.log('<img src="' + canvas.toDataURL(canvas, '#ffffff') + '" />')