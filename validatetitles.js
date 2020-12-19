describe('Verify titles of Different webpages',function(){


    it('Verify title of Google.com',function(){

        browser.get('http://google.com');
        expect(browser.getTitle()).toBe('Google');

    });


    it('Verify title of Gmail.com',function(){

        browser.get('http://gmail.com');
        expect(browser.getTitle()).toBe('Gmail');

    });


});