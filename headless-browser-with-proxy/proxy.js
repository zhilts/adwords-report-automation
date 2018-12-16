var fs = require('fs');
var zlib = require('zlib');
var Thin = require('./thin');

var proxy = new Thin({
    captureInterceptor: function (params, res) {
        if (params.url.indexOf('report') != -1) {
            console.log('writing to file');
            var file = fs.createWriteStream('report.csv');
            res.pipe(zlib.createGunzip()).pipe(file);
        }
    }
});

proxy.use(function (req, res, next) {
    console.log('Proxying:', req.url);
    next();
});

proxy.listen(8080, 'localhost', function (err) {
});