/*
 * Tests EasyAutocomplete - static data
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("Template - basic", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: ["red", "green", "blue", "pink"],

		template: {}

	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("a").trigger(e);

	
	//assert

	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("red", elements.eq(0).find("div").text(), "First element value");
	assert.equal("green", elements.eq(1).find("div").text(), "Second element value");

		
});



QUnit.test("Template - description", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", code: "pol"}, {country: "Germany", code: "ger"}, {country: "Italy", code: "ita"}],

		getValue: "country",

		template: {
			type: "description",
			fields: {
				description: "code"
			}
		}

	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("a").trigger(e);

	
	//assert

	var elements = $("#inputOne").next().find("ul li");

	assert.equal(3, elements.length, "Response size");
	assert.equal("Poland - pol", elements.eq(0).find("div").text(), "First element value");
	assert.equal("Germany - ger", elements.eq(1).find("div").text(), "Second element value");

		
});


QUnit.test("Template - icon right - iconSrc string", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", code: "pol"}, {country: "Germany", code: "ger"}, {country: "Italy", code: "ita"}],

		getValue: "country",

		template: {
			type: "iconRight",
			fields: {
				iconSrc: "code"
			}
		}

	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("z").trigger(e);

	
	//assert

	var elements = $("#inputOne").next().find("ul li");

	assert.equal(3, elements.length, "Response size");
	assert.equal("Poland<img class=\"eac-icon\" src=\"pol\">", elements.eq(0).find("div").html(), "First element value");
	assert.equal("Germany<img class=\"eac-icon\" src=\"ger\">", elements.eq(1).find("div").html(), "Second element value");

		
});



QUnit.test("Template - icon right - iconSrc function", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", code: "pol"}, {country: "Germany", code: "ger"}, {country: "Italy", code: "ita"}],

		getValue: "country",

		template: {
			type: "iconRight",
			fields: {
				iconSrc: function(element) {
					return "http://iconSource.info/" + element.code + ".png";
				}
			}
		}

	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("z").trigger(e);

	
	//assert

	var elements = $("#inputOne").next().find("ul li");

	assert.equal(3, elements.length, "Response size");
	assert.equal("Poland<img class=\"eac-icon\" src=\"http://iconSource.info/pol.png\">", elements.eq(0).find("div").html(), "First element value");
	assert.equal("Germany<img class=\"eac-icon\" src=\"http://iconSource.info/ger.png\">", elements.eq(1).find("div").html(), "Second element value");

		
});


QUnit.test("Template - icon left - iconSrc function", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", code: "pol"}, {country: "Germany", code: "ger"}, {country: "Italy", code: "ita"}],

		getValue: "country",

		template: {
			type: "iconLeft",
			fields: {
				iconSrc: function(element) {
					return "http://iconSource.info/" + element.code + ".png";
				}
			}
		}

	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("z").trigger(e);

	
	//assert

	var elements = $("#inputOne").next().find("ul li");

	assert.equal(3, elements.length, "Response size");
	assert.equal("<img class=\"eac-icon\" src=\"http://iconSource.info/pol.png\">Poland", elements.eq(0).find("div").html(), "First element value");
	assert.equal("<img class=\"eac-icon\" src=\"http://iconSource.info/ger.png\">Germany", elements.eq(1).find("div").html(), "Second element value");
	
});

