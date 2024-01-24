const mysql = require('mysql2')

const dotenv = require('dotenv')
dotenv.config()


const connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
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
export const getAllNotes= async()=>{
const [rows] = await connection.query("SELECT * FROM notes")

console.log(rows);
// return result;
 }
 getAllNotes()


 export const getSinglenote = async(id) =>{
    const [row] = await connection.query(`SELECT * FROM notes WHERE id = ?`,[id])
    console.log(row[0]);
 }

getSinglenote(1)


export const createNote =async(title,desc) =>{
const result = await connection.query(`insert into notes(title,description) values(?,?)`,[title,desc])
return result;
}

console.log(createNote('third note','random note'));

