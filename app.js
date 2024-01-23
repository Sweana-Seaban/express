const express = require('express');
const app = express()

app.get('/',(req,res)=>{
    console.log('get method')
    res.status(200).send('home page')
})


app.get('/about',(req,res)=>{
    console.log('get method')
    res.status(200).send('about page')
})

app.all('*',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})


//app.get
//app.put
//app.post
//app.all
//app.use
//app.listen
//app.delete
