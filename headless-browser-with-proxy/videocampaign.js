var phantom = require('phantom');
var colors = require('colors');
var fs = require('fs');

var ssl = "--ignore-ssl-errors=yes", proxy = "--proxy=localhost:8080";

var main = function (ph) {
    ph.createPage(function (page) {
        page.set('settings', {
            userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/41.0.2272.76 Chrome/41.0.2272.76 Safari/537.36",
            javascriptEnabled: true,
            loadImages: true
        });

        page.set('onResourceReceived', function (response, d) {
            if (response['contentType'] === 'application/csv' && response.stage == 'start') {
                console.log('File:', response.url.underline.cyan);
            }
        });


        page.set('onConsoleMessage', function () {
        });

        page.set('onError', function () {
        });

        var idx = 1;
        function reportStatus(step, success) {
            var c = step.replace(/\s/g, '_');
            page.render("screenshots/" + idx.toString() + "_" + c + ".png");
            console.log(step.white, (success ? "success".green : "failure".red));
            idx++;
        }

        page.open("https://adwords.google.com/video/VideoCampaign", function (status) {
            setTimeout(function () {
                reportStatus("Opened Google Login Page", true);
                page.evaluate(function () {
                    var mail = document.getElementById('Email');
                    var pass = document.getElementById('Passwd');
                    var btn = document.getElementById('signIn');
                    mail.value = 'alexanderjames.sigma@gmail.com';
                    pass.value = '$123456Qwerty$';
                    btn.click();
                    return !!mail;
                }, function (mailOnThePage) {
                    //page.reload();
                    reportStatus("Filling login form with credentials", mailOnThePage);

                    setTimeout(function () {
                        page.evaluate(function () {
                            var element = document.querySelector("#gwt-debug-Toolbelt-reportButton");
                            return !!element;
                        }, function (el) {
                            reportStatus("Opened page with Video campaign", el);

                            page.evaluate(function () {
                                var element = document.querySelector("#gwt-debug-Toolbelt-reportButton");
                                var ev = document.createEvent("MouseEvent");
                                ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
                                result = element.dispatchEvent(ev);
                                return !!result;
                            }, function (result) {
                                reportStatus("Downloading the CSV report", result);
                                setTimeout(function () {
                                    ph.exit(0);
                                }, 4000);
                            });
                        });

                    }, 15000);
                });
            }, 2000);
        });
    });
};

if(process.argv.slice(2)[0] == "--proxy"){
    phantom.create(ssl, proxy, main);
} else {
    phantom.create(ssl, main);
}



