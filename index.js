const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("static"));
let port = 3000;

let users = [{id:1,username:"omk23",name:"omkar",repoCount:50,location:"London"},
    {id:2,username:"aka14",name:"akash",repoCount:50,location:"usa"}];

app.get('/users', (req,res)=>{
    res.status(200).json(users);
});

app.get("/users/id/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const result = users.find(user => user.id === id);
    res.status(200).json(result);
});

app.listen(port, ()=>{
    console.log("Server is running on "+port);
})