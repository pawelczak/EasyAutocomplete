/*
 * Tests EasyAutocomplete - response json
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("JSON - Simple list response", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json", ajaxCallback: function() {

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

QUnit.test("JSON - Simple object", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {
		
		getValue: function(element) {
			return element.name;
		},

		url: "resources/colors_object.json", ajaxCallback: function() {

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

QUnit.test("JSON - Simple object - getValue equals string", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {
		
		getValue: "name",

		url: "resources/colors_object.json", ajaxCallback: function() {

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

QUnit.test("JSON - Sorted list", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json", list: {sort: {enabled: true}}, ajaxCallback: function() {

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
			assert.equal("brown", elements.eq(0).find("div").text(), "First element value");
			assert.equal("red", elements.eq(1).find("div").text(), "Second element value");
			assert.equal("yellow", elements.eq(2).find("div").text(), "Third element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - Reverse sorted list", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json",

		 list: {
		 		sort: {
		 			enabled: true,
		 			method:  function(a, b) {
							//Reverse alphabeticall sort
							if (a < b) {
								return 1;
							}
							if (a > b) {
								return -1;
							}
							return 0;
						}
					}
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
			assert.equal("yellow", elements.eq(0).find("div").text(), "First element value");
			assert.equal("red", elements.eq(1).find("div").text(), "Second element value");
			assert.equal("brown", elements.eq(2).find("div").text(), "Third element value");
			
			QUnit.start();	
	}
});


QUnit.test("JSON - Max elements number list", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json",

		list: {
			maxNumberOfElements: 1
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

			assert.equal(1, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("div").text(), "First element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - match - string list phrase 're'", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json",

		list: {
			match: {
				enabled: true
			},
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
	$("#inputOne").val("r").trigger(e);


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(2, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("div").text(), "Red element value");
			assert.equal("brown", elements.eq(1).find("div").text(), "Brown element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - Match all elements from list", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/countries.json",

		getValue: function(element) {
			return element.name;
		},

		list: {
			maxNumberOfElements:999,	
			match: {
				enabled: true
			},
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
	$("#inputOne").val("a").trigger(e);


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(206, elements.length, "Response size");
			assert.equal("Cocos (Keeling) Islands", elements.eq(41).find("div").text(), "Cocos (Keeling) Islands element value");
			assert.equal("Malaysia", elements.eq(111).find("div").text(), "Malaysia element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - Simple match list phrase 'ok'", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/countries.json",

		getValue: function(element) {
			return element.name;
		},

		list: {
			match: {
				enabled: true
			},
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
	$("#inputOne").val("ok").trigger(e);


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(2, elements.length, "Response size");
			assert.equal("Cook Islands", elements.eq(0).find("div").text(), "Cook island element value");
			assert.equal("Tokelau", elements.eq(1).find("div").text(), "Tokelau element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - Dont highlight phrase", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json",

		highlightPhrase: false,

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

			assert.equal("red", elements.eq(0).find("div").html(), "red element value");
			assert.equal("brown", elements.eq(2).find("div").html(), "brown element value");
			
			QUnit.start();	
	}
});


QUnit.test("JSON - Highlight - string list ", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json",


		highlightPhrase: true,

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

			assert.equal("<b>r</b>ed", elements.eq(0).find("div").html(), "red element value");
			assert.equal("b<b>r</b>own", elements.eq(2).find("div").html(), "brown element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - Highlight - object list", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_object.json",

		getValue: function(element) {
			return element.name;
		},

		highlightPhrase: true,

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

			assert.equal("<b>r</b>ed", elements.eq(0).find("div").html(), "red element value");
			assert.equal("b<b>r</b>own", elements.eq(2).find("div").html(), "brown element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - duckduckgo response", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {
		
		listLocation: "RelatedTopics",

		getValue: function(element) {
			return element.Text;
		},

		url: "resources/duckduckgo.json",

		list: {
			maxNumberOfElements: 10,
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

			assert.equal(10, elements.length, "Response size");
			assert.equal("Autocorrect, automatic correction of misspelled words.", elements.eq(0).find("div").text(), "First element value");
			assert.equal("Text editor features", elements.eq(6).find("div").text(), "Second element value");
			assert.equal("Disability software", elements.eq(7).find("div").text(), "Third element value");
			assert.equal("Free software", elements.eq(9).find("div").text(), "Fourth element value");
			QUnit.start();	
	}
});

