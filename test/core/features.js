/*
 * Tests EasyAutocomplete - features
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("Highlight ", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("la").trigger(e);

	//assert
	var elements = $("#inputOne").next().find("ul li");
	
	assert.equal(4, elements.length, "Response size");
	assert.equal("b<b>la</b>ck", elements.eq(0).find("div").html(), "First element");
	assert.equal("white", elements.eq(1).find("div").html(), "Second element");
	assert.equal("magenta", elements.eq(2).find("div").html(), "Third element");
	assert.equal("yellow", elements.eq(3).find("div").html(), "Last element");
	
	expect(5);
});

QUnit.test("Highlight - special char '[' ", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black[]", "white{}", "magenta?", "yellow@"],
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("[").trigger(e);

	//assert
	var elements = $("#inputOne").next().find("ul li");
	
	assert.equal(4, elements.length, "Response size");
	assert.equal("black<b>[</b>]", elements.eq(0).find("div").html(), "First element");
	assert.equal("white{}", elements.eq(1).find("div").html(), "Second element");
	assert.equal("magenta?", elements.eq(2).find("div").html(), "Third element");
	assert.equal("yellow@", elements.eq(3).find("div").html(), "Last element");
	
	expect(5);
});

QUnit.test("Highlight - special char '(' ", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black()", "white{}", "magenta?", "yellow@"],
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("(").trigger(e);

	//assert
	var elements = $("#inputOne").next().find("ul li");
	
	assert.equal(4, elements.length, "Response size");
	assert.equal("black<b>(</b>)", elements.eq(0).find("div").html(), "First element");
	assert.equal("white{}", elements.eq(1).find("div").html(), "Second element");
	assert.equal("magenta?", elements.eq(2).find("div").html(), "Third element");
	assert.equal("yellow@", elements.eq(3).find("div").html(), "Last element");
	
	expect(5);
});

QUnit.test("Highlight - special char '?' ", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black[]", "white{}", "magenta?", "yellow@"],
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("?").trigger(e);

	//assert
	var elements = $("#inputOne").next().find("ul li");
	
	assert.equal(4, elements.length, "Response size");
	assert.equal("black[]", elements.eq(0).find("div").html(), "First element");
	assert.equal("white{}", elements.eq(1).find("div").html(), "Second element");
	assert.equal("magenta<b>?</b>", elements.eq(2).find("div").html(), "Third element");
	assert.equal("yellow@", elements.eq(3).find("div").html(), "Last element");
	
	expect(5);
});


QUnit.test("Highlight - special chars '[](){}?<>,-+*&^%$#@!' ", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black[]", "white{}", "magenta[](){}?<>,-+*&^%$#@!", "yellow@"],
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("[](){}?<>,-+*&^%$#@!").trigger(e);

	//assert
	var elements = $("#inputOne").next().find("ul li");
	
	assert.equal(4, elements.length, "Response size");
	assert.equal("black[]", elements.eq(0).find("div").html(), "First element");
	assert.equal("white{}", elements.eq(1).find("div").html(), "Second element");
	assert.equal("magenta<b>[](){}?&lt;&gt;,-+*&amp;^%$#@!</b>", elements.eq(2).find("div").html(), "Third element");
	assert.equal("yellow@", elements.eq(3).find("div").html(), "Last element");
	
	expect(5);
});


QUnit.test("requestDelay - local data ", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],

		requestDelay: 200
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("b").trigger(e);

	//assert

	//#FIRST
	var elements = $("#inputOne").next().find("ul li");
	
	assert.equal(0, elements.length, "Response size");
	

	//#SECOND
	$("#inputOne").val("bl").trigger(e);

	elements = $("#inputOne").next().find("ul li");
	assert.equal(0, elements.length, "Response size");

	//#THIRD
	setTimeout(function() {

		$("#inputOne").val("bla").trigger(e);

		elements = $("#inputOne").next().find("ul li");
		assert.equal(4, elements.length, "Response size");

		QUnit.start();

	}, 500);

	QUnit.stop();

	//#FOURTH
	$("#inputOne").val("bl").trigger(e);

	elements = $("#inputOne").next().find("ul li");
	assert.equal(0, elements.length, "Response size");


	//#FIFTH
	setTimeout(function() {

		$("#inputOne").val("bla").trigger(e);

		elements = $("#inputOne").next().find("ul li");
		assert.equal(4, elements.length, "Response size");

		QUnit.start();

	}, 500);

	QUnit.stop();

	
	expect(5);
});


QUnit.test("requestDelay - remote data ", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_string.json",

		requestDelay: 200
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("b").trigger(e);

	//assert

	//#FIRST
	var elements = $("#inputOne").next().find("ul li");
	
	assert.equal(0, elements.length, "Response size");
	

	//#SECOND
	$("#inputOne").val("bl").trigger(e);

	elements = $("#inputOne").next().find("ul li");
	assert.equal(0, elements.length, "Response size");

	//#THIRD
	setTimeout(function() {

		$("#inputOne").val("bla").trigger(e);

		elements = $("#inputOne").next().find("ul li");
		assert.equal(3, elements.length, "Response size");

		QUnit.start();

	}, 500);

	QUnit.stop();

	//#FOURTH
	$("#inputOne").val("bl").trigger(e);

	elements = $("#inputOne").next().find("ul li");
	assert.equal(0, elements.length, "Response size");


	//#FIFTH
	setTimeout(function() {

		$("#inputOne").val("bla").trigger(e);

		elements = $("#inputOne").next().find("ul li");
		assert.equal(3, elements.length, "Response size");

		QUnit.start();

	}, 500);

	QUnit.stop();

	
	expect(5);
});
