const User_firebase = function(){
    const express = require('express');
    const router = express.Router(); //go to direction /
    
    const general = require('../utils/general')();
    //general.getDatabaseModel('mongodb');
    let admin = general.getFirebase();

    //{{SERVER}}/users/create

    router.post('/init',function(request,response){ //method where create table users if not exist
        response.send('No aplicate');
    });
    
    //{{SERVER}}/users/clear

    router.get('/clear',function(request,response){ //clear all users of database
        response.send('Its not possible for security');
    });
    
    //{{SERVER}}/users/show

    router.get('/show',function(request,response){ //method for show all users
        admin.auth().listUsers().then(function (usersResult) {
            let allUsers = [];
            usersResult.users.forEach(element => {
                allUsers.push(element.toJSON());
            });
            response.send(allUsers);
        }).catch(function (error) {
            response.send(error);
        });
    });
    
    //{{SERVER}}/users/insert

    router.post('/insert',function(request,response){ //insert users of body
        admin.auth().createUser(request.body).then(function (users) {
            response.send(users.uid);
        }).catch(function (error) {
            response.send(error);
        });
    });

    //{{SERVER}}/users/id

    router.get('/:id',function(request,response){ //method for show one user since id
        let id = request.params.id;
        admin.auth().getUser(id).then(function (users) {
            response.send(users.toJSON());
        }).catch(function (error) {
            response.send(error);
        });
    });

    //{{SERVER}}/users/update

    router.put('/update/:id',function(request,response){ //insert users of body
        let id = request.params.id;
        admin.auth().updateUser(id,request.body).then(function (users) {
            response.send(users.toJSON());
        }).catch(function (error) {
            response.send(error);
        });     
    });
    
    //{{SERVER}}/users/delete/id

    router.delete('/delete/:id',function(request,response){ //method for delete one user
        let id = request.params.id;
        admin.auth().deleteUser(id).then(function () {
            response.send('Delete user');
        }).catch(function (error) {
            response.send(error);
        });
    });

    router.get('/token/:id',function(request,response){
        let id = request.params.id;

        admin.auth.getUser(id).then(function(users){
            let user = users.toJSON();
            let customInformation = {
                user: user,
                date_login: new Date(),
                type: 'Admin',
            };
            admin.auth().createCustomToken(id,customInformation).then(function (customToken) {
                response.send(customToken);
            }).catch(function (error) {
                response.send(error);
            });
        });    
    });
    return router;
};


module.exports = User_firebase;