var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var Schema = mongoose.Schema;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/webdxd');

var studentSchema = new Schema({
    name: String,
    age: Number,
    school: String
});

var studentModel = mongoose.model('students', studentSchema);

app.get('/', function (req, res) {
    studentModel.find().exec(function (err, doc) {
        if (err) {
            res.send("Error!");
        } else {
            res.send(doc);
        }
    });
});

//Post new record
app.post('/', function (req, res) {
    var studentObject = new studentModel(req.body);
    studentObject.save();
    res.send("Success");
});

//Update record
app.post('/:id', function (req, res) {
    studentModel.update({ _id: req.params.id }, { $set: req.body }, function (err, doc) {
        if (err) {
            res.send("error");
        } else {
            res.send("success")
        }
    });
});

app.delete('/:id', function (req, res) {
    studentModel.findById(req.params.id).remove(function (err, doc) {
        if (err) {
            res.send("Error!");
        } else {
            res.send("Success");
        }
    });
});

app.get('/:id', function (req, res) {
    studentModel.findById(req.params.id, function (err, doc) {
        if (err) {
            res.send("Error!");
        } else {
            console.log(doc);
            res.send(doc);
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});