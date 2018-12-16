var colors = require('./node_modules/colors'),
    Utils = require('./Utils'),
    Constants = require('./Constants'),
    casper = require('casper')
        .create({
            waitTimeout: 60 * 1000 // 1 minute
        }),
    downloaded = false,
    logger = Utils.getLogger(Constants.paths.screenshots);

casper.on('resource.received', function (response) {
    if (response['contentType'] == 'application/csv' && response['stage'] == 'end') {
        var fileName = Utils.getFilenameFromResponse(response);
        Utils.saveToFile(Constants.paths.reports + fileName, response['body'].substring(2));
        downloaded = true;
    }
});

casper.start(Constants.url, function () {
    logger.logStep(Constants.stepNames.openLogin, true, this);
});

casper.waitForSelector(Constants.selectors.loginForm, function () {
    this.fill(Constants.selectors.loginForm, {
        'Email': Constants.credentials.login,
        'Passwd': Constants.credentials.pass
    }, false);
    logger.logStep(Constants.stepNames.fillingLogin, true, this);
    this.click(Constants.selectors.loginButton);
});

casper.waitForSelector(Constants.selectors.downloadButton, function () {
    logger.logStep(Constants.stepNames.openCampaign, true, this);
    this.page.captureContent = ['/.*/'];
    this.click(Constants.selectors.downloadButton);
});

casper.waitFor(function () {
    return downloaded;
}, function () {
    logger.logStep(Constants.stepNames.downloadingCsv, true, casper);
});

casper.run();
