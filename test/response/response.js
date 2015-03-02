

//------------------------------------------------------------
//------------------------------------------------------------
//--------------------- JSON DATA ----------------------------
//------------------------------------------------------------
//------------------------------------------------------------

QUnit.test("JSON - Simple response", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json", ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});


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



QUnit.test("JSON - Sorted list", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json", list: {sort: {enabled: true}}, ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});


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

QUnit.test("JSON - Reverse sorted list", function( assert ) {
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


	//execute
	
	completerOne.init();

	$("#inputOne").val("c").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(3, elements.length, "Response size");
			assert.equal("yellow", elements.eq(0).find("span").text(), "First element value");
			assert.equal("red", elements.eq(1).find("span").text(), "Second element value");
			assert.equal("brown", elements.eq(2).find("span").text(), "Third element value");
			
			QUnit.start();	
	}
});


QUnit.test("JSON - Max elements number list", function( assert ) {
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


	//execute
	
	completerOne.init();

	$("#inputOne").val("c").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(1, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("span").text(), "First element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - Match all elements from list", function( assert ) {
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


	//execute
	
	completerOne.init();

	$("#inputOne").val("a").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(204, elements.length, "Response size");
			assert.equal("Cocos (Keeling) Islands", elements.eq(40).find("span").text(), "Cocos (Keeling) Islands element value");
			assert.equal("Malaysia", elements.eq(110).find("span").text(), "Malaysia element value");
			
			QUnit.start();	
	}
});

QUnit.test("JSON - Simple matching list phrase 'ok'", function( assert ) {
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

QUnit.test("JSON - Highlight phrase", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json",


		highlightPhrase: true,

		ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});


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

QUnit.test("JSON - Dont highlight phrase", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors2.json",

		highlightPhrase: false,

		ajaxCallback: function() {

			//assert
			
			assertList();
		}

	});


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



//------------------------------------------------------------
//------------------------------------------------------------
//--------------------- XML DATA -----------------------------
//------------------------------------------------------------
//------------------------------------------------------------



QUnit.test("XML - Simple response", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors.xml",


		dataType: "xml",
		xmlElementName: "color",

		ajaxCallback: function() {

			//assert
			
			assertList();
		}

	});


	//execute
	
	completerOne.init();

	$("#inputOne").val("").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(4, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("span").text(), "First element value");
			assert.equal("green", elements.eq(1).find("span").text(), "Second element value");
			assert.equal("blue", elements.eq(2).find("span").text(), "Third element value");
			assert.equal("pink", elements.eq(3).find("span").text(), "Fourth element value");
			
			QUnit.start();	
	}
});

QUnit.test("XML - Sorted list", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new Completer($("#inputOne"), 
			{
				url: "../data/colors.xml",

				dataType: "xml",
				xmlElementName: "color",

				list: {sort: {enabled: true}},

				ajaxCallback: function() {

					//assert
					
					assertList();
				}
	});


	//execute
	
	completerOne.init();

	$("#inputOne").val("c").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(4, elements.length, "Response size");
			assert.equal("blue", elements.eq(0).find("span").text(), "First element value");
			assert.equal("green", elements.eq(1).find("span").text(), "Second element value");
			assert.equal("pink", elements.eq(2).find("span").text(), "Third element value");
			assert.equal("red", elements.eq(3).find("span").text(), "Fourth element value");
			
			QUnit.start();	
	}
});



QUnit.test("XML - Max elements number list", function( assert ) {
	expect(2);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors.xml",

		dataType: "xml",
		xmlElementName: "color",

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

	$("#inputOne").val("c").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(1, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("span").text(), "First element value");
			
			QUnit.start();	
	}
});

QUnit.test("XML - Simple object", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colorObjects.xml",

		dataType: "xml",
		xmlElementName: "color",

		getValue: function(element) {
			return $(element).find("name").text();
		},

		ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});


	//execute
	
	completerOne.init();

	$("#inputOne").val("a").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(4, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("span").text(), "First element value");
			assert.equal("green", elements.eq(1).find("span").text(), "Second element value");
			assert.equal("blue", elements.eq(2).find("span").text(), "Third element value");
			assert.equal("pink", elements.eq(3).find("span").text(), "Fourth element value");
			
			QUnit.start();	
	}
});

QUnit.test("XML - Simple matching list phrase 're'", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors.xml",

		dataType: "xml",
		xmlElementName: "color",

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


	//execute
	
	completerOne.init();

	$("#inputOne").val("re").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(2, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("span").text(), "Red element value");
			assert.equal("green", elements.eq(1).find("span").text(), "Green element value");
			
			QUnit.start();	
	}
});



QUnit.test("XML - Highlight phrase", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors.xml",

		dataType: "xml",
		xmlElementName: "color",

		highlightPhrase: true,

		ajaxCallback: function() {

			//assert
			
			assertList();
		}
	});


	//execute
	
	completerOne.init();

	$("#inputOne").val("e").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(4, elements.length, "Response size");
			assert.equal("r<b>e</b>d", elements.eq(0).find("span").html(), "First element value");
			assert.equal("gr<b>e</b><b>e</b>n", elements.eq(1).find("span").html(), "Second element value");
			assert.equal("blu<b>e</b>", elements.eq(2).find("span").html(), "Third element value");
			assert.equal("pink", elements.eq(3).find("span").html(), "Fourth element value");
			
			QUnit.start();	
	}
});

QUnit.test("XML - Dont highlight phrase", function( assert ) {
	expect(5);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors.xml",

		dataType: "xml",
		xmlElementName: "color",

		highlightPhrase: false,

		ajaxCallback: function() {

			//assert
			
			assertList();
		}

	});


	//execute
	
	completerOne.init();

	$("#inputOne").val("e").trigger("keyup");


	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

			assert.equal(4, elements.length, "Response size");
			assert.equal("red", elements.eq(0).find("span").html(), "First element value");
			assert.equal("green", elements.eq(1).find("span").html(), "Second element value");
			assert.equal("blue", elements.eq(2).find("span").html(), "Third element value");
			assert.equal("pink", elements.eq(3).find("span").html(), "Fourth element value");
			
			QUnit.start();	
	}
});

