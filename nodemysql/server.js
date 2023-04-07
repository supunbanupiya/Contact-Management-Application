const express = require('express');
const bodyParser =require('body-parser');
const mysql =require('mysql');
const server = express();
server.use(bodyParser.json());

//Establish the database mysql.createConnection 
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"dbsmschool",
});

db.connect(function(error){
 if(error){
    console.log('error connecting to db');
 }
 else{
    console.log('successfully connected to the db 8080');
 }});

//Establish the port
 server.listen(8085,function check(error){
    if(error){
        console.log('error!!!......'); }
    else {console.log("started!!!!.....");
    }
 });

 //create the Record
server.post("/api/student/add",(req,res)=>{
    let details ={
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee,
    };

    let sql="INSERT INTO student SET ?";
    db.query(sql,details,(error)=>{
        if(error){
            res.send({status:false,message:'student created failed'});
        } else{
            res.send({status:true,message:'Student created successfully'});
        }
    });
}); 

server.get("/api/student",(req,res)=>{
    var sql ="SELECT * from student";
    db.query(sql,function(error,result){
        if(error){
            console.log("error connecting to db");
        } else{
            res.send({status:true,data:result});
        }
    })
})

//Search Record
server.get("/api/student/:id",(req,res)=>{
    var studentid = req.params.id;
    var sql = "SELECT * from student WHERE id =" +studentid;
    db.query(sql,function(error,result){
        if(error){
            console.log("error connecting to db");
        }else{
            res.send({status:true,data:result});
        }
    });
});

//update the records
server.put("/api/student/update/:id",(req,res)=>{
    let sql = "UPDATE student SET stname = '" + 
    req.body.stname +
    "',course='" +
    req.body.course +
    "', fee = '"+ 
    req.body.fee +
    "' WHERE id="+ 
    req.params.id;

    let a = db.query(sql,(error,result)=>{
        if(error){
            res.send({status:false,message:"student updated failed!!"});
        } else{
            res.send({status:true,message:"student updated successfully!!"})
        }
    });
});

//Delete the records
server.delete("/api/student/delete/:id",(req,res)=>{
    let sql = "DELETE FROM student WHERE id = "+req.params.id+"";

    let a = db.query(sql,(error)=>{
        if(error){
            res.send({status:false,message:"student deleted failed!!"});
        } else{
            res.send({status:true,message:"student deleted successfully!!"});
        }
    });
});