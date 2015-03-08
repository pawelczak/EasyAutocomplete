

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
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors_object.xml",

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

QUnit.test("XML - Matching simple list - phrase 're'", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors.xml",

		dataType: "xml",
		xmlElementName: "color",

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

QUnit.test("XML - Matching advance object phrase 're'", function( assert ) {
	expect(3);
	
	//given
	var completerOne = new Completer($("#inputOne"), {url: "../data/colors_object.xml",

		dataType: "xml",
		xmlElementName: "color",

		getValue: function(element) {
			return $(element).find("name").text();
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

 