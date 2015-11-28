/*
 * Tests EasyAutocomplete - static data
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("Template - basic", function( assert ) {
	expect(4);
	
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

	assert.ok($("#inputOne").parent().hasClass("undefined") === false, "There is no class undefined");

	assert.equal(4, elements.length, "Response size");
	assert.equal("red", elements.eq(0).find("div").text(), "First element value");
	assert.equal("green", elements.eq(1).find("div").text(), "Second element value");

		
});



QUnit.test("Template - description", function( assert ) {
	expect(4);
	
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
	assert.ok(true === $("#inputOne").parent().hasClass("eac-description"), "CSS class");

		
});

QUnit.test("Template - description - function", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", code: "pol"}, {country: "Germany", code: "ger"}, {country: "Italy", code: "ita"}],

		getValue: "country",

		template: {
			type: "description",
			fields: {
				description: function(element) {return element.code;}
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
	assert.ok(true === $("#inputOne").parent().hasClass("eac-description"), "CSS class");

		
});


QUnit.test("Template - icon right - iconSrc string", function( assert ) {
	expect(4);
	
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
	assert.ok(true == $("#inputOne").parent().hasClass("eac-icon-right"), "CSS class");

		
});



QUnit.test("Template - icon right - iconSrc function", function( assert ) {
	expect(4);
	
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
	assert.ok(true == $("#inputOne").parent().hasClass("eac-icon-right"), "CSS class");

		
});


QUnit.test("Template - icon left - iconSrc function", function( assert ) {
	expect(4);
	
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
	assert.ok(true == $("#inputOne").parent().hasClass("eac-icon-left"), "CSS class");
	
});

QUnit.test("Template - icon left - iconSrc string", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", code: "pol"}, {country: "Germany", code: "ger"}, {country: "Italy", code: "ita"}],

		getValue: "country",

		template: {
			type: "iconLeft",
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
	assert.equal("<img class=\"eac-icon\" src=\"pol\">Poland", elements.eq(0).find("div").html(), "First element value");
	assert.equal("<img class=\"eac-icon\" src=\"ger\">Germany", elements.eq(1).find("div").html(), "Second element value");
	assert.ok(true == $("#inputOne").parent().hasClass("eac-icon-left"), "CSS class");
	
});

QUnit.test("Template - icon left - xml provider - complex data", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		url: "resources/colors_object.xml",

		dataType: "xml",
		xmlElementName: "color",

		getValue: function(element) {
			return $(element).find("name").text();
		},

		template: {
			type: "iconLeft",
			fields: {
				iconSrc: function(element) {
					return $(element).find("name").text();
				}
			}
		},

		list: {
			match: {
				enabled: false
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
	$("#inputOne").val("z").trigger(e);

	
	QUnit.stop();
	
	//assert
	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

		assert.ok($("#inputOne").parent().hasClass("undefined") === false, "There is no class undefined");

		assert.equal(4, elements.length, "Response size");
		assert.equal("<img class=\"eac-icon\" src=\"red\">red", elements.eq(0).find("div").html(), "First element value");
		assert.equal("<img class=\"eac-icon\" src=\"green\">green", elements.eq(1).find("div").html(), "Second element value");

		QUnit.start();
	}
});


QUnit.test("Template - links - link string", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", site: "http://site.pl"}, {country: "Germany", site: "http://site.de"}, {country: "Italy", site: "http://site.it"}],

		getValue: "country",

		template: {
			type: "links",
			fields: {
				link: "site"
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

	assert.ok($("#inputOne").parent().hasClass("undefined") === false, "There is no class undefined");

	assert.equal(3, elements.length, "Response size");
	assert.equal("<a href=\"http://site.pl\">Poland</a>", elements.eq(0).find("div").html(), "First element value");
	assert.equal("<a href=\"http://site.de\">Germany</a>", elements.eq(1).find("div").html(), "Second element value");
	
});


QUnit.test("Template - links - link function", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", site: "pl"}, {country: "Germany", site: "de"}, {country: "Italy", site: "it"}],

		getValue: "country",

		template: {
			type: "links",
			fields: {
				link: function(element) {
					return "http://site." + element.site;
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

	assert.ok($("#inputOne").parent().hasClass("undefined") === false, "There is no class undefined");

	assert.equal(3, elements.length, "Response size");
	assert.equal("<a href=\"http://site.pl\">Poland</a>", elements.eq(0).find("div").html(), "First element value");
	assert.equal("<a href=\"http://site.de\">Germany</a>", elements.eq(1).find("div").html(), "Second element value");
	
});


QUnit.test("Template - links - xml provider - complex data", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		url: "resources/colors_object.xml",

		dataType: "xml",
		xmlElementName: "color",

		getValue: function(element) {
			return $(element).find("name").text();
		},

		template: {
			type: "links",
			fields: {
				link: function(element) {
					return "http://site." + $(element).find("name").text();
				}
			}
		},

		list: {
			match: {
				enabled: false
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
	$("#inputOne").val("z").trigger(e);

	
	QUnit.stop();
	
	//assert
	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

		assert.ok($("#inputOne").parent().hasClass("undefined") === false, "There is no class undefined");

		assert.equal(4, elements.length, "Response size");
		assert.equal("<a href=\"http://site.red\">red</a>", elements.eq(0).find("div").html(), "First element value");
		assert.equal("<a href=\"http://site.green\">green</a>", elements.eq(1).find("div").html(), "Second element value");

		QUnit.start();
	}
});


QUnit.test("Template - custom", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		data: [{country: "Poland", site: "pl"}, {country: "Germany", site: "de"}, {country: "Italy", site: "it"}],

		getValue: "country",

		template: {
			type: "custom",
			method: function(value, item) {
				return "<p>" + value + "</p><b>" + item.site + "</b>";
			}
		},

		list: {
			match: {
				enabled: false
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

	assert.ok($("#inputOne").parent().hasClass("undefined") === false, "There is no class undefined");

	assert.equal(3, elements.length, "Response size");
	assert.equal("<p>Poland</p><b>pl</b>", elements.eq(0).find("div").html(), "First element value");
	assert.equal("<p>Germany</p><b>de</b>", elements.eq(1).find("div").html(), "Second element value");
	
});


QUnit.test("Template - custom - xml provider", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		url: "resources/colors.xml",

		dataType: "xml",
		xmlElementName: "color",

		template: {
			type: "custom",
			method: function(value, item) {
				return "<p>" + value + "</p>";
			}
		},

		list: {
			match: {
				enabled: false
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
	$("#inputOne").val("z").trigger(e);

	QUnit.stop();
	
	//assert
	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

		assert.ok($("#inputOne").parent().hasClass("undefined") === false, "There is no class undefined");

		assert.equal(4, elements.length, "Response size");
		assert.equal("<p>red</p>", elements.eq(0).find("div").html(), "First element value");
		assert.equal("<p>green</p>", elements.eq(1).find("div").html(), "Second element value");

		QUnit.start();
	}
});


QUnit.test("Template - custom - xml provider - complex data", function( assert ) {
	expect(4);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {

		url: "resources/colors_object.xml",

		dataType: "xml",
		xmlElementName: "color",

		getValue: function(element) {
			return $(element).find("name").text();
		},

		template: {
			type: "custom",
			method: function(value, item) {
				return "<p>" + value + "</p>" + "<b>" + $(item).find("name").text() +"</b>";
			}
		},

		list: {
			match: {
				enabled: false
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
	$("#inputOne").val("z").trigger(e);

	
	QUnit.stop();
	
	//assert
	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

		assert.ok($("#inputOne").parent().hasClass("undefined") === false, "There is no class undefined");

		assert.equal(4, elements.length, "Response size");
		assert.equal("<p>red</p><b>red</b>", elements.eq(0).find("div").html(), "First element value");
		assert.equal("<p>green</p><b>green</b>", elements.eq(1).find("div").html(), "Second element value");

		QUnit.start();
	}
});

