/*
 * Tests EasyAutocomplete - response_remote
 *
 * @author Łukasz Pawełczak
 */
QUnit.test('Remote service - Json countries', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {

		url: function (phrase) {
			return 'remote/countrySelectService.php?phrase=' + phrase + '&dataType=json';
		},

		getValue: function (element) {
			return element.name;
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
	$('#inputOne').val('po').trigger(e);


	var done = assert.async();

	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(4, elements.length, 'Response size');
		assert.equal('FRENCH POLYNESIA', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('POLAND', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('PORTUGAL', elements.eq(2).find('div').text(), 'Third element value');
		assert.equal('SINGAPORE', elements.eq(3).find('div').text(), 'Fourth element value');

		done();
	}
});

QUnit.test('Remote service - Json countries - no match', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {

		url: function (phrase) {
			return 'remote/countrySelectService.php?phrase=' + phrase + '&dataType=json';
		},

		getValue: function (element) {
			return element.name;
		},

		ajaxCallback: function () {

			// then

			assertList();
		},
		list: {
			match: {
				enabled: true
			}
		}

	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('poli').trigger(e);


	var done = assert.async();

	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(0, elements.length, 'Response size');

		done();
	}
});

QUnit.test('Remote service - XML countries', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {

		url: function (phrase) {
			return 'remote/countrySelectService.php?phrase=' + phrase + '&dataType=xml';
		},

		dataType: 'xml',
		xmlElementName: 'country',

		getValue: function (element) {
			return $(element).text();
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
	$('#inputOne').val('po').trigger(e);


	var done = assert.async();

	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(4, elements.length, 'Response size');
		assert.equal('FRENCH POLYNESIA', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('POLAND', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('PORTUGAL', elements.eq(2).find('div').text(), 'Third element value');
		assert.equal('SINGAPORE', elements.eq(3).find('div').text(), 'Fourth element value');

		done();
	}
});

QUnit.test('Remote service - Json countries - post data', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {

		url: function (phrase) {
			return 'remote/countrySelectService.php';
		},

		getValue: function (element) {
			return element.name;
		},

		ajaxCallback: function () {

			// then

			assertList();
		},

		ajaxSettings: {
			dataType: 'json',
			method: 'POST',
			data: {
				country: 'NL',
				postCode: 'test',
				dataType: 'json'
			}
		},

		preparePostData: function (data, inputPhrase) {

			data.phrase = $('#inputTwo').val() + inputPhrase;

			return data;
		}

	});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputTwo').val('p').trigger('change');
	$('#inputOne').val('o').trigger(e);


	var done = assert.async();

	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(4, elements.length, 'Response size');
		assert.equal('FRENCH POLYNESIA', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('POLAND', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('PORTUGAL', elements.eq(2).find('div').text(), 'Third element value');
		assert.equal('SINGAPORE', elements.eq(3).find('div').text(), 'Fourth element value');

		done();
	}
});


