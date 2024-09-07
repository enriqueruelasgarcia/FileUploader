var express = require('express');
var cors = require('cors');
require('dotenv').config();
var multer = require('multer');
var path = require('path');

var app = express();

var upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
    const file = req.file;
    console.log(file)
    if (!file) {
        return res.json({ error: 'No file was uploaded' });
    }

    res.json({
        name: file.originalname,
        type: file.mimetype,
        size: file.size
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Your app is listening on port ' + port);
});