var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/webdxd-angular2');

var studentSchema = {
	firstName: String,
	lastName: String,
	age: Number,
    isEnrolled: Boolean
};

var Student = mongoose.model('Student', studentSchema, 'student');

var app = express();
app.use('/public', express.static('public'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
	res.sendfile('./public/index.html');
});

app.get('/students', function(req, res) {
	Student.find().exec(function(err, doc) {
		res.send(doc);
	});
});

app.get('/students/:id', function(req, res) {
	Student.findById(req.params.id, function(err, doc) {
		res.send(doc);
	});
});

app.post('/students/add', function (req, res) {
    var body = req.body;
    if (!(
            body.hasOwnProperty('firstName') &&
            body.hasOwnProperty('lastName') &&
            body.hasOwnProperty('age') &&
            body.hasOwnProperty('isEnrolled')
        )) {
        return res.status(400);
    }
    var newStudent = new Student(body);
    newStudent.save(function (err, doc) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(doc);
        }
    });
});

app.post('/students/update/', function (req, res) {
    var body = req.body;
    if (!(
            body.hasOwnProperty('_id') &&
            body.hasOwnProperty('firstName') &&
            body.hasOwnProperty('lastName') &&
            body.hasOwnProperty('age') &&
            body.hasOwnProperty('isEnrolled')
        )) {
        return res.status(400);
    }
    var query = {_id: body._id};
    Student.update(
        query,
        { $set: body},
        { multi: true },
        function (err, doc) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(doc);
            }
        }
    )
});

app.post('/students/delete/', function (req, res) {
    var body = req.body;
    if (!body.hasOwnProperty('_id')) {
        return res.status(400);
    }
    Student.remove({ _id: body._id }, function (err) {
        if (err) return res.status(400);
        res.send('successful removal');
    });
});

app.listen(3000);

console.log('Server started');
