/*
 * Tests EasyAutocomplete - functions
 *
 * @author Łukasz Pawełczak
 */
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
					$("#inputOne").next().find("ul li").eq(8).find(" > div").trigger("click");
				},

				onSelectItemEvent: function() {
					
					assert.equal(8, $("#inputOne").getSelectedItemIndex(), "second fruit selected");

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