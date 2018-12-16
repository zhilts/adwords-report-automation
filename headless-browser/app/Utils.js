exports.getLogger = function(screenshotsPath){
    var idx = 0;
    return {
        logStep: function (step, success, casper) {
            idx++;
            console.log(step, (success ? "success".green : "failure".red));
            if (casper) {
                var c = step.replace(/\s/g, '_');
                casper.capture(screenshotsPath + idx + '_' + c + '.png');
            }
        }
    }
};

exports.saveToFile = function(relativePath, content) {
    var fs = require('fs');
    var filePath = fs.workingDirectory + '/' + relativePath;
    fs.write(filePath, content, 'w');
};

exports.getFilenameFromResponse = function(response) {
    var headers = response['headers'];
    for (var k in headers) {
        var header = headers[k];
        if (header['name'] === 'Content-Disposition') {
            var re = /filename=(\S+)/i,
                value = header['value'],
                match = value.match(re);
            if (match.length > 1) {
                return match[1];
            }
        }
    }
    return 'Unnamed.csv';
}