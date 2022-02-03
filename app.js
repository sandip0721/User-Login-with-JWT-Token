const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api/get', (req,res)=>{
    res.json({
        message : 'Welcome to API'
    });
});

app.post('/api/posts',verifyToken, (req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                authData,
                message : "Post Created...."
            });

        }
    })
    
});


app.post('/api/login',(req,res)=>{
    //Mock user
    const user = {
        id: 1,
        username: "Sandip",
        email: "sandip@gmail.com",
        password: 1234567890
    }
    jwt.sign({user}, 'secretkey',(err,token)=>{
        res.json({
            token
        })
    });
});
// Verify Token
//Authorization: Bearer <access_Token>

function verifyToken(req,res,next){
    // get the Auth value

    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader !=='undefined'){
        // spleet at the space
        const bearer = bearerHeader.split(' ');
        // get token from from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();

    }else{
        //Forbidden
        res.sendStatus(403);
    }

}


app.listen(5000, ()=> console.log("Server Started at port 5000"));
