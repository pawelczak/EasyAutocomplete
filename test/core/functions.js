/*
 * Tests EasyAutocomplete - functions
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("getSelectedItemIndex - no selected item", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	//assert
	var elements = $("#inputOne").next().find("ul li");
	var afterSelectedItem = $("#inputOne").getSelectedItemIndex();

	assert.equal(4, elements.length, "Response size");
	assert.equal(-1, afterSelectedItem, "getSelectedItemIndex returns actual item after mouseover");

	expect(2);
});

QUnit.test("getSelectedItemIndex - input with id", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	var beforeSelectedItem = $("#inputOne").getSelectedItemIndex();

	//select second element
	$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("mouseover");

	var afterSelectedItem = $("#inputOne").getSelectedItemIndex();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
	assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItemIndex returns actual item before mouseover");	
	assert.equal(1, afterSelectedItem, "getSelectedItemIndex returns actual item after mouseover");

	expect(7);
});


QUnit.test("getSelectedItemIndex - input with no id", function( assert ) {
	
	
	//given
	var completerOne = $(".inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$(".inputOne").val("more").trigger(e);


	var beforeSelectedItem = $(".inputOne").getSelectedItemIndex();

	//select second element
	$(".inputOne").next().find("ul li").eq(1).find(" > div").trigger("mouseover");

	var afterSelectedItem = $(".inputOne").getSelectedItemIndex();

	//assert
	var elements = $(".inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
	assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItemIndex returns actual item before mouseover");	
	assert.equal(1, afterSelectedItem, "getSelectedItemIndex returns actual item after mouseover");

	expect(7);
});


QUnit.test("getSelectedItemIndex - input with id - click trigger", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	var beforeSelectedItem = $("#inputOne").getSelectedItemIndex();

	//select second element
	$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("click");

	var afterSelectedItem = $("#inputOne").getSelectedItemIndex();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
	assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItemIndex returns actual item before click");	
	assert.equal(1, afterSelectedItem, "getSelectedItemIndex returns actual item after click");

	expect(7);
});

QUnit.test("getSelectedItemIndex - input with id - arrowDown trigger", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	var beforeSelectedItem = $("#inputOne").getSelectedItemIndex();

	//select third element
	e.keyCode = 40; 
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);

	var afterSelectedItem = $("#inputOne").getSelectedItemIndex();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(false, elements.eq(1).hasClass("selected"), "Second element is not selected");
	assert.equal(true, elements.eq(2).hasClass("selected"), "Third element is selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItemIndex returns actual item before click");	
	assert.equal(2, afterSelectedItem, "getSelectedItemIndex returns actual item after click");

	expect(7);
});

QUnit.test("getSelectedItemIndex - input with id - arrowDown/arrowUp mixin", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	var beforeSelectedItem = $("#inputOne").getSelectedItemIndex();

	//select third element
	e.keyCode = 40; 
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);

	e.keyCode = 38; 
	$("#inputOne").trigger(e);
	

	var afterSelectedItem = $("#inputOne").getSelectedItemIndex();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(false, elements.eq(1).hasClass("selected"), "Second element is not selected");
	assert.equal(true, elements.eq(2).hasClass("selected"), "Third element is selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItemIndex returns actual item before click");	
	assert.equal(2, afterSelectedItem, "getSelectedItemIndex returns actual item after click");

	expect(7);
});

QUnit.test("getSelectedItemIndex - response - on onLoadEvent", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				var beforeSelectedItem = $("#inputOne").getSelectedItemIndex();

				//select first element
				e.keyCode = 40; 
				$("#inputOne").trigger(e);
				$("#inputOne").trigger(e);
				$("#inputOne").trigger(e);
				$("#inputOne").trigger(e);

				e.keyCode = 38; 
				$("#inputOne").trigger(e);
				

				var afterSelectedItem = $("#inputOne").getSelectedItemIndex();

				//assert
				var elements = $("#inputOne").next().find("ul li");

				assert.equal(3, elements.length, "Response size");
				assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
				assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
				assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
				
				assert.equal(-1, beforeSelectedItem, "getSelectedItemIndex returns actual item before click");	
				assert.equal(1, afterSelectedItem, "getSelectedItemIndex returns actual item after click");

				QUnit.start();
			}
		}

	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	QUnit.stop();
	
	expect(6);
});


QUnit.test("getSelectedItemIndex - response - on onSelectItemEvent", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				//trigger select event
				$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("click");
			},
			onSelectItemEvent: function() {
				
				var afterSelectedItem = $("#inputOne").getSelectedItemIndex();

				//assert
				var elements = $("#inputOne").next().find("ul li");

				assert.equal(3, elements.length, "Response size");
				assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
				assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
				assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
				
				assert.equal(1, afterSelectedItem, "getSelectedItemIndex returns actual item after click");

				QUnit.start();
			}
		}

	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	QUnit.stop();
	
	expect(5);
});

QUnit.test("getSelectedItemIndex - XML", function( assert ) {
	
	//given
	var getValue = function(element) {
		return $(element).find("name").text();
	};

	$("#inputOne").easyAutocomplete({

		url: "resources/colors_object.xml",

		dataType: "xml",
		xmlElementName: "color",

		getValue: getValue,

		list: {
			onLoadEvent: function() {
				//trigger select event
				$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("click");
			},
			onSelectItemEvent: function() {
					
				//assert
				var afterSelectedItem = $("#inputOne").getSelectedItemIndex();

				//assert
				var elements = $("#inputOne").next().find("ul li");

				assert.equal(4, elements.length, "Response size");
				assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
				assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
				assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
				assert.equal(false, elements.eq(2).hasClass("selected"), "Fourth element is not selected");
				
				assert.equal(1, afterSelectedItem, "getSelectedItemIndex returns actual item after click");

				QUnit.start();
			}
		}
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("re").trigger(e);


	QUnit.stop();

	expect(6);
});

QUnit.test("getSelectedItemIndex - response - two different easyAutocomplete instances", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				//trigger select event
				$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("click");
			}
		}

	});

	var completerOne = $(".inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				//trigger select event
				$(".inputOne").next().find("ul li").eq(2).find(" > div").trigger("click");
			},
			onSelectItemEvent: function() {
				
				assert.equal(1, $("#inputOne").getSelectedItemIndex(), "getSelectedItemIndex from #inputOne");
				assert.equal(2, $(".inputOne").getSelectedItemIndex(), "getSelectedItemIndex .inputOne");

				QUnit.start();
			}
		}

	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);
	$(".inputOne").val("more").trigger(e);

	QUnit.stop();
	
	expect(2);
});


QUnit.test("getSelectedItemIndex should work with categories", function( assert ) {
	
	
	//given
	$("#inputOne").easyAutocomplete({
			
			categories: [{
				listLocation: "fruits"
			}, {
				listLocation: "vegetables"
			}],

			url: "resources/categories.json",

			list: {

				onLoadEvent: function() {
					//trigger select event
					$("#inputOne").next().find("ul li").eq(4).find(" > div").trigger("click");
				},

				onSelectItemEvent: function() {
					
					assert.equal(4, $("#inputOne").getSelectedItemIndex(), "second fruit selected");

					QUnit.start();
				}
		}
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	QUnit.stop();
	
	expect(1);
});

QUnit.test("getItems - simple data", function( assert ) {


	//given
	var data = ["black", "star"],
		completerOne = $("#inputOne").easyAutocomplete({

			data: data

		});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50;
	$("#inputOne").val("more").trigger(e);


	//assert
	assert.equal(data.length, $("#inputOne").getItems().length, "should return the items length");
	assert.deepEqual(data, $("#inputOne").getItems(), "should return the items");

	expect(2);
});

QUnit.test("getItems - json data", function( assert ) {
	
	
	//given
	
	var	completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_object.json",

		getValue: function(element) {
			return element.name;
		},
		
		list: {
			onLoadEvent: function() {

				//assert
				var colors = $("#inputOne").getItems();

				assert.deepEqual(expectedColors, colors, "should return the items");

				QUnit.start();
			}
		}
	}),
	expectedColors = [{name: "red"}, {name: "yellow"}, {name: "brown"}];

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	QUnit.stop();

	expect(1);
});

QUnit.test("getItems should work with categories", function( assert ) {
	
	
	//given
	$("#inputOne").easyAutocomplete({
			
			categories: [{
				listLocation: "fruits"
			}, {
				listLocation: "vegetables"
			}],

			url: "resources/categories.json",

			list: {

				onLoadEvent: function() {
					
					//assert
					var categories = $("#inputOne").getItems();

					assert.deepEqual(expectedCategories, categories, "should return the items");

					QUnit.start();
				}
		}
	}),
	expectedCategories = ["Apple", "Cherry", "Clementine", "Honeydew melon", "Pepper", "Jerusalem artichoke"];


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	QUnit.stop();
	
	expect(1);
});

QUnit.test("getItemData - simple data", function( assert ) {
	
	
	//given
	var data = ["black", "white", "magenta", "yellow"], 
		completerOne = $("#inputOne").easyAutocomplete({

		data: data
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	//assert
	assert.equal(data[0], $("#inputOne").getItemData(0), "first element");
	assert.equal(data[1], $("#inputOne").getItemData(1), "second element");
	assert.equal(data[2], $("#inputOne").getItemData(2), "third element");
	assert.equal(data[3], $("#inputOne").getItemData(3), "fourth element");
	assert.equal(-1, $("#inputOne").getItemData(4), "not exist");
	assert.equal(-1, $("#inputOne").getItemData(-1), "not exist");
	assert.equal(-1, $("#inputOne").getItemData("not exist"), "fnot exist");

	expect(7);
});

QUnit.test("getItemData - json data", function( assert ) {
	
	
	//given
	
	var	completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_object.json",

		getValue: function(element) {
			return element.name;
		},
		
		list: {
			onLoadEvent: function() {

				//assert
				assert.equal("red", $("#inputOne").getItemData(0)["name"], "first element");
				assert.equal("yellow", $("#inputOne").getItemData(1).name, "second element");
				assert.equal("brown", $("#inputOne").getItemData(2).name, "third element");
				assert.equal(-1, $("#inputOne").getItemData(4), "not exist");
				assert.equal(-1, $("#inputOne").getItemData(-1), "not exist");
				assert.equal(-1, $("#inputOne").getItemData("not exist"), "fnot exist");

				QUnit.start();
			}
		}
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	QUnit.stop();

	expect(6);
});

QUnit.test("getItemData should work with categories", function( assert ) {
	
	
	//given
	$("#inputOne").easyAutocomplete({
			
			categories: [{
				listLocation: "fruits"
			}, {
				listLocation: "vegetables"
			}],

			url: "resources/categories.json",

			list: {

				onLoadEvent: function() {
					
					//assert
					assert.equal("Apple", $("#inputOne").getItemData(0), "first element");
					assert.equal("Cherry", $("#inputOne").getItemData(1), "second element");
					assert.equal("Clementine", $("#inputOne").getItemData(2), "third element");
					assert.equal("Pepper", $("#inputOne").getItemData(4), "first element");
					assert.equal("Jerusalem artichoke", $("#inputOne").getItemData(5), "second element");
					assert.equal(-1, $("#inputOne").getItemData(12), "not exist");
					assert.equal(-1, $("#inputOne").getItemData(-1), "not exist");
					assert.equal(-1, $("#inputOne").getItemData("not exist"), "fnot exist");

					QUnit.start();
				}
		}
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	QUnit.stop();
	
	expect(8);
});

QUnit.test("getItemData - XML", function( assert ) {
	
	//given
	var getValue = function(element) {
		return $(element).find("name").text();
	};

	$("#inputOne").easyAutocomplete({

		url: "resources/colors_object.xml",

		dataType: "xml",
		xmlElementName: "color",

		getValue: getValue,

		list: {
			onLoadEvent: function() {
					
					//assert
					assert.equal("red", getValue($("#inputOne").getItemData(0)), "first element");
					assert.equal("green", getValue($("#inputOne").getItemData(1)), "second element");
					assert.equal("blue", getValue($("#inputOne").getItemData(2)), "third element");
					assert.equal("pink", getValue($("#inputOne").getItemData(3)), "first element");
					assert.equal(-1, $("#inputOne").getItemData(4), "not exist");
					assert.equal(-1, $("#inputOne").getItemData(-1), "not exist");
					assert.equal(-1, $("#inputOne").getItemData("not exist"), "fnot exist");

					QUnit.start();
				}
		}
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("re").trigger(e);


	QUnit.stop();

	expect(7);
});

QUnit.test("getItemData - two different easyAutocomplete instances", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors.json",

		getValue: "name"

	});

	var completerOne = $(".inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				
				assert.equal("blue", $("#inputOne").getItemData(0).name, "first element - first instance");
				assert.equal("red", $(".inputOne").getItemData(0), "first element - Second instance");

				QUnit.start();
			}
		}

	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);
	$(".inputOne").val("more").trigger(e);

	QUnit.stop();
	
	expect(2);
});


/////////////////////////////////////////////
///////// getSelectedItemData
/////////////////////////////////////////////

QUnit.test("getSelectedItemData - no selected item", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	//assert
	var elements = $("#inputOne").next().find("ul li");
	var selectedItemData = $("#inputOne").getSelectedItemData();

	assert.equal(4, elements.length, "Response size");
	assert.equal(-1, selectedItemData, "getSelectedItemData returns actual item data");

	expect(2);
});

QUnit.test("getSelectedItemData - local data", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	//select second element
	$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("mouseover");

	var selectedItemData = $("#inputOne").getSelectedItemData();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("white", selectedItemData, "getSelectedItemData returns actual item data");

	expect(2);
});


QUnit.test("getSelectedItemData - response json", function( assert ) {
	
	
	//given
	var selectedData = {name: "yellow"};

	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_object.json",
		
		getValue: "name",

		list: {
			onLoadEvent: function() {
				var beforeSelectedItem = $("#inputOne").getSelectedItemIndex();

				//select second element
				$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("mouseover");

				var selectedItemData = $("#inputOne").getSelectedItemData();

				//assert
				var elements = $("#inputOne").next().find("ul li");

				assert.equal(3, elements.length, "Response size");
				assert.ok(selectedData.name === selectedItemData.name, "getSelectedItemIndex returns actual item data");

				QUnit.start();
			}
		}

	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	QUnit.stop();
	
	expect(2);
});


QUnit.test("getSelectedItemData should work with categories", function( assert ) {
	
	
	//given
	$("#inputOne").easyAutocomplete({
			
			categories: [{
				listLocation: "fruits"
			}, {
				listLocation: "vegetables"
			}],

			url: "resources/categories.json",

			list: {

				onLoadEvent: function() {
					//trigger select event
					$("#inputOne").next().find("ul li").eq(5).find(" > div").trigger("click");
				},

				onSelectItemEvent: function() {
					
					assert.equal("Jerusalem artichoke", $("#inputOne").getSelectedItemData(), "second fruit selected");

					QUnit.start();
				}
		}
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);

	QUnit.stop();
	
	expect(1);
});


QUnit.test("getSelectedItemData - XML", function( assert ) {
	
	//given
	var getValue = function(element) {
		return $(element).find("name").text();
	};

	$("#inputOne").easyAutocomplete({

		url: "resources/colors_object.xml",

		dataType: "xml",
		xmlElementName: "color",

		getValue: getValue,

		list: {
			onLoadEvent: function() {
				//trigger select event
				$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("click");
			},
			onSelectItemEvent: function() {
					
				//assert
				var selectedItemData = $("#inputOne").getSelectedItemData();

				//assert
				var elements = $("#inputOne").next().find("ul li");

				assert.equal(4, elements.length, "Response size");
				assert.equal("green", getValue(selectedItemData), "getSelectedItemData returns actual item after click");

				QUnit.start();
			}
		}
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("re").trigger(e);


	QUnit.stop();

	expect(2);
});

QUnit.test("getSelectedItemData - response - two different easyAutocomplete instances", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				//trigger select event
				$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("click");
			}
		}

	});

	var completerOne = $(".inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				//trigger select event
				$(".inputOne").next().find("ul li").eq(2).find(" > div").trigger("click");
			},
			onSelectItemEvent: function() {
				
				assert.equal("yellow", $("#inputOne").getSelectedItemData(), "getSelectedItemData from #inputOne");
				assert.equal("brown", $(".inputOne").getSelectedItemData(), "getSelectedItemData .inputOne");

				QUnit.start();
			}
		}

	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);
	$(".inputOne").val("more").trigger(e);

	QUnit.stop();
	
	expect(2);
});
