/*
 * Tests for Configuration module - EasyAutocomplete 
 *
 * @author Łukasz Pawełczak
 */
function assertValue(value, objectOne, objectTwo) {

	assert = assertValue._assertMethod;

	if (!assertValue._expected) {
		assertValue._expected = {};
	}

	if (!assertValue._actual) {
		assertValue._actual = {};
	}

	var length = arguments.length;

	switch (length) {
		case 1:
			if (typeof assertValue._actual.get(value) === 'function') {

				var expected = assertValue._expected[value].toString().replace(/\t/g, '').replace(/\n/g, '').replace(/\s{2}/g, ' '),
					actual = assertValue._actual.get(value).toString().replace(/\t/g, '').replace(/\n/g, '').replace(/\s{2}/g, ' ');

				assert.ok(expected === actual, 'Passed - ' + value);
			} else {
				assert.ok(assertValue._expected[value] === assertValue._actual.get(value), 'Passed - ' + value);
			}

			break;

		case 2:
			assert.ok(assertValue._expected[objectOne][value] === assertValue._actual.get(objectOne)[value], 'Passed - ' + objectOne + ' ' + value);
			break;

		case 3:
			assert.ok(assertValue._expected[objectTwo][objectOne][value] === assertValue._actual.get(objectTwo)[objectOne][value],
				'Passed - ' + objectTwo + ' ' + objectOne + ' ' + value);
			break;

		default:
			break;
	}
}


QUnit.test('Configuration Default values', function (assert) {

	// given
	var options = {};
	var expectedOptions = {
		data: 'list-required',
		url: 'list-required',
		dataType: 'json',

		listLocation: function (data) {
			return data;
		},

		xmlElementName: '',

		getValue: function (element) {
			return element;
		},

		autocompleteOff: true,

		placeholder: false,

		ajaxCallback: function () {
		},

		onClickEvent: function () {
		},
		onLoadEvent: function () {
		},
		onInitEvent: function () {
		},
		onMouseOverEvent: function () {
		},
		onMouseOutEvent: function () {
		},

		list: {
			sort: {
				enabled: false,
				method: function (a, b) {
					a = defaults.getValue(a);
					b = defaults.getValue(b);

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

			match: {
				enabled: false,
				caseSensitive: false,
				method: function (a, b) {
					a = defaults.getValue(a);
					b = defaults.getValue(b);

					if (a === b) {
						return true;
					}
					return false;
				}
			},

			showAnimation: {
				type: 'normal', //normal|slide|fade
				time: 400,
				callback: function () {
				}
			},

			hideAnimation: {
				type: 'normal',
				time: 400,
				callback: function () {
				}
			}

		},

		highlightPhrase: true,

		theme: '',

		cssClasses: '',

		minCharNumber: 0
	};


	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);


	// then
	assertValue._assertMethod = assert;
	assertValue._expected = expectedOptions;
	assertValue._actual = actualOptions;

	assertValue('autocompleteOff');
	assertValue('url');
	assertValue('data');
	assertValue('dataType');
	assertValue('placeholder');
	assertValue('listLocation');
	assertValue('xmlElementName');

	assertValue('highlightPhrase');
	assertValue('theme');
	assertValue('cssClasses');
	assertValue('minCharNumber');


	// thenValue("getValue");

	assertValue('maxNumberOfElements', 'list');

	assertValue('enabled', 'sort', 'list');
	// thenValue("method", "sort", "list");

	assertValue('enabled', 'match', 'list');
	// thenValue("method", "match", "list");

	assertValue('type', 'showAnimation', 'list');
	assertValue('time', 'showAnimation', 'list');

	assertValue('type', 'hideAnimation', 'list');
	assertValue('time', 'hideAnimation', 'list');
});

QUnit.test('Configuration simple', function (assert) {

	// given

	var options = {

		autocompleteOff: false,

		url: function (phrase) {
			return 'test url';
		},

		getValue: function (element) {
			return element;
		},

		placeholder: true,

		list: {
			sort: {
				enabled: true,
				method: function (a, b) {
					return 7;
				}
			},

			maxNumberOfElements: 3,

			match: {
				enabled: false,
				method: function (a, b) {

					return 1;
				}
			}

		},
		highlightPhrase: false

	};


	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);

	// then
	assertValue._assertMethod = assert;
	assertValue._expected = options;
	assertValue._actual = actualOptions;

	assertValue('autocompleteOff');
	assertValue('url');
	assertValue('placeholder');
	assertValue('highlightPhrase');
	assertValue('getValue');

	assertValue('maxNumberOfElements', 'list');

	assertValue('enabled', 'sort', 'list');
	assertValue('method', 'sort', 'list');

	assertValue('enabled', 'match', 'list');
	assertValue('method', 'match', 'list');
});

QUnit.test('Configuration mixed', function (assert) {

	// given
	var defaultOptions = {

		autocompleteOff: true,

		url: 'abc.com',

		getValue: function (element) {
			return element;
		},

		placeholder: false,

		list: {
			sort: {
				enabled: true,
				method: function (a, b) {
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

			//TODO can be used different match e.g. when 3 out of 4 in word letters are matched
			match: {
				enabled: false,
				method: function (a, b) {
					if (a === b) {
						return true
					}
					return false;
				}
			}

		},

		highlightPhrase: true,

		theme: 'blue',

		cssClasses: 'red'
	};

	var options = {
		url: function (phrase) {
			return 'abc.com';
		},

		getValue: function (element) {
			return element.name;
		},


		list: {
			sort: {
				enabled: false
			},

			match: {
				method: function (a, b) {

					return 1;
				}
			}

		},

		theme: 'blue',

		cssClasses: 'red'
	};


	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);

	// then
	assertValue._assertMethod = assert;
	assertValue._expected = options;
	assertValue._actual = actualOptions;

	assertValue('url');
	assertValue('getValue');
	assertValue('theme');
	assertValue('cssClasses');

	assertValue('enabled', 'sort', 'list');
	assertValue('method', 'match', 'list');

	assertValue._expected = defaultOptions;

	assertValue('autocompleteOff');
	assertValue('placeholder');
	assertValue('highlightPhrase');
	assertValue('maxNumberOfElements', 'list');
	// thenDefaultValue("method", "sort", "list");
	assertValue('enabled', 'match', 'list');


});

QUnit.test('Parameter not in configuration', function (assert) {

	// given
	var options = {
		foo: 'bar',
		loggerEnabled: false
	};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);


	// then
	assert.equal(undefined, actualOptions.get('foo'), 'Passed - configuration parameter not defined');


});

QUnit.test('Configuration required fields', function (assert) {

	// given
	var options = {};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);

	// then
	assert.ok('list-required' == actualOptions.get('url'), 'Passed - url equals list-required');
	assert.ok('list-required' == actualOptions.get('data'), 'Passed - data equals list-required');


});

QUnit.test('Data field', function (assert) {

	// given
	var options = {
		data: ['red', 'gree', 'pink']
	};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);

	// then
	assertValue._assertMethod = assert;
	assertValue._expected = options;
	assertValue._actual = actualOptions;

	assertValue('data');


});

QUnit.test('String getValue', function (assert) {

	// given
	var options = {
			data: ['red', 'gree', 'pink'],
			getValue: 'name'
		},
		expectedGetValue = function (element) {
			return element['name'];
		},
		testObject = {name: 'foo', test: 'bar'};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);


	// then
	assert.ok(expectedGetValue(testObject) === actualOptions.get('getValue')(testObject), 'Passed - getValue');


});


QUnit.test('Ajax Settings - string', function (assert) {

	// given
	var options = {
		ajaxSettings: {
			dataType: 'xml',
			content: 'utf'
		}
	};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);


	// then
	assert.ok(options.ajaxSettings === actualOptions.get('ajaxSettings'), 'Passed - ajaxSettings');


});

QUnit.test('Ajax Settings - function', function (assert) {


	// given
	var getUrl = function (phrase) {
		return 'www' + phrase;
	};


	var options = {
		ajaxSettings: {
			dataType: 'xml',
			content: 'utf',
			url: getUrl
		}
	};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);


	// then
	assert.ok(options.ajaxSettings === actualOptions.get('ajaxSettings'), 'Passed - ajaxSettings');
	assert.ok(options.ajaxSettings.url.toString() === actualOptions.get('ajaxSettings').url.toString(), 'Passed - ajaxSettings url');


});


QUnit.test('Print wrong configuration property', function (assert) {


	// given
	var consol = {
		phrases: [],

		getPhrases: function () {
			return consol.phrases;
		},

		log: function (phrase) {
			//console.log(phrase);
			consol.phrases.push(phrase);
		}
	};


	var options = {

		foi: 'bar',
		url: 'www',

		matchResponseProperti: false,


		list: {

			listProperty: 'notFound',
			sort: {},
			maxNumberOfElements: 6
		},

		loggerEnabled: false

	};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);

	actualOptions.printPropertiesThatDoesntExist(consol, options);

	// then
	assert.ok(3 === consol.getPhrases().length, 'Passes');


});


QUnit.test('Categories assigned', function (assert) {


	// given
	var options = {
		categories: [{
			listLocation: 'test'
		}]
	};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);


	// then
	assert.ok(true === actualOptions.get('categoriesAssigned'), 'Passed - categoriesAssigned');


});

QUnit.test('Categories parameters', function (assert) {


	// given
	var options = {
		categories: [{
			listLocation: 'test',
			maxNumberOfElements: 5
		}, {
			maxNumberOfElements: 6
		}, {
			listLocation: 'url'
		}]
	};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);


	// then
	assert.equal('test', actualOptions.get('categories')[0].listLocation, 'Passed - listLocation');
	assert.equal(5, actualOptions.get('categories')[0].maxNumberOfElements, 'Passed - maxNumberOfElements');

	assert.equal(6, actualOptions.get('categories')[1].maxNumberOfElements, 'Passed - maxNumberOfElements');

	assert.equal('url', actualOptions.get('categories')[2].listLocation, 'Passed - listLocation');
	assert.equal(4, actualOptions.get('categories')[2].maxNumberOfElements, 'Passed - maxNumberOfElements - default');
});


QUnit.test('Categories not assigned', function (assert) {


	// given
	var options = {
		url: 'test'
	};

	// when
	var actualOptions = new EasyAutocomplete.Configuration(options);


	// then
	assert.ok(false === actualOptions.get('categoriesAssigned'), 'Passed - categoriesAssigned');
});


