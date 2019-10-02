/*
 * Tests EasyAutocomplete - event
 *
 * @author Łukasz Pawełczak
 */

/*
QUnit.test("Event keypress - Esc keyCode", function( assert ) {
   ;

   // given
   var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json", ajaxCallback: function() {


		   var e = $.Event("keyup", { keyCode: 27 });
		   $("inputOne").trigger(e);


		   // then
		   assertList();
	   }
   });


   // when

   completerOne.init();

   var e = $.Event('keyup');
   e.keyCode = 50;
   $("#inputOne").val("c").trigger(e);

   //create event with Esc keyCode



   var done = assert.async();


   // then

   function assertList() {
	   var elements = $("#inputOne").next().find("ul li");

	   assert.equal(3, elements.length, "Response size");
	   // then.equal("none", $("#eac-container-inputOne").find("ul").css("display"), "List should be hidden");

	   done();
   }
});
*/

QUnit.test('Event onLoadEvent ', function (assert) {

	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors_string.json',


		list: {
			onLoadEvent: function () {

				// then
				assertList();
			}
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

		done();
	}
});


QUnit.test('Event onClickEvent ', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors_string.json',


		list: {
			onClickEvent: function () {

				// then
				assertList();
			},
			onLoadEvent: function () {

				//trigger click event
				$('#inputOne').next().find('ul li').eq(0).find(' > div').trigger('click');
			}
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

		done();
	}
});

QUnit.test('Event onMouseOverEvent ', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors_string.json',

		list: {
			onMouseOverEvent: function () {

				// then
				assertList();
			},
			onLoadEvent: function () {

				//trigger click event
				$('#inputOne').next().find('ul li').eq(0).find(' > div').trigger('mouseover');
			}
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

		done();
	}
});


QUnit.test('Event onMouseOutEvent ', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
		url: 'resources/colors_string.json',

		list: {
			onMouseOutEvent: function () {

				// then
				assertList();
			},
			onLoadEvent: function () {

				//trigger click event
				$('#inputOne').next().find('ul li').eq(0).find(' > div').trigger('mouseout');
			}
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

		done();
	}
});

QUnit.test('Event onSelectItemEvent ', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
			url: 'resources/colors_string.json',

			list: {
				onSelectItemEvent: function () {

					// then
					assertList();
				},
				onLoadEvent: function () {

					//trigger select event
					var key = $.Event('keyup');
					key.keyCode = 40;
					$input.trigger(key);
				}
			}

		}),
		$input = $('#inputOne');


	// when
	completerOne.init();
	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e);

	var done = assert.async();

	// then

	function assertList() {

		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');

		done();
	}
});

QUnit.test('Event onSelectItemEvent should trigger when user writes phrase that matches phrase from suggestion list and then focus out of the input field',
	function (assert) {
		// given
		var completerOne = new EasyAutocomplete.main($('#inputOne'), {
				url: 'resources/colors_string.json',

				list: {
					onSelectItemEvent: function () {

						// then
						assertList();
					},
					onLoadEvent: function () {

						$input.trigger('focusout');
					}
				}

			}),
			$input = $('#inputOne');


		// when
		completerOne.init();
		var e = $.Event('keyup');
		e.keyCode = 50;
		$input.val('red').trigger(e);


		var done = assert.async();

		// then

		function assertList() {

			var elements = $('#inputOne').next().find('ul li');

			assert.equal(3, elements.length, 'Response size');

			done();
		}
	});

QUnit.test(
	'Event onSelectItemEvent should trigger when user writes phrase that matches phrase from suggestion list and then focus out of the input field - include case sensitivity',
	function (assert) {
		// given
		var completerOne = new EasyAutocomplete.main($('#inputOne'), {
				url: 'resources/colors_string.json',

				list: {
					onSelectItemEvent: function () {

						// then
						assertList();
					},
					onLoadEvent: function () {

						$input.trigger('focusout');
					}
				}

			}),
			$input = $('#inputOne');


		// when
		completerOne.init();
		var e = $.Event('keyup');
		e.keyCode = 50;
		$input.val('ReD').trigger(e);


		var done = assert.async();

		// then

		function assertList() {

			var elements = $('#inputOne').next().find('ul li');

			assert.equal(3, elements.length, 'Response size');

			done();
		}
	});

QUnit.test(
	'Event onSelectItemEvent should trigger when user writes phrase that matches phrase from suggestion list and then focus out of the input field - include case sensitivity false',
	function (assert) {
		// given
		var completerOne = new EasyAutocomplete.main($('#inputOne'), {
				url: 'resources/colors_caps_string.json',

				list: {
					onSelectItemEvent: function () {

						// then
						assertList();
					},
					onLoadEvent: function () {

						$input.trigger('focusout');
					},
					match: {
						caseSensitive: false,
						enabled: true
					}
				}

			}),
			$input = $('#inputOne');


		// when
		completerOne.init();
		var e = $.Event('keyup');
		e.keyCode = 50;
		$input.val('red').trigger(e);


		var done = assert.async();

		// then

		function assertList() {

			var elements = $('#inputOne').next().find('ul li');

			assert.equal(1, elements.length, 'Response size');

			done();
		}
	});

QUnit.test(
	'Event onSelectItemEvent should trigger when user writes phrase that matches phrase from suggestion list and then focus out of the input field - include case sensitivity true',
	function (assert) {
		// given
		var completerOne = new EasyAutocomplete.main($('#inputOne'), {
				url: 'resources/colors_caps_string.json',

				list: {
					onSelectItemEvent: function () {

					},
					onLoadEvent: function () {

						$input.trigger('focusout');

						done();
					},
					match: {
						caseSensitive: true,
						enabled: true
					}
				}

			}),
			$input = $('#inputOne');


		// when
		completerOne.init();
		var e = $.Event('keyup');
		e.keyCode = 50;
		$input.val('red').trigger(e);


		var done = assert.async();

		// then
		var elements = $('#inputOne').next().find('ul li');

		assert.equal(0, elements.length, 'Response size');

	});

QUnit.test('Event onShowListEvent ', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
			url: 'resources/colors_string.json',

			list: {
				onShowListEvent: function () {

					// then
					assertList();
				}
			}

		}),
		$input = $('#inputOne');


	// when
	completerOne.init();
	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e); //trigger show list

	var done = assert.async();

	// then

	function assertList() {

		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');

		done();
	}
});

QUnit.test('Event onHideListEvent ', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
			url: 'resources/colors_string.json',

			list: {
				onHideListEvent: function () {

					// then
					assertList();
				},
				onLoadEvent: function () {

					//trigger hide list
					var key = $.Event('keyup');
					key.keyCode = 27;
					$input.trigger(key);
				}
			}

		}),
		$input = $('#inputOne');


	// when
	completerOne.init();
	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e);

	var done = assert.async();

	// then

	function assertList() {

		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');

		done();
	}
});

QUnit.test('Event onKeyEnterEvent ', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
			url: 'resources/colors_string.json',

			list: {
				onKeyEnterEvent: function () {

					// then
					assertList();
				},
				onLoadEvent: function () {


					//trigger select event
					var key = $.Event('keyup');
					key.keyCode = 40;
					$input.trigger(key);


					//trigger key enter
					var key = $.Event('keydown');
					key.keyCode = 13;
					$input.trigger(key);
				}
			}

		}),
		$input = $('#inputOne');


	// when
	completerOne.init();
	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e);

	var done = assert.async();

	// then

	function assertList() {

		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');

		done();
	}
});


QUnit.test('Event onClickEvent and selectedItemData - click', function (assert) {
	// given
	var $input = $('#inputOne');

	$input.easyAutocomplete({

		url: 'resources/colors_string.json',

		list: {
			onClickEvent: function () {

				// then
				assertList();
			},
			onLoadEvent: function () {


				//trigger click event
				$('#inputOne').next().find('ul li').eq(0).find(' > div').trigger('click');
			}
		}

	});


	// when

	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e);

	var done = assert.async();

	// then

	function assertList() {

		var elements = $input.next().find('ul li'),
			data = $input.getSelectedItemData();

		assert.equal(3, elements.length, 'Response size');
		assert.equal('red', data, 'selectedItemData matches');

		done();
	}
});

QUnit.test('Event onKeyEnterEvent and selectedItemData - keydown enter', function (assert) {
	// given
	var $input = $('#inputOne');

	$input.easyAutocomplete({

		url: 'resources/colors_string.json',

		list: {
			onKeyEnterEvent: function () {

				// then
				assertList();
			},
			onLoadEvent: function () {

				//trigger select event
				var key = $.Event('keyup');
				key.keyCode = 40;
				$input.trigger(key);


				//trigger key enter
				var key = $.Event('keydown');
				key.keyCode = 13;
				$input.trigger(key);
			}
		}

	});


	// when

	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e);

	var done = assert.async();

	// then

	function assertList() {

		var elements = $input.next().find('ul li'),
			data = $input.getSelectedItemData();

		assert.equal(3, elements.length, 'Response size');
		assert.equal('red', data, 'selectedItemData matches');


		done();
	}
});


QUnit.test('Plugin should not emit event \'show\' ', function (assert) {
	// given
	var $input = $('#inputOne'),
		eventReceived = false;


	$('body')
		.on('show', function () {
			eventReceived = true;
		})
		.on('show.eac', function () {

			// then
			assertList();

			done();

			afterTests();
		});


	$input.easyAutocomplete({
		url: 'resources/colors_string.json'
	});


	// when

	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e); //trigger show list

	var done = assert.async();

	// then

	function assertList() {

		assert.ok(eventReceived === false, 'Event received');
	}

	function afterTests() {

		$('body').off('show').off('show.eac');
	}

});

QUnit.test('Plugin should not emit event \'hide\' ', function (assert) {
	// given
	var $input = $('#inputOne'),
		eventReceived = false;


	$('body')
		.on('hide', function () {
			eventReceived = true;
		})
		.on('hide.eac', function () {

			// then
			assertList();

			done();

			afterTests();
		});


	$input.easyAutocomplete({
		url: 'resources/colors_string.json',

		list: {
			onLoadEvent: function () {

				//trigger hide list
				var key = $.Event('keyup');
				key.keyCode = 27;
				$input.trigger(key);
			}
		}
	});


	// when

	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e); //trigger show list

	var done = assert.async();

	// then

	function assertList() {

		assert.ok(eventReceived === false, 'Event received');
	}

	function afterTests() {

		$('body').off('hide').off('hide.eac');
	}

});


QUnit.test('Plugin should not emit event \'selectElement\' ', function (assert) {
	// given
	var $input = $('#inputOne'),
		eventReceived = false;


	$('body')
		.on('selectElement', function () {
			eventReceived = true;
		})
		.on('selectElement.eac', function () {

			// then
			assertList();

			done();

			afterTests();
		});


	$input.easyAutocomplete({
		url: 'resources/colors_string.json',

		list: {
			onLoadEvent: function () {

				//trigger select event
				var key = $.Event('keyup');
				key.keyCode = 40;
				$input.trigger(key);
			}
		}
	});


	// when

	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e); //trigger show list

	var done = assert.async();

	// then

	function assertList() {

		assert.ok(eventReceived === false, 'Event received');
	}

	function afterTests() {

		$('body').off('selectElement').off('selectElement.eac');
	}

});


QUnit.test('Plugin should not emit event \'loadElements\' ', function (assert) {
	// given
	var $input = $('#inputOne'),
		eventReceived = false;


	$('body')
		.on('loadElements', function () {
			eventReceived = true;
		})
		.on('loadElements.eac', function () {

			// then
			assertList();

			done();

			afterTests();
		});


	$input.easyAutocomplete({
		url: 'resources/colors_string.json'
	});


	// when

	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e); //trigger show list

	var done = assert.async();

	// then

	function assertList() {

		assert.ok(eventReceived === false, 'Event received');
	}

	function afterTests() {

		$('body').off('loadElements').off('loadElements.eac');
	}

});


QUnit.test('Event onChooseEvent - key enter', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
			url: 'resources/colors_string.json',

			list: {
				onChooseEvent: function () {

					// then
					assertList();
				},
				onLoadEvent: function () {


					//trigger select event
					var key = $.Event('keyup');
					key.keyCode = 40;
					$input.trigger(key);


					//trigger key enter
					var key = $.Event('keydown');
					key.keyCode = 13;
					$input.trigger(key);
				}
			}

		}),
		$input = $('#inputOne');


	// when
	completerOne.init();
	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e);

	var done = assert.async();

	// then

	function assertList() {

		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');

		done();
	}
});

QUnit.test('Event onChooseEvent - click', function (assert) {
	// given
	var completerOne = new EasyAutocomplete.main($('#inputOne'), {
			url: 'resources/colors_string.json',

			list: {
				onChooseEvent: function () {

					// then
					assertList();
				},
				onLoadEvent: function () {


					//trigger click event
					$('#inputOne').next().find('ul li').eq(0).find(' > div').trigger('click');
				}
			}

		}),
		$input = $('#inputOne');


	// when
	completerOne.init();
	var e = $.Event('keyup');
	e.keyCode = 50;
	$input.val('c').trigger(e);

	var done = assert.async();

	// then

	function assertList() {

		var elements = $('#inputOne').next().find('ul li');

		assert.equal(3, elements.length, 'Response size');

		done();
	}
});

