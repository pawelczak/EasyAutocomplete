

QUnit.test("Simple response", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json", ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});

	var Consts = completerOne.getConstants();

	//execute
	
	completerOne.init();

	$("#inputOne").val("c").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(3, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("span").text(), "First element value");
			assert.equal("yellow", elements.eq(1).find("span").text(), "Second element value");
			assert.equal("brown", elements.eq(2).find("span").text(), "Third element value");
			
			QUnit.start();	
	}
});



QUnit.test("Sorted list", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json", list: {sort: {enabled: true}}, ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});

	var Consts = completerOne.getConstants();

	//execute
	
	completerOne.init();

	$("#inputOne").val("c").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(3, elements.length, "Response size");
			assert.equal("brown", elements.eq(0).find("span").text(), "First element value");
			assert.equal("red", elements.eq(1).find("span").text(), "Second element value");
			assert.equal("yellow", elements.eq(2).find("span").text(), "Third element value");
			
			QUnit.start();	
	}
});

QUnit.test("Reverse sorted list", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json",

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

	var Consts = completerOne.getConstants();

	//execute
	
	completerOne.init();

	$("#inputOne").val("c").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(3, elements.length, "Response size");
			assert.equal("brown", elements.eq(2).find("span").text(), "First element value");
			assert.equal("red", elements.eq(1).find("span").text(), "Second element value");
			assert.equal("yellow", elements.eq(0).find("span").text(), "Third element value");
			
			QUnit.start();	
	}
});


QUnit.test("Max elements number list", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json",

		list: {
			maxNumberOfElements: 1
		},

		ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});

	var Consts = completerOne.getConstants();

	//execute
	
	completerOne.init();

	$("#inputOne").val("c").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(1, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("span").text(), "Second element value");
			
			QUnit.start();	
	}
});

QUnit.test("Match all elements from list", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/countries.json",

		getValue: function(element) {
			return element.name;
		},

		list: {
			maxNumberOfElements:999,	
			matching: {
				enabled: true
			},
		},

		ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});

	var Consts = completerOne.getConstants();

	//execute
	
	completerOne.init();

	$("#inputOne").val("a").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(206, elements.length, "Response size");
			assert.equal("Cocos (Keeling) Islands", elements.eq(41).find("span").text(), "Cocos (Keeling) Islands element value");
			assert.equal("Malaysia", elements.eq(111).find("span").text(), "Malaysia element value");
			
			QUnit.start();	
	}
});

QUnit.test("Simple matching list phrase 'ok'", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/countries.json",

		getValue: function(element) {
			return element.name;
		},

		list: {
			matching: {
				enabled: true
			},
		},

		ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});

	var Consts = completerOne.getConstants();

	//execute
	
	completerOne.init();

	$("#inputOne").val("ok").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(2, elements.length, "Response size");
			assert.equal("Cook Islands", elements.eq(0).find("span").text(), "Cook island element value");
			assert.equal("Tokelau", elements.eq(1).find("span").text(), "Tokelau element value");
			
			QUnit.start();	
	}
});

QUnit.test("Highlight phrase", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json",


		highlightPhrase: true,

		ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});

	var Consts = completerOne.getConstants();

	//execute
	
	completerOne.init();

	$("#inputOne").val("r").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal("<b>r</b>ed", elements.eq(0).find("span").html(), "red element value");
			assert.equal("b<b>r</b>own", elements.eq(2).find("span").html(), "brown element value");
			
			QUnit.start();	
	}
});

QUnit.test("Dont highlight phrase", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json",

		highlightPhrase: false,

		ajaxCallback: function() {

			//assert
			
			assertList();
		}

	});

	var Consts = completerOne.getConstants();

	//execute
	
	completerOne.init();

	$("#inputOne").val("r").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal("red", elements.eq(0).find("span").html(), "red element value");
			assert.equal("brown", elements.eq(2).find("span").html(), "brown element value");
			
			QUnit.start();	
	}
});
