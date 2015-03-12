
/*
 * @author Łukasz Pawełczak
 */


function assertValue (value, objectOne, objectTwo) {
	
	assert = assertValue._assertMethod;

	if(!assertValue._expected) {
		assertValue._expected = {};	
	} 

	if(!assertValue._actual) {
		assertValue._actual = {};	
	} 

	var length = arguments.length;

	switch(length) {
		case 1:
			assert.ok(assertValue._expected[value] === assertValue._actual.get(value) , "Passed - " + value );
		break;

		case 2:
			assert.ok(assertValue._expected[objectOne][value] === assertValue._actual.get(objectOne)[value] , "Passed - " + objectOne + " " + value );
		break;

		case 3:
			assert.ok(assertValue._expected[objectTwo][objectOne][value] === assertValue._actual.get(objectTwo)[objectOne][value] , "Passed - " + objectTwo + " " + objectOne + " " + value );	
		break;

		default:
		break;
	}
}


QUnit.test( "Configuration Default values", function( assert ) {

	//given
	var options = {};
	var expectedOptions = {

			autocompleteOff: true,

			url: "list-required",

			getValue: function(element) {
				return element;
			},

			placeholder: false,

			list: {
				sort: {
					enabled: false,
					method: function(a, b) {
						
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				},

				maxNumberOfElements: 6,

				matching: {
					enabled: false,
					method: function(a, b) {
						if (a === b){
							return true	
						}  
						return false;
					}
				},

			},

			highlightPhrase: true,
	};


 
	//execute
	var actualOptions = new EasyAutocomplete(null, options).getConfiguration();


	//assert
	assertValue._assertMethod = assert;
	assertValue._expected = expectedOptions;
	assertValue._actual = actualOptions;

	assertValue("autocompleteOff");
	assertValue("url");
	assertValue("placeholder");
	assertValue("highlightPhrase");
	//assertValue("getValue");
	
	assertValue("maxNumberOfElements", "list");

	assertValue("enabled", "sort", "list");
	//assertValue("method", "sort", "list");

	assertValue("enabled", "matching", "list");
	//assertValue("method", "matching", "list");

	expect(7);
});

QUnit.test( "Configuration simple", function( assert ) {

	//given

	var options = {

			autocompleteOff: false,

			url: "test url",

			getValue: function(element) {
				return element;
			},

			placeholder: true,

			list: {
				sort: {
					enabled: true,
					method: function(a, b) {
						return 7;
					}
				},

				maxNumberOfElements: 3,

				matching: {
					enabled: false,
					method: function(a, b) {
						
						return 1;
					}
				},

			},
			highlightPhrase: false,

	};


	//execute
	var actualOptions = new EasyAutocomplete(null, options).getConfiguration();

	//assert
	assertValue._assertMethod = assert;
	assertValue._expected = options;
	assertValue._actual = actualOptions;

	assertValue("autocompleteOff");
	assertValue("url");
	assertValue("placeholder");
	assertValue("highlightPhrase");
	assertValue("getValue");
	
	assertValue("maxNumberOfElements", "list");

	assertValue("enabled", "sort", "list");
	assertValue("method", "sort", "list");

	assertValue("enabled", "matching", "list");
	assertValue("method", "matching", "list");

	expect(10);
});

QUnit.test( "Configuration mixed", function( assert ) {

	//given
	var defaultOptions = {

			autocompleteOff: true,

			url: "required",

			getValue: function(element) {
				return element;
			},

			placeholder: false,

			list: {
				sort: {
					enabled: true,
					method: function(a, b) {
						//Alphabeticall sort
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				},

				maxNumberOfElements: 6,

				//TODO can be used different matching e.g. when 3 out of 4 in word letters are matched
				matching: {
					enabled: false,
					method: function(a, b) {
						if (a === b){
							return true	
						}  
						return false;
					}
				},

			},

			highlightPhrase: true,
	};

	var options = {
			url: "abc.com",

			getValue: function(element) {
				return element.name;
			},


			list: {
				sort: {
					enabled: false
				},

				matching: {
					method: function(a, b) {
						
						return 1;
					}
				},

			},

	};


	//execute
	var actualOptions = new EasyAutocomplete(null, options).getConfiguration();

	//assert
	assertValue._assertMethod = assert;
	assertValue._expected = options;
	assertValue._actual = actualOptions;

	assertValue("url");
	assertValue("getValue");

	assertValue("enabled", "sort", "list");
	assertValue("method", "matching", "list");

	assertValue._expected = defaultOptions;

	assertValue("autocompleteOff");
	assertValue("placeholder");
	assertValue("highlightPhrase");
	assertValue("maxNumberOfElements", "list");
	//assertDefaultValue("method", "sort", "list");
	assertValue("enabled", "matching", "list");

	expect(9);
});

QUnit.test( "Configuration required fields", function( assert ) {

	//given
	var options = {};

	//execute
	var actualOptions = new EasyAutocomplete(null, options).getConfiguration();

	//assert
	assert.ok("list-required" == actualOptions.get("url") , "Passed - url equals list-required" );
	assert.ok("list-required" == actualOptions.get("data") , "Passed - data equals list-required" );

	expect(2);
});

QUnit.test( "Data field", function( assert ) {

	//given
	var options = {
		data: ["red", "gree", "pink"]
	};

	//execute
	var actualOptions = new EasyAutocomplete(null, options).getConfiguration();

	//assert
	assertValue._assertMethod = assert;
	assertValue._expected = options;
	assertValue._actual = actualOptions;

	assertValue("data");

	expect(1);
});

