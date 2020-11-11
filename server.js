var express = require('express');
var app= express();
var mongoose = require('mongoose');

var db = mongoose.connect("mongodb://localhost/namesdb");
var nameSchema = require('./schema_file.js').nameSchema;
var Names = mongoose.model('Names', nameSchema);



mongoose.connection.once('open', function() {
    app.use('/',express.query());
    app.use(express.json());
    app.use( express.static('front-end/dist/front-end/'));

    app.delete("/names",function (request, response){
        Names.deleteOne({_id: request.query.id}).exec(function (err){
            response.status(200);
            response.send(JSON.stringify({}));
        });
    });

    app.get('/names', function (request, response) {
        var query = Names.find();
        query.exec(function (err, docs){
            response.status(200);
            response.send(JSON.stringify({docs}));
        });
    })

    app.post('/name',function (request, response) {
        var newName = new Names({
            name: request.body.name
        });
        newName.save(function (err,doc){
            console.log(doc)
            response.status(200);
            response.send(JSON.stringify(doc));
        })

    });


    app.listen(8080, function(){
        console.log('Application is running!');
    })
});

