exports.url = 'https://adwords.google.com/video/VideoCampaign?hl=en';

exports.selectors = {
    loginForm: 'form#gaia_loginform',
    loginButton: 'form#gaia_loginform input[type="submit"]',
    downloadButton: '#gwt-debug-Toolbelt-reportButton'
};

exports.credentials = {
    login: 'alexanderjames.sigma@gmail.com',
    pass: '$123456Qwerty$'
};

exports.stepNames = {
    openLogin: 'Opened Google Login Page',
    fillingLogin: 'Filling login form with credentials',
    openCampaign: 'Opened page with Video campaign',
    downloadingCsv: 'Downloading the CSV report'
};

exports.paths = {
    screenshots: './screenshots/',
    reports: './reports/'
};