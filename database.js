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

//select all
 const getAllNotes= async()=>{
const [rows] = await connection.query("SELECT * FROM notes")

console.log(rows);
// return result;
 }
 //getAllNotes()


 //select note based on id
const getSinglenote = async(id) =>{
    const [row] = await connection.query(`SELECT * FROM notes WHERE id = ?`,[id])
    return row[0]
 }

//getSinglenote(1)

//insert note
const createNote =async(title,desc) =>{
const [result] = await connection.query(`insert into notes(title,description) values(?,?)`,[title,desc])
console.log(result)
const id = result.insertId;
console.log("Id of inserted row is:",id)
return getSinglenote(id)
}



//delete note
const deleteNote = async(id) => {
    const [deletedRow] = await connection.query(`delete from notes where id = ?`,[id])
    console.log(deletedRow)
    const noOfAffectedRows = deletedRow.affectedRows
    console.log("Number of affected rows:",noOfAffectedRows)
    return [deletedRow]
}

//update note
const updateNote = async(id,title,description) => {
    const [updatedRow] = await connection.query(`update notes set title=?,description=? where id =?`,[title,description,id])
    const noOfAffectedRows = updatedRow.affectedRows
    console.log("Number of affected rows:",noOfAffectedRows)
    return updatedRow
}



// console.log(createNote('third note','random note'));

module.exports= {getAllNotes,getSinglenote,createNote,deleteNote,updateNote}