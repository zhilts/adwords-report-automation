# Headless Browser

### Preparing

1. Build PhantomJS from [this Pull Request] (https://github.com/ariya/phantomjs/pull/11484) and add it to the PATH environment variable
2. Get CasperJS from [this Pull Request] (https://github.com/n1k0/casperjs/pull/1137) and add it to the PATH environment variable
3. Install Node.js
4. Run `npm install`

***

+ [Instruction](https://gist.github.com/piscisaureus/3342247) to get specific Pull Request
+ In the `bin` directory you'll find required version of the PhantomJS built on the `Linux Mint 17.1, kernel 3.13.0-37-generic, x86_64`

### Run

1. From the console go to the current directory
2. Run following command: `casperjs ./app/run.js`

### Result

Report will be downloaded into `./reports/<report_name>.csv` file in the <b>UTF-16</b> encoding.