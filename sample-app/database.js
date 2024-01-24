const mysql = require('mysql2')

const connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    database : 'notes_app'
}).promise()//to be able to use async and await or use callback


connection.connect(function (err) {
    if(err){
        console.log(err);
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

 //if await is not used, before compeleting database operataion result is returned i.e, undefined will be returned
 const sqlCall= async()=>{
const result = await connection.query("SELECT * FROM notes;")
console.log(result);
return result;
 }
 sqlCall()


