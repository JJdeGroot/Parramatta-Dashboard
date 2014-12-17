/** HOSTING */
var express = require('express'); // Express
var app = express();
app.use(express.static(__dirname + '/'));

/** Renders the homepage */
app.get('/', function (req, res) {
    res.render('index.html');
});

/** Lists files in the given path */
var fs = require('fs');
app.get('/api/files/', function (req, res) {
    console.log("GET " + req.path + " --> " + req.query.q);
    
    fs.readdir(req.query.q, function(err, files) {
        console.log(err);
        console.log(files);
        res.send(files);
    });
    
});



/** Accessable at port 9001 */
app.listen(process.env.PORT || 9001);
console.log('Your app is now running at: http://127.0.0.1:9001/');