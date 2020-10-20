var express = require('express')
var app= express()
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var db =mongoose.connect("mongodb://localhost/newDB");
var schema = require('./schema_file.js').somethingSchema;
var Dodad = mongoose.model('Dodad',schema);



mongoose.connection.once('open', function() {
    app.use('/',express.query())
        .use(bodyParser.urlencoded({extended:true}))
        .use( express.static('./public'));

    app.delete("/list",function (request, response){
        Dodad.deleteOne({_id: request.query.id}).exec(function (err){
            response.status(200);
            response.send(JSON.stringify({}));
        });
    });

    app.post('/save',function (request, response) {
        var newitem = new Dodad({
            something_field: request.body.thing
        });
        newitem.save(request.body, function (err,doc){
            console.log(doc)
            response.status(200);
            response.send(JSON.stringify({}));
        })

    });

    app.get('/list',function (request, response) {
        var query = Dodad.find();
        query.exec(function (err,docs){
            response.status(200);
            response.send(JSON.stringify({docs}));
        });
    });

    app.listen(8080, function(){
        console.log('Application is running!');
    })
});

