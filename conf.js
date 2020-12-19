var HtmlReporter = require('protractor-beautiful-reporter');
var HTMLReport = require('protractor-html-reporter-2');
var jasmineReporters = require('jasmine-reporters');
//require('jasmine2-protractor-utils');
exports.config = {
   
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    capabilities:{

        'browserName':'chrome',
  
        
    },
    specs: ['validatetitles.js'],
    framework: 'jasmine2',

   


    plugins: [{
      package: 'jasmine2-protractor-utils',
      disableHTMLReport: true,
      disableScreenshot: false,
      screenshotPath:'./screenshots',
      screenshotOnExpectFailure:false,
      screenshotOnSpecFailure:true,
      clearFoldersBeforeTest: true
    }],


  onPrepare: function() {

    browser.ignoreSynchronization=true;
    browser.driver.manage().window().maximize();
    
    //jasmine allure reporter
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));


    
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });


    //For Protractor-beautiful-reporter
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'tmp/screenshots'
   }).getJasmine2Reporter());
    var reporter = new HtmlReporter({
      baseDirectory: 'tmp/screenshots',
      
   });


   //
   jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: './',
    filePrefix: 'xmlresults'
}));
  },

  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
       browserName = caps.get('browserName');
       browserVersion = caps.get('version');
       platform = caps.get('platform');

       var HTMLReport = require('protractor-html-reporter-2');

       testConfig = {
           reportTitle: 'Protractor Test Execution Report',
           outputPath: './',
           outputFilename: 'ProtractorTestReport',
           screenshotPath: './screenshots',
           testBrowser: browserName,
           browserVersion: browserVersion,
           modifiedSuiteName: false,
           screenshotsOnlyOnFailure: true,
           testPlatform: platform
       };
       new HTMLReport().from('xmlresults.xml', testConfig);
   });
}


  };