/*
 * Tests EasyAutocomplete - static data
 *
 * @author Łukasz Pawełczak
 */
 QUnit.test("Local data - empty array", function( assert ) {
	expect(1);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [],

	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("a").trigger(e);

	
	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(0, elements.length, "Response size");
			
});

QUnit.test("Local data - string array", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: ["red", "green", "blue", "pink"],

	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("a").trigger(e);
	$("#inputOne").val("a").trigger(e);

	
	//assert

	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("red", elements.eq(0).find("div").text(), "First element value");
	assert.equal("green", elements.eq(1).find("div").text(), "Second element value");
	assert.equal("blue", elements.eq(2).find("div").text(), "Third element value");
	assert.equal("pink", elements.eq(3).find("div").text(), "Fourth element value");
		
});

QUnit.test("Local data - object array", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{"name": "red"}, {"name": "green"}, {"name": "blue"}, {"name": "pink"}],

		getValue: function(element) {
			return element.name;
		},
	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("").trigger(e);


	//assert


	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("red", elements.eq(0).find("div").text(), "First element value");
	assert.equal("green", elements.eq(1).find("div").text(), "Second element value");
	assert.equal("blue", elements.eq(2).find("div").text(), "Third element value");
	assert.equal("pink", elements.eq(3).find("div").text(), "Fourth element value");
		
	
});

QUnit.test("Local data + listLocation- string array", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: {
			colors: ["black", "white", "magenta", "yellow"]
		},

		listLocation: "colors"

	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("a").trigger(e);
	$("#inputOne").val("a").trigger(e);

	
	//assert

	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("black", elements.eq(0).find("div").text(), "First element value");
	assert.equal("white", elements.eq(1).find("div").text(), "Second element value");
	assert.equal("magenta", elements.eq(2).find("div").text(), "Third element value");
	assert.equal("yellow", elements.eq(3).find("div").text(), "Fourth element value");
		
});

QUnit.test("Local data + listLocation - object array", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: {
			colors: [{"name": "red"}, {"name": "green"}, {"name": "blue"}, {"name": "pink"}],
			otherStaff: "foo bar"
		},

		getValue: function(element) {
			return element.name;
		},

		listLocation: "colors"
	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("").trigger(e);


	//assert


	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("red", elements.eq(0).find("div").text(), "First element value");
	assert.equal("green", elements.eq(1).find("div").text(), "Second element value");
	assert.equal("blue", elements.eq(2).find("div").text(), "Third element value");
	assert.equal("pink", elements.eq(3).find("div").text(), "Fourth element value");
		
	
});
