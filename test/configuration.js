

QUnit.test( "Configuration Default values", function( assert ) {

	//given
	var options = {};
	var expectedOptions = {

			message: "default message",
			autocompleteOff: true,

			url: "required",

			getValue: function(element) {
				return element;
			},

			placeholder: false,

			list: {
				sort: {
					enabled: false,
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


 
	//execute
	var actualOptions = new Compliter(null, options).getConfiguration();


	//assert
	
	assertValue("message");
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
	
	
	function assertValue (value, objectOne, objectTwo) {
		var length = arguments.length;

		switch(length) {
			case 1:
				assert.ok(expectedOptions[value] === actualOptions[value] , "Passed - " + value );
			break;

			case 2:
				assert.ok(expectedOptions[objectOne][value] === actualOptions[objectOne][value] , "Passed - " + objectOne + " " + value );
			break;

			case 3:
				assert.ok(expectedOptions[objectTwo][objectOne][value] === actualOptions[objectTwo][objectOne][value] , "Passed - " + objectTwo + " " + objectOne + " " + value );
			break;

			default:
			break;
		}
	}

});

QUnit.test( "Configuration simple", function( assert ) {

	//given

	var options = {

			message: "test message",
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
	var actualOptions = new Compliter(null, options).getConfiguration();

	//assert

	assertValue("message");
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


	function assertValue (value, objectOne, objectTwo) {
		var length = arguments.length;

		switch(length) {
			case 1:
				assert.ok(options[value] === actualOptions[value] , "Passed - " + value );
			break;

			case 2:
				assert.ok(options[objectOne][value] === actualOptions[objectOne][value] , "Passed - " + objectOne + " " + value );
			break;

			case 3:
				assert.ok(options[objectTwo][objectOne][value] === actualOptions[objectTwo][objectOne][value] , "Passed - " + objectTwo + " " + objectOne + " " + value );
			break;

			default:
			break;
		}
	}
});

QUnit.test( "Configuration mixed", function( assert ) {

	//given
	var defaultOptions = {

			message: "default message",
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
	var actualOptions = new Compliter(null, options).getConfiguration();

	//assert

	assertOptionsValue("url");
	assertOptionsValue("getValue");

	assertOptionsValue("enabled", "sort", "list");
	assertOptionsValue("method", "matching", "list");


	assertDefaultValue("message");
	assertDefaultValue("autocompleteOff");
	assertDefaultValue("placeholder");
	assertDefaultValue("highlightPhrase");
	assertDefaultValue("maxNumberOfElements", "list");
	//assertDefaultValue("method", "sort", "list");
	assertDefaultValue("enabled", "matching", "list");


	function assertOptionsValue (value, objectOne, objectTwo) {
		var length = arguments.length;

		switch(length) {
			case 1:
				assert.ok(options[value] === actualOptions[value] , "Passed - " + value );
			break;

			case 2:
				assert.ok(options[objectOne][value] === actualOptions[objectOne][value] , "Passed - " + objectOne + " " + value );
			break;

			case 3:
				assert.ok(options[objectTwo][objectOne][value] === actualOptions[objectTwo][objectOne][value] , "Passed - " + objectTwo + " " + objectOne + " " + value );
			break;

			default:
			break;
		}
	}

	function assertDefaultValue (value, objectOne, objectTwo) {
		var length = arguments.length;

		switch(length) {
			case 1:
				assert.ok(defaultOptions[value] === actualOptions[value] , "Passed - " + value );
			break;

			case 2:
				assert.ok(defaultOptions[objectOne][value] === actualOptions[objectOne][value] , "Passed - " + objectOne + " " + value );
			break;

			case 3:
				assert.ok(defaultOptions[objectTwo][objectOne][value] === actualOptions[objectTwo][objectOne][value] , "Passed - " + objectTwo + " " + objectOne + " " + value );
			break;

			default:
			break;
		}
	}
});

QUnit.test( "Configuration required fields", function( assert ) {

	//given
	var options = {};

	//execute
	var actualOptions = new Compliter(null, options).getConfiguration();

	//assert
	assert.ok("required" == actualOptions.url , "Passed - url equals required" );
});
