/*
 * Tests EasyAutocomplete - functions
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("getSelectedItem - input with id", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	var beforeSelectedItem = $("#inputOne").getSelectedItem();

	//select second element
	$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("mouseover");

	var afterSelectedItem = $("#inputOne").getSelectedItem();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
	assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItem returns actual item before mouseover");	
	assert.equal(1, afterSelectedItem, "getSelectedItem returns actual item after mouseover");

	expect(7);
});


QUnit.test("getSelectedItem - input with no id", function( assert ) {
	
	
	//given
	var completerOne = $(".inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$(".inputOne").val("more").trigger(e);


	var beforeSelectedItem = $(".inputOne").getSelectedItem();

	//select second element
	$(".inputOne").next().find("ul li").eq(1).find(" > div").trigger("mouseover");

	var afterSelectedItem = $(".inputOne").getSelectedItem();

	//assert
	var elements = $(".inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
	assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItem returns actual item before mouseover");	
	assert.equal(1, afterSelectedItem, "getSelectedItem returns actual item after mouseover");

	expect(7);
});


QUnit.test("getSelectedItem - input with id - click trigger", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	var beforeSelectedItem = $("#inputOne").getSelectedItem();

	//select second element
	$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("click");

	var afterSelectedItem = $("#inputOne").getSelectedItem();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
	assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItem returns actual item before click");	
	assert.equal(1, afterSelectedItem, "getSelectedItem returns actual item after click");

	expect(7);
});

QUnit.test("getSelectedItem - input with id - arrowDown trigger", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	var beforeSelectedItem = $("#inputOne").getSelectedItem();

	//select third element
	e.keyCode = 40; 
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);

	var afterSelectedItem = $("#inputOne").getSelectedItem();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(false, elements.eq(1).hasClass("selected"), "Second element is not selected");
	assert.equal(true, elements.eq(2).hasClass("selected"), "Third element is selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItem returns actual item before click");	
	assert.equal(2, afterSelectedItem, "getSelectedItem returns actual item after click");

	expect(7);
});

QUnit.test("getSelectedItem - input with id - arrowDown/arrowUp mixin", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputOne").val("more").trigger(e);


	var beforeSelectedItem = $("#inputOne").getSelectedItem();

	//select third element
	e.keyCode = 40; 
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);
	$("#inputOne").trigger(e);

	e.keyCode = 38; 
	$("#inputOne").trigger(e);
	

	var afterSelectedItem = $("#inputOne").getSelectedItem();

	//assert
	var elements = $("#inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
	assert.equal(false, elements.eq(1).hasClass("selected"), "Second element is not selected");
	assert.equal(true, elements.eq(2).hasClass("selected"), "Third element is selected");
	assert.equal(false, elements.eq(3).hasClass("selected"), "Fourth element is not selected");
	
	assert.equal(-1, beforeSelectedItem, "getSelectedItem returns actual item before click");	
	assert.equal(2, afterSelectedItem, "getSelectedItem returns actual item after click");

	expect(7);
});

QUnit.test("getSelectedItem - response - on onLoadEvent", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				var beforeSelectedItem = $("#inputOne").getSelectedItem();

				//select first element
				e.keyCode = 40; 
				$("#inputOne").trigger(e);
				$("#inputOne").trigger(e);
				$("#inputOne").trigger(e);
				$("#inputOne").trigger(e);

				e.keyCode = 38; 
				$("#inputOne").trigger(e);
				

				var afterSelectedItem = $("#inputOne").getSelectedItem();

				//assert
				var elements = $("#inputOne").next().find("ul li");

				assert.equal(3, elements.length, "Response size");
				assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
				assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
				assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
				
				assert.equal(-1, beforeSelectedItem, "getSelectedItem returns actual item before click");	
				assert.equal(1, afterSelectedItem, "getSelectedItem returns actual item after click");

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


QUnit.test("getSelectedItem - response - on onSelectItemEvent", function( assert ) {
	
	
	//given
	var completerOne = $("#inputOne").easyAutocomplete({

		url: "resources/colors_string.json",
		
		list: {
			onLoadEvent: function() {
				//trigger select event
				$("#inputOne").next().find("ul li").eq(1).find(" > div").trigger("click");
			},
			onSelectItemEvent: function() {
				
				var afterSelectedItem = $("#inputOne").getSelectedItem();

				//assert
				var elements = $("#inputOne").next().find("ul li");

				assert.equal(3, elements.length, "Response size");
				assert.equal(false, elements.eq(0).hasClass("selected"), "First element is not selected");
				assert.equal(true, elements.eq(1).hasClass("selected"), "Second element is selected");
				assert.equal(false, elements.eq(2).hasClass("selected"), "Third element is not selected");
				
				assert.equal(1, afterSelectedItem, "getSelectedItem returns actual item after click");

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


QUnit.test("getSelectedItem - response - two different easyAutocomplete instances", function( assert ) {
	
	
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
				
				assert.equal(1, $("#inputOne").getSelectedItem(), "getSelectedItem from #inputOne");
				assert.equal(2, $(".inputOne").getSelectedItem(), "getSelectedItem .inputOne");

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


QUnit.test("getSelectedItem should work with categories", function( assert ) {
	
	
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
					
					assert.equal(8, $("#inputOne").getSelectedItem(), "second fruit selected");

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