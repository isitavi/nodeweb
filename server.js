const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



var app = express();

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear',() => {
    return new Date().getFullYear()
});

hbs.registerHelper('upperCase',(text) => {
    return text.toUpperCase();
});


app.use((req,res,next,) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log();
    fs.appendFile('user.log',log + '\n', (err) =>{
        if(err){
            console.log('Something worng happend when write to file');
        }
    });
    next();
});


app.set('view engine','hbs');




// app.use((req,res,next) => {
//     res.render('maintaince.hbs');
// });

app.get('/',(req,res) => {
    res.render('home.hbs',{
        MSG: 'Welcome Alex!!',
        pageTitle: 'Home Page'
    });
});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});



app.get('/bad',(req,res,err) => {
    res.send({
        User: 'Anonymous_User',
        location:[
            'Address: Recorded',
            'Latitude:2'

        ]
    })
});









app.listen(3000,() => {
    console.log('Server is listening on 3000');
});