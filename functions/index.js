const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
//const config = require ('../../config.json');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.EmailCreateUser  = functions.firestore
  .document('users/{usersId}')
  .onCreate((change,context)=>{
    
    let information = change.data();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'fullstack.covidapp@gmail.com', // generated ethereal user
          pass: 'Bictia2020', // generated ethereal password
        },
    });
    
    let emailOptions = {
      from: '"CovidApp " <fullstack.covidapp@gmail.com>',
      to: information.email,
      subject: 'Registro exitoso',
      html: '<b> Bienvenido '+information.name+' a CovidApp </b>'
    };

    return transporter.sendMail(emailOptions).then((data)=>{
      resolve(data);
      return;
    }).catch((error)=>{
      reject(error);
      return;
    });      
});

exports.EmailUpdateUser  = functions.firestore
  .document('users/{usersId}')
  .onWrite((change,context)=>{
    
    let information = change.after.data();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'fullstack.covidapp@gmail.com', // generated ethereal user
          pass: 'Bictia2020', // generated ethereal password
        },
    });
    
    let emailOptions = {
      from: '"CovidApp " <fullstack.covidapp@gmail.com>',
      to: information.email,
      subject: 'Datos actualizados exitosamente',
      html: '<b> Actualizaste tus datos en CovidApp </b>'
    };

    return transporter.sendMail(emailOptions).then((data)=>{
      resolve(data);
      return;
    }).catch((error)=>{
      reject(error);
      return;
    });      
});