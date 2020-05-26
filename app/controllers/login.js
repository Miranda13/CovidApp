const config = require ('../../config.json');

const LoginController = function(){
    const express = require('express'); //import express
    const router = express.Router(); // import router of express
    var jwt = require('jsonwebtoken'); //import jwt token
    
    router.post('/',function(request,response){
        let user = request.body.user; //get user of body
        let password = request.body.password; //get password of body
        
        if (user==config.login.username && password==config.login.password){ //validation of credentials
            let data = {
                user: user,
                date_login: new Date(),
                type: config.login.type     
            }
            
            let token = jwt.sign({
                exp: Math.floor(Date.now()/1000) +(60*config.jwt.timeToExpire), //configuration of time expiration of token
                data:data},
                config.jwt.secret);
            response.send({token:token});
        }else{
            response.send('Incorrect information');
        }
    });

    return router;
}

module.exports = LoginController;