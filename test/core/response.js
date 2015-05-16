/*
 * Tests EasyAutocomplete - response 
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("Ajax settings - no url", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				url: "", 
				ajaxSettings: {
					url: "resources/colors_string.json"
				},
				ajaxCallback: function() {

					//assert
					assertList();
				}
	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("c").trigger(e);


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(3, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("div").text(), "First element value");
			assert.equal("yellow", elements.eq(1).find("div").text(), "Second element value");
			assert.equal("brown", elements.eq(2).find("div").text(), "Third element value");
			
			QUnit.start();	
	}
});

QUnit.test("Ajax settings - two urls", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				url: "resources/countries.json", 
				ajaxSettings: {
					url: "resources/colors_string.json", 
				},
				ajaxCallback: function() {

					//assert
					assertList();
				}
	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("c").trigger(e);


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(3, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("div").text(), "First element value");
			assert.equal("yellow", elements.eq(1).find("div").text(), "Second element value");
			assert.equal("brown", elements.eq(2).find("div").text(), "Third element value");
			
			QUnit.start();	
	}
});


QUnit.test("Ajax settings - settings url is function", function( assert ) {
	expect(8);
	


	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				url: "resources/countries.json", 
				ajaxSettings: {
					url: function(phrase) { return "resources/colors_string.json";}, 
				},
				ajaxCallback: function() {

					//assert
					assertList();
				}
	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("c").trigger(e);
	

	QUnit.stop();


	$("#inputOne").val("c").trigger(e);
	

	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(3, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("div").text(), "First element value");
			assert.equal("yellow", elements.eq(1).find("div").text(), "Second element value");
			assert.equal("brown", elements.eq(2).find("div").text(), "Third element value");
			
			QUnit.start();	
	}
});


QUnit.test("Do not match response", function( assert ) {
	expect(1);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				url: "resources/response.json", 

				listLocation: "items",
				
				matchResponseProperty: "inputPhrase",

				ajaxCallback: function() {

					//assert
					assertList();
				}
	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("r").trigger(e);


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(0, elements.length, "Response size");
			
			QUnit.start();	
	}
});

QUnit.test("Match response", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				url: "resources/response.json", 

				listLocation: "items",
				
				matchResponseProperty: "inputPhrase",

				ajaxCallback: function() {

					//assert
					assertList();
				}
	});


	//execute
	
	completerOne.init();

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("rr").trigger(e);


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(3, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("div").text(), "First element value");
			assert.equal("yellow", elements.eq(1).find("div").text(), "Second element value");
			assert.equal("brown", elements.eq(2).find("div").text(), "Third element value");
			
			QUnit.start();	
	}
});

