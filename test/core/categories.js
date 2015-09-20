/*
 * Tests EasyAutocomplete - categories 
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("Simple category", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				categories: [{
					listLocation: "fruits"
				}],
				url: "resources/categories.json",
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

			assert.equal(6, elements.length, "Response size");
			assert.equal("Apple", elements.eq(0).find("div").text(), "First element value");
			assert.equal("Cherry", elements.eq(1).find("div").text(), "Second element value");
			assert.equal("Satsuma", elements.eq(5).find("div").text(), "Last element value");
			
			QUnit.start();	
	}
});

QUnit.test("Simple categories - two list", function( assert ) {
	expect(7);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				categories: [{
					listLocation: "fruits"
				}, {
					listLocation: "vagatables"
				}],
				url: "resources/categories.json",
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

			assert.equal(12, elements.length, "Response size");
			assert.equal("Apple", elements.eq(0).find("div").text(), "First element value");
			assert.equal("Cherry", elements.eq(1).find("div").text(), "Second element value");
			assert.equal("Satsuma", elements.eq(5).find("div").text(), "Last element value");
			
			assert.equal("Pepper", elements.eq(6).find("div").text(), "First element value - second category");
			assert.equal("Jerusalem artichoke", elements.eq(7).find("div").text(), "Second element value - second category");
			assert.equal("Yam", elements.eq(11).find("div").text(), "Last element value - second category")

			QUnit.start();	
	}
});


QUnit.test("Simple category - with header", function( assert ) {
	expect(6);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				categories: [{
					listLocation: "fruits",
					header: "--- FRUITS ---"
				}],
				url: "resources/categories.json",
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
		var elements = $("#inputOne").next().find("ul").find(" > div, > li");

			assert.equal(7, elements.length, "Response size");
			assert.equal("--- FRUITS ---", elements.eq(0).text(), "Header");
			assert.equal(true, elements.eq(0).hasClass("eac-category"), "Header - first category");
			assert.equal("Apple", elements.eq(1).find("div").text(), "First element value");
			assert.equal("Cherry", elements.eq(2).find("div").text(), "Second element value");
			assert.equal("Satsuma", elements.eq(6).find("div").text(), "Last element value");
			
			QUnit.start();	
	}
});

QUnit.test("Simple category - two categories, with header", function( assert ) {
	expect(7);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				categories: [{
					listLocation: "fruits",
					header: "--- FRUITS ---"
				},{
					listLocation: "vagatables",
					header: "--- VAGATABLES ---"
				}],
				url: "resources/categories.json",
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
		var elements = $("#inputOne").next().find("ul").find(" > div, > li");

			assert.equal(14, elements.length, "Response size");
			assert.equal("--- FRUITS ---", elements.eq(0).text(), "Header - first category");
			assert.equal(true, elements.eq(0).hasClass("eac-category"), "Header - first category");
			assert.equal("Satsuma", elements.eq(6).find("div").text(), "Last element value - first category");
			assert.equal("--- VAGATABLES ---", elements.eq(7).text(), "Header - second category");
			assert.equal(true, elements.eq(0).hasClass("eac-category"), "Header - first category");
			assert.equal("Pepper", elements.eq(8).find("div").text(), "First element value - second category");
			
			QUnit.start();	
	}
});
