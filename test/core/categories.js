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

QUnit.test("Simple category- no list location", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				categories: [{
					getValue: "name"
				}],
				url: "resources/colors.json",
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
		assert.equal("blue", elements.eq(0).find("div").text(), "First element value");
		assert.equal("yellow", elements.eq(1).find("div").text(), "Second element value");
		assert.equal("brown", elements.eq(2).find("div").text(), "Last element value");
		
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


QUnit.test("Category - data as objects list", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				categories: [{
					listLocation: "fruits"
				}],
				getValue: "name",
				url: "resources/categories/fruits.json",
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

QUnit.test("Category - data as objects list - two different list", function( assert ) {
	expect(7);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
			{
				categories: [{
					listLocation: "fruits",
					getValue: "name"
				}, {
					listLocation: "vagatables",
					getValue: function(item) {return item.text;}
				}],

				url: "resources/categories/fruits.json",
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

QUnit.test("Category - xml - simple", function( assert ) {
	expect(6);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
	{
		
		categories: [{
			header: "colors"
		}],

		dataType: "xml",
		xmlElementName: "color",	

		url: "resources/colors.xml",
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

		assert.equal(5, elements.length, "Response size");
		assert.equal("colors", elements.eq(0).text(), "Header - first category");
		assert.equal("red", elements.eq(1).find("div").text(), "First element value");
		assert.equal("green", elements.eq(2).find("div").text(), "Second element value");
		assert.equal("blue", elements.eq(3).find("div").text(), "Last element value");
		assert.equal("pink", elements.eq(4).find("div").text(), "Last element value");


		QUnit.start();	
	}
});

QUnit.test("Category - xml - one list", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
	{
		categories: [{
			header: "xml - fruits",	
			listLocation: "fruits"
		}],

		getValue: function(element) { return $(element).find("name").text();},

		dataType: "xml",
		xmlElementName: "fruit",	

		url: "resources/categories/fruits.xml",
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

QUnit.test("Category - xml - two list", function( assert ) {
	expect(7);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), 
	{
		categories: [{
			header: "xml - fruits",
			listLocation: "fruits",
			xmlElementName: "fruit"
		},{
			header: "xml - vagatables",
			listLocation: "vagatables",
			xmlElementName: "vagatable"
		}],

		getValue: function(element) { return $(element).find("name").text();},

		dataType: "xml",
		xmlElementName: "fruit",	

		url: "resources/categories/fruits.xml",
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

		assert.equal("Carrot", elements.eq(6).find("div").text(), "First element value");
		assert.equal("Tomato", elements.eq(7).find("div").text(), "Second element value");
		assert.equal("Yam", elements.eq(11).find("div").text(), "Last element value");


		QUnit.start();	
	}
});
