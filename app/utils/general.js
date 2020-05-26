const config = require ('../../config.json');
const General = function(){

    var jwt = require('jsonwebtoken');
    //General.defaultDatabase = 'sqlite';

    if(typeof General.firebase == 'undefined'){ //define attributes of firebase
        const admin = require("firebase-admin"); //use of firebase admin install with npm firebase-admin
        const serviceAccount = require("../../private/key.json"); //read key 

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: config.database.firebase.url
        });
        
        General.firebase = admin;
    }

    /*if(typeof General.sqlite == 'undefined'){//define attributes sqlite
        const sqlite3 = require('sqlite3').verbose(); //use of sqlite3 install with npm sqlite3
        const sqliteClient = new sqlite3.Database('./db/db.sqlite');  //create databe with name: sqliteClient
        General.sqlite = sqliteClient;
    }*/

    this.getFirebase = function(){
        return General.firebase;
    };
    this.getSQLite = function(){
        return General.sqlite;
    };


    this.getDatabaseModel = function(database){
        let model;
        
        //switch(General.defaultDatabase){
        switch(database){ //election of motor databse
            /*case 'sqlite':
                console.log('sqlite');
                model = require('../models/sqlite-model')(General.sqlite);
            break;*/
            case 'firestore':
                console.log('firestore');
                model = require('../models/firestore-model')(General.firebase.firestore());
            break;
        }
        
        return model;
    }

    /*this.setDefaultDatabase = function(database){
        General.defaultDatabase = database;
    }*/

    this.validateLogin = function(request){
        let result = {
            auth: false,
            message: 'initial value'
        };
        
        let token = request.headers['auth-jwt'];

        if (token){ //validate token
            jwt.verify(token,config.jwt.secret,function(err,decoded){
                if (err) {
                    result.auth = false;
                    if (typeof err == 'TokenExpiredError'){
                        result.message = 'Token expirated in' +err.expiredAt;
                    }else{
                        result.message = 'Invalid token';
                    }
                } else {
                    result.auth = true;
                    result.message = decoded
                }
            });
        }else{
            result.auth= false;
            result.message= 'Not send a token'
        }

        return result;
    }

    return this;
};

module.exports = General;