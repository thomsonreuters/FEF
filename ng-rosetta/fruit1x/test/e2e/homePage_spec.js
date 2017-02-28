// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

var fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);

    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('angularjs homepage', function() {
    var today = '';
    beforeEach(function(){
        
        browser.get('/#/home');
        

        browser.executeScript(function() {
            var myDateFilter = angular.injector(["ng"]).get('dateFilter');
            var dateString = myDateFilter(new Date(), 'MMM d, yyyy');
            return dateString;
        })
            .then(function(dateStr) {
                today = dateStr;
            });
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('batmobiles1x');
    });

    it('should menu have three features.', function() {
        var menu = element.all(by.css('.menu li'));
        expect(menu.count()).toBe(4);
    });

    it('should menu Item 1 be called Feature 1 Route', function() {
        var menu = element.all(by.css('.menu li'));
        expect(menu.get(1).getText()).toBe('Feature 1 Route');
    });

    it('should menu Item 1 Click take you to Route 1 page.', function() {

        var span1 = element(by.exactBinding('seedObject.currentDate'));
        expect(span1.getText()).toBe('Date: '+ today);

    });

);