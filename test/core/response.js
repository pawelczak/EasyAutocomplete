/*
 * Tests EasyAutocomplete - response 
 *
 * @author Łukasz Pawełczak
 */
QUnit.test('Ajax settings - no url', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: '',
			ajaxSettings: {
				url: 'resources/colors_string.json'
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

		assert.equal(3, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('yellow', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('brown', elements.eq(2).find('div').text(), 'Third element value');

		done();
	}
});

QUnit.test('Ajax settings - two urls', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: 'resources/countries.json',
			ajaxSettings: {
				url: 'resources/colors_string.json'
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

		assert.equal(3, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('yellow', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('brown', elements.eq(2).find('div').text(), 'Third element value');

		done();
	}
});


QUnit.test('Ajax settings - settings url is function', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: 'resources/countries.json',
			ajaxSettings: {
				url: function (phrase) {
					return 'resources/colors_string.json';
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
	$('#inputOne').val('c').trigger(e);


	var done = assert.async();


	$('#inputOne').val('c').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('yellow', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('brown', elements.eq(2).find('div').text(), 'Third element value');

		done();
	}
});


QUnit.test('Do not match response', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: 'resources/response.json',

			listLocation: 'items',

			matchResponseProperty: 'inputPhrase',

			ajaxCallback: function () {

				// then
				assertList();
			}
		});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('r').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(0, elements.length, 'Response size');

		done();
	}
});

QUnit.test('Match response', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: 'resources/response.json',

			listLocation: 'items',

			matchResponseProperty: 'inputPhrase',

			ajaxCallback: function () {

				// then
				assertList();
			}
		});


	// when

	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('rr').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('yellow', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('brown', elements.eq(2).find('div').text(), 'Third element value');

		done();
	}
});

QUnit.test('Match response - property function', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: 'resources/response.json',

			listLocation: 'items',

			matchResponseProperty: function (data) {
				return data.inputPhrase;
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
	$('#inputOne').val('rr').trigger(e);


	var done = assert.async();


	// then

	function assertList() {
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');
		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');
		assert.equal('yellow', elements.eq(1).find('div').text(), 'Second element value');
		assert.equal('brown', elements.eq(2).find('div').text(), 'Third element value');

		done();
	}
});

QUnit.test('Input field should have value changed when user clicks on one element from suggestions list', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: 'resources/colors.json',

			getValue: 'name',

			ajaxCallback: function () {

				var elements = $input.next().find('ul li');
				//selects first element
				elements.eq(0).find('div').click();

				// then
				assert.equal('blue', $input.val());

				done();
			}
		});


	// when
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	var $input = $('#inputOne').val('rr').trigger(e);


	var done = assert.async();

});


QUnit.test('Input field should trigger change event when user clicks on one element from suggestions list', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'),
		{
			url: 'resources/colors.json',

			getValue: 'name',

			ajaxCallback: function () {

				var elements = $input.next().find('ul li');
				//selects first element
				elements.eq(0).find('div').click();


				// then
				assert.equal(true, flag);

				done();
			}
		}),
		flag = false,
		$input = $('#inputOne');


	$input.change(function () {
		flag = true;
	});


	// when
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('rr').trigger(e);


	var done = assert.async();

});


