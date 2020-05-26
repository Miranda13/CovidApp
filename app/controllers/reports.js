module.exports = function(){
    const express = require('express');
    const router = express.Router(); //go to direction /
    let TABLE = 'reports';

    const general = require('../utils/general')();
    //general.setDefaultDatabase('firestore');
    let model = general.getDatabaseModel('firebase');
    
    //{{SERVER}}/reports/insert

    router.post('/insert',function(request,response){ //insert reports of body
        let validationToken = general.validateLogin(request);
        if(validationToken.auth)
            model.create(TABLE,request.body)
            .then((object)=>{
                response.send(object);
            })
            .catch((object)=>{
                console.error(error);
                response.send(error);
            });
            else             
            response.send({error: 'You dont send a token'});
    });
    
    //{{SERVER}}/reports/show

    router.get('/show',function(request,response){ //method for show all reports
        let validationToken = general.validateLogin(request);
        if(validationToken.auth)
            model.getAll(TABLE)
            .then((rows)=>{
                response.send(rows);
            })
            .catch((error)=>{
                console.error(error);
                response.send(error);
            });
            else             
            response.send({error: 'You dont send a token'});
    });

    //{{SERVER}}/reports/id

    router.get('/:id',function(request,response){ //method for show one user since id
        let id = request.params.id;
        let validationToken = general.validateLogin(request);
        if(validationToken.auth)
            model.getById(TABLE,id)
            .then((row)=>{
                response.send(row);
            })
            .catch((error)=>{
                console.error(error);
                response.send(error);
            });
            else             
            response.send({error: 'You dont send a token'});
    });

    //{{SERVER}}/reports/update

    router.put('/update/:id',function(request,response){ //insert reports of body
        let id = request.params.id;
        let validationToken = general.validateLogin(request);
        if(validationToken.auth)
            model.update(TABLE,request.body,id)
            .then((row)=>{
                response.send(row);
            })
            .catch((error)=>{
                console.error(error);
                response.send(error);
            });
            else             
            response.send({error: 'You dont send a token'});
    });
    
    //{{SERVER}}/reports/delete/id

    router.delete('/delete/:id',function(request,response){ //method for delete one user
        let validationToken = general.validateLogin(request);
        if(validationToken.auth){
            let id = request.params.id;
            model.delete(TABLE,id)
            .then((message)=>{
                response.send(message);
            })
            .catch((error)=>{
                console.error(error);
                response.send(error);
            });
        }else {            
            response.send({error: 'You dont send a token'});}
    });
          
    return router;  
}