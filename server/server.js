const express = require('express')

const path = require('path')

const publicPath = path.join(__dirname,'/../public')
const port = process.env.PORT || 3000

let app = express();

app.use(express.static(publicPath))
console.log(publicPath)

app.listen(port,()=>{
    console.log(`app has started ${port}`)
})