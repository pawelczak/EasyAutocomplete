/*
 * Tests EasyAutocomplete - features
 *
 * @author Łukasz Pawełczak
 */
QUnit.test('Highlight ', function (assert) {


	// given
	var completerOne = $('#inputOne').easyAutocomplete({

		data: ['black', 'white', 'magenta', 'yellow']

	});

	// when
	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('la').trigger(e);

	// then
	var elements = $('#inputOne').next().find('ul li');

	assert.equal(4, elements.length, 'Response size');
	assert.equal('b<b>la</b>ck', elements.eq(0).find('div').html(), 'First element');
	assert.equal('white', elements.eq(1).find('div').html(), 'Second element');
	assert.equal('magenta', elements.eq(2).find('div').html(), 'Third element');
	assert.equal('yellow', elements.eq(3).find('div').html(), 'Last element');

});

QUnit.test('Highlight - special char \'[\' ', function (assert) {


	// given
	var completerOne = $('#inputOne').easyAutocomplete({

		data: ['black[]', 'white{}', 'magenta?', 'yellow@']

	});

	// when
	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('[').trigger(e);

	// then
	var elements = $('#inputOne').next().find('ul li');

	assert.equal(4, elements.length, 'Response size');
	assert.equal('black<b>[</b>]', elements.eq(0).find('div').html(), 'First element');
	assert.equal('white{}', elements.eq(1).find('div').html(), 'Second element');
	assert.equal('magenta?', elements.eq(2).find('div').html(), 'Third element');
	assert.equal('yellow@', elements.eq(3).find('div').html(), 'Last element');

});

QUnit.test('Highlight - special char \'(\' ', function (assert) {


	// given
	var completerOne = $('#inputOne').easyAutocomplete({

		data: ['black()', 'white{}', 'magenta?', 'yellow@']

	});

	// when
	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('(').trigger(e);

	// then
	var elements = $('#inputOne').next().find('ul li');

	assert.equal(4, elements.length, 'Response size');
	assert.equal('black<b>(</b>)', elements.eq(0).find('div').html(), 'First element');
	assert.equal('white{}', elements.eq(1).find('div').html(), 'Second element');
	assert.equal('magenta?', elements.eq(2).find('div').html(), 'Third element');
	assert.equal('yellow@', elements.eq(3).find('div').html(), 'Last element');

});

QUnit.test('Highlight - special char \'?\' ', function (assert) {


	// given
	var completerOne = $('#inputOne').easyAutocomplete({

		data: ['black[]', 'white{}', 'magenta?', 'yellow@']

	});

	// when
	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('?').trigger(e);

	// then
	var elements = $('#inputOne').next().find('ul li');

	assert.equal(4, elements.length, 'Response size');
	assert.equal('black[]', elements.eq(0).find('div').html(), 'First element');
	assert.equal('white{}', elements.eq(1).find('div').html(), 'Second element');
	assert.equal('magenta<b>?</b>', elements.eq(2).find('div').html(), 'Third element');
	assert.equal('yellow@', elements.eq(3).find('div').html(), 'Last element');

});


QUnit.test('Highlight - special chars \'[](){}?<>,-+*&^%$#@!\' ', function (assert) {


	// given
	var completerOne = $('#inputOne').easyAutocomplete({

		data: ['black[]', 'white{}', 'magenta[](){}?<>,-+*&^%$#@!', 'yellow@']

	});

	// when
	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('[](){}?<>,-+*&^%$#@!').trigger(e);

	// then
	var elements = $('#inputOne').next().find('ul li');

	assert.equal(4, elements.length, 'Response size');
	assert.equal('black[]', elements.eq(0).find('div').html(), 'First element');
	assert.equal('white{}', elements.eq(1).find('div').html(), 'Second element');
	assert.equal('magenta<b>[](){}?&lt;&gt;,-+*&amp;^%$#@!</b>', elements.eq(2).find('div').html(), 'Third element');
	assert.equal('yellow@', elements.eq(3).find('div').html(), 'Last element');

});


// QUnit.test('requestDelay - local data ', function (assert) {


// 	// given
// 	var completerOne = $('#inputOne').easyAutocomplete({

// 		data: ['black', 'white', 'magenta', 'yellow'],

// 		requestDelay: 200

// 	});

// 	// when
// 	var e = $.Event('keyup');
// 	e.keyCode = 50;
// 	$('#inputOne').val('b').trigger(e);

// 	// then

// 	//#FIRST
// 	var elements = $('#inputOne').next().find('ul li');

// 	assert.equal(0, elements.length, 'Response size');


// 	//#SECOND
// 	$('#inputOne').val('bl').trigger(e);

// 	elements = $('#inputOne').next().find('ul li');
// 	assert.equal(0, elements.length, 'Response size');

// 	//#THIRD
// 	$('#inputOne').val('bla').trigger(e);

// 	setTimeout(function () {

// 		elements = $('#inputOne').next().find('ul li');
// 		assert.equal(4, elements.length, 'Response size');
// 		assert.equal('<b>bla</b>ck', elements.eq(0).find('div').html(), 'Third request - First element');

// 		done();

// 		//#FOURTH
// 		$('#inputOne').val('bl').trigger(e);

// 		elements = $('#inputOne').next().find('ul li');
// 		assert.equal(4, elements.length, 'Response size');
// 		assert.equal('<b>bla</b>ck', elements.eq(0).find('div').html(), 'Fourth request - First element');


// 		//#FIFTH
// 		$('#inputOne').val('b').trigger(e);

// 		setTimeout(function () {

// 			elements = $('#inputOne').next().find('ul li');
// 			assert.equal(4, elements.length, 'Response size');
// 			assert.equal('<b>b</b>lack', elements.eq(0).find('div').html(), 'Fifth request - First element');

// 			done();

// 		}, 500);

// 		var done = assert.async();

// 	}, 500);

// 	var done = assert.async();


// });


// QUnit.test('requestDelay - remote data ', function (assert) {


// 	// given
// 	var completerOne = $('#inputOne').easyAutocomplete({

// 		url: 'resources/colors_string.json',

// 		requestDelay: 200

// 	});

// 	// when
// 	var e = $.Event('keyup');
// 	e.keyCode = 50;
// 	$('#inputOne').val('r').trigger(e);

// 	// then

// 	//#FIRST
// 	var elements = $('#inputOne').next().find('ul li');

// 	assert.equal(0, elements.length, 'Response size');


// 	//#SECOND
// 	$('#inputOne').val('re').trigger(e);

// 	elements = $('#inputOne').next().find('ul li');
// 	assert.equal(0, elements.length, 'Response size');

// 	//#THIRD
// 	$('#inputOne').val('red').trigger(e);

// 	setTimeout(function () {

// 		elements = $('#inputOne').next().find('ul li');
// 		assert.equal(3, elements.length, 'Response size');
// 		assert.equal('<b>red</b>', elements.eq(0).find('div').html(), 'Third request - First element');

// 		done();

// 		//#FOURTH
// 		$('#inputOne').val('re').trigger(e);

// 		elements = $('#inputOne').next().find('ul li');
// 		assert.equal(3, elements.length, 'Response size');
// 		assert.equal('<b>red</b>', elements.eq(0).find('div').html(), 'Fourth request - First element');


// 		//#FIFTH
// 		$('#inputOne').val('r').trigger(e);

// 		setTimeout(function () {

// 			elements = $('#inputOne').next().find('ul li');
// 			assert.equal(3, elements.length, 'Response size');
// 			assert.equal('<b>r</b>ed', elements.eq(0).find('div').html(), 'Fifth request - First element');

// 			done();

// 		}, 500);

// 		var done = assert.async();

// 	}, 500);

// 	var done = assert.async();


// });


// QUnit.test('Set default value', function (assert) {


// 	// given
// 	var completerOne = $('#inputThree').easyAutocomplete({

// 		data: ['simple data']

// 	});

// 	// when

// 	// then
// 	assert.equal('default value', $('#inputThree').val());

// });

// QUnit.test('Sort - Reverse sorted list', function (assert) {
// 	// given
// 	$('#inputOne').easyAutocomplete({

// 		url: 'resources/colors_string.json',

// 		list: {
// 			sort: {
// 				enabled: true,
// 				method: function (a, b) {
// 					//Reverse alphabeticall sort
// 					if (a < b) {
// 						return 1;
// 					}
// 					if (a > b) {
// 						return -1;
// 					}
// 					return 0;
// 				}
// 			}
// 		},

// 		ajaxCallback: function () {

// 			// then

// 			assertList();
// 		}
// 	});


// 	// when
// 	var e = $.Event('keyup');
// 	e.keyCode = 50;
// 	$('#inputOne').val('c').trigger(e);


// 	var done = assert.async();


// 	// then

// 	function assertList() {
// 		var elements = $('#inputOne').next().find('ul li');

// 		assert.equal(3, elements.length, 'Response size');
// 		assert.equal('yellow', elements.eq(0).find('div').text(), 'First element value');
// 		assert.equal('red', elements.eq(1).find('div').text(), 'Second element value');
// 		assert.equal('brown', elements.eq(2).find('div').text(), 'Third element value');

// 		done();
// 	}
// });


// QUnit.test('Match - suggestions match start of phrase', function (assert) {
// 	// given
// 	$('#inputOne').easyAutocomplete({

// 		url: 'resources/colors_string.json',

// 		list: {
// 			match: {
// 				enabled: true,
// 				method: function (element, phrase) {
// 					if (element.indexOf(phrase) === 0) {
// 						return true;
// 					} else {
// 						return false;
// 					}
// 				}
// 			}
// 		},

// 		ajaxCallback: function () {

// 			// then

// 			assertList();
// 		}
// 	});


// 	// when
// 	var e = $.Event('keyup');
// 	e.keyCode = 50;
// 	$('#inputOne').val('r').trigger(e);


// 	var done = assert.async();


// 	// then

// 	function assertList() {
// 		var elements = $('#inputOne').next().find('ul li');

// 		assert.equal(1, elements.length, 'Response size');
// 		assert.equal('red', elements.eq(0).find('div').text(), 'First element value');

// 		done();
// 	}
// });


QUnit.test('Match - suggestions partial words match of phrase', function (assert) {
	// given
	$('#inputOne').easyAutocomplete({

		data:['British Indian Ocean Territory' , 'Bosnia and Herzegovina'],

		list: {
			match: {
				enabled: true,
				method(element, phrase) {
					const matches = phrase
						.split(' ')
						.filter(w => element.search(w) > -1);
					return matches.length > 0;
				}
			}
		},

	});


	// when
	var e = $.Event('keyup');
	e.keyCode = 50;
	$('#inputOne').val('British Ocean').trigger(e);

	// then
	var elements = $('#inputOne').next().find('ul li');

	assert.equal(1, elements.length, 'Response size');
	assert.equal('British Indian Ocean Territory',
		elements.eq(0).find('div').text(),
		'First element value'
		);
});
