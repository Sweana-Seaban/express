const express = require('express');

const path = require('path');

const app = express();

//statis asset server doesn't need to change it;setup paths,mime and status codes,eg:image,style or javascript file
//setup a designated folder and dump all static items into that folder
//setup static and middleware
app.use(express.static('./public'))

//we can handle index.html file either by adding to static assets or server side rendering(SSR)
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))
// })

app.all('*',(req,res)=>{
    res.status(404).send('page not found')
})

app.listen(5000,()=>{
    console.log('listening on port 5000....')
})