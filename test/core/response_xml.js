/*
 * Tests EasyAutocomplete - response xml
 *
 * @author Łukasz Pawełczak
 */
QUnit.test('XML - Simple response', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {

		url: 'resources/colors.xml',


		dataType: 'xml',
		xmlElementName: 'color',

		ajaxCallback: function () {

			// then

			assertList();
		}

	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(4, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('green', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('blue', elements.eq(2).find('div').text(), 'Third element value');
		assert.equal('pink', elements.eq(3).find('div').text(), 'Fourth element value');

		done();
	}
});

QUnit.test('XML - Sorted list', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: 'resources/colors.xml',

			dataType: 'xml',
			xmlElementName: 'color',

			list: {sort: {enabled: true}},

			ajaxCallback: function () {

				// then

				assertList();
			}
		});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('c').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(4, elements.length, 'Response size');
		assert.equal('blue', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('green', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('pink', elements.eq(2).find('div').text(), 'Third element value');
		assert.equal('red', elements.eq(3).find('div').text(), 'Fourth element value');

		done();
	}
});


QUnit.test('XML - Max elements number list', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors.xml',

		dataType: 'xml',
		xmlElementName: 'color',

		list: {
			maxNumberOfElements: 1
		},

		ajaxCallback: function () {

			// then

			assertList();
		}
	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('c').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(1, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');

		done();
	}
});

QUnit.test('XML - Simple object', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors_object.xml',

		dataType: 'xml',
		xmlElementName: 'color',

		getValue: function (element) {
			return $(element).find('name').text();
		},

		ajaxCallback: function () {

			// then

			assertList();
		}
	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('a').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(4, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('green', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('blue', elements.eq(2).find('div').text(), 'Third element value');
		assert.equal('pink', elements.eq(3).find('div').text(), 'Fourth element value');

		done();
	}
});

QUnit.test('XML - match simple list - phrase \'re\'', function (assert) {


	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors.xml',

		dataType: 'xml',
		xmlElementName: 'color',

		list: {
			match: {
				enabled: true
			}
		},

		ajaxCallback: function () {

			// then

			assertList();
		}
	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('re').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(2, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'Red element value');
		assert.equal('green', elements.eq(1).find('div').text(), 'Green element value');

		done();
	}
});

QUnit.test('XML - match advance object phrase \'re\'', function (assert) {


	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors_object.xml',

		dataType: 'xml',
		xmlElementName: 'color',

		getValue: function (element) {
			return $(element).find('name').text();
		},

		list: {
			match: {
				enabled: true
			}
		},

		ajaxCallback: function () {

			// then

			assertList();
		}
	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('re').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(2, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'Red element value');
		assert.equal('green', elements.eq(1).find('div').text(), 'Green element value');

		done();
	}
});

QUnit.test('XML - Highlight phrase', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors.xml',

		dataType: 'xml',
		xmlElementName: 'color',

		highlightPhrase: true,

		ajaxCallback: function () {

			// then

			assertList();
		}
	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('e').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(4, elements.length, 'Response size');
		assert.equal('r<b>e</b>d', elements.eq(0).find('div').html(), 'First element value');
		assert.equal('gr<b>e</b><b>e</b>n', elements.eq(1).find('div').html(), 'Second element value');
		assert.equal('blu<b>e</b>', elements.eq(2).find('div').html(), 'Third element value');
		assert.equal('pink', elements.eq(3).find('div').html(), 'Fourth element value');

		done();
	}
});

QUnit.test('XML - Dont highlight phrase', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors.xml',

		dataType: 'xml',
		xmlElementName: 'color',

		highlightPhrase: false,

		ajaxCallback: function () {

			// then

			assertList();
		}

	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('e').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(4, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').html(), 'First element value');
		assert.equal('green', elements.eq(1).find('div').html(), 'Second element value');
		assert.equal('blue', elements.eq(2).find('div').html(), 'Third element value');
		assert.equal('pink', elements.eq(3).find('div').html(), 'Fourth element value');

		done();
	}
});


QUnit.test('XML - string listLocation - file with two fruit lists', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/categories/otherFruits.xml',

		dataType: 'xml',
		xmlElementName: 'fruit',

		highlightPhrase: false,

		listLocation: 'otherFruits',

		getValue: function (element) {
			return $(element).text().trim();
		},

		ajaxCallback: function () {

			// then

			assertList();
		}

	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('e').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(5, elements.length, 'Response size');
		assert.equal('Orange', elements.eq(0).find('div').html(), 'First element value');
		assert.equal('Strawberry', elements.eq(1).find('div').html(), 'Second element value');
		assert.equal('Melon', elements.eq(2).find('div').html(), 'Third element value');
		assert.equal('Lemon', elements.eq(3).find('div').html(), 'Fourth element value');

		done();
	}
});

QUnit.test('XML - function listLocation - file with two fruit lists', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/categories/otherFruits.xml',

		dataType: 'xml',
		xmlElementName: 'fruit',

		highlightPhrase: false,

		listLocation: function (data) {
			return $(data).find('otherFruits');
		},

		getValue: function (element) {
			return $(element).text().trim();
		},

		ajaxCallback: function () {

			// then

			assertList();
		}

	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('e').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(5, elements.length, 'Response size');
		assert.equal('Orange', elements.eq(0).find('div').html(), 'First element value');
		assert.equal('Strawberry', elements.eq(1).find('div').html(), 'Second element value');
		assert.equal('Melon', elements.eq(2).find('div').html(), 'Third element value');
		assert.equal('Lemon', elements.eq(3).find('div').html(), 'Fourth element value');

		done();
	}
});
