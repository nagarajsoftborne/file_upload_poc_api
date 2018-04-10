var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var fileUpload = require('express-fileupload');
var request = require('superagent');
var path = require('path');
var cors = require('cors'); 

app.use(cors());
app.use(fileUpload());

app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json());

app.post('/fileUpload', (req,res) => {
    console.log('/fileUpload', req.files.image);

    let file = req.files.image;
    let filename = file.name;

    file.mv(__dirname + '/uploads/'+filename);

        request
            .post('http://localhost:8000/receiveFile')
            .attach('pic', file.data , filename)
            .then((response) => {
                res.send(response.body);
            });

});

app.post('/receiveFile',(req,res) => {

    console.log('/receiveFile', req.files.pic);

    let file = req.files.pic;
    let filename = file.name;

    file.mv(__dirname + '/temp/'+filename);

    request
    .post('http://localhost:9000/moved')
    .attach('file', file.data , filename)
    .then((response) => {
        res.send(response.body);
    });

});

app.listen(8000,() => {
console.log('Running at Port 8000');
});

