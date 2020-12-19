var logger = require('./log');

describe("Validating the Calculator app",function(){

   var title;

    beforeEach(function(){

        browser.get("http://www.way2automation.com/angularjs-protractor/calc/");
        logger.log('info','Navigating to the Website');
        title = browser.getTitle();
    });


    it("Validate exact title",function(){

        title.then(function(text){

            console.log(text);
            expect(title).toEqual("Protractor practice website - Calculator");
            logger.log('info','validating the exact title');
        });



        });


    it("Validate title should not match",function(){

        title.then(function(text){

            console.log(text);
            expect(title).not.toEqual("1Protractor practice website - Calculator");
            logger.log('info','Validate title should not match');
        });



    });


    it("Validate partial title match",function(){

        title.then(function(text){

            console.log(text);
            expect(title).toMatch("practice");

        });



    });





});
