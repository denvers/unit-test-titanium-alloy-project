//Setup module to run Behave tests
require('behave').andSetup(this);

describe('Index screen', function() {

	var index = null;
	it('creates a index controller', function() {
		index = Alloy.createController('index');
		expect(index).notToBe(null);
	});

	it('creates a scrollableview for you and me and the rest of the world', function() {		
		expect(index.getView("scrollableViewID")).notToBe(undefined);
	});

	// go nuts! :-)

}); 