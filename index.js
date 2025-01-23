require('dotenv').config();
const express = require("express");
let sequelize = require("./lib/sequelize");
let user = require("./models/user");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("static"));
let port = process.env.PORT || 3000;

/*let users = [{id:1,username:"omk23",name:"omkar",repoCount:50,location:"London"},
    {id:2,username:"aka14",name:"akash",repoCount:50,location:"usa"}];*/

sequelize.sync().then(()=>{
    console.log("Database connected and sync")
}).catch((error)=>{
    console.log("unable to connect to database", error);
});

app.get('/users', async (req,res)=>{
    try{
        const result = await user.findAll();
        res.status(200).json({users:result});
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.get("/users/id/:id", async (req,res)=>{
    const id = parseInt(req.params.id);
    try{
        
        const result = await user.findByPk(id);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(404).json({message:"No Users found for id"});
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({error:"failed to fetch user"});
    }
});

app.listen(port, ()=>{  
    console.log("Server is running on "+port);
})