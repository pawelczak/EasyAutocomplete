/*
 * Tests EasyAutocomplete - static data
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("Static data - string array", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: ["red", "green", "blue", "pink"],

	});


	//execute
	
	completerOne.init();

	$("#inputOne").val("").trigger("keyup");

	
	//assert

	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("red", elements.eq(0).find("span").text(), "First element value");
	assert.equal("green", elements.eq(1).find("span").text(), "Second element value");
	assert.equal("blue", elements.eq(2).find("span").text(), "Third element value");
	assert.equal("pink", elements.eq(3).find("span").text(), "Fourth element value");
		
});

QUnit.test("Static data - object array", function( assert ) {
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

	$("#inputOne").val("").trigger("keyup");


	//assert


	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("red", elements.eq(0).find("span").text(), "First element value");
	assert.equal("green", elements.eq(1).find("span").text(), "Second element value");
	assert.equal("blue", elements.eq(2).find("span").text(), "Third element value");
	assert.equal("pink", elements.eq(3).find("span").text(), "Fourth element value");
		
	
});