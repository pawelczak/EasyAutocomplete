/*
 * Tests EasyAutocomplete - plugin
 *
 * @author Łukasz Pawełczak
 */
QUnit.test( "JQuery method exists", function( assert ) {


	//assert
	assert.ok($.fn.easyAutocomplete, "Method $.easyAutocomplete exists");
	assert.ok($.fn.getSelectedItemIndex, "Method $.getSelectedItemIndex exists");
	assert.ok($.fn.getItemData, "Method $.getItemData exists");
	assert.ok($.fn.getSelectedItemData, "Method $.getSelectedItemData exists");
	expect(4);
});


QUnit.test("Input field has no id property", function( assert ) {
	
	
	//given
	$(".inputOne").attr("id", "");

	var completerOne = $(".inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$(".inputOne").val("a").trigger(e);

	//assert
	var elements = $(".inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("black", elements.eq(0).text(), "First element is 'black'");
	assert.equal("white", elements.eq(1).text(), "Second element is 'white'");
	assert.equal("magenta", elements.eq(2).text(), "Third element is 'magenta'");
	assert.equal("yellow", elements.eq(3).text(), "Fourth element is 'yellow'");

	assert.ok($(".inputOne").attr("id").length > 0, "id is defined");	

	expect(6);
});

QUnit.test("Invoke plugin function on input that is dynamically added", function( assert ) {
	
	
	//given

	//create text field
	var $dynamicInput = $("<input type='text' />").attr("id", "inputThree");

	$(".inputOne").after($dynamicInput);

	var completerOne = $("#inputThree").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputThree").val("more").trigger(e);

	//assert
	var elements = $("#inputThree").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("black", elements.eq(0).text(), "First element is 'black'");
	assert.equal("white", elements.eq(1).text(), "Second element is 'white'");
	assert.equal("magenta", elements.eq(2).text(), "Third element is 'magenta'");
	assert.equal("yellow", elements.eq(3).text(), "Fourth element is 'yellow'");

	expect(5);
});

QUnit.test(".easyAutocomplete function should return jQuery object", function( assert ) {
	
	
	//given
	$("#inputThree").attr("justice", "");


	//execute
	var completerOne = $("#inputThree").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],

		list: {

			match: {
				enabled: true
			}
		}
		
	})
	.attr("justice", "beaver");

	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#inputThree").val("a").trigger(e);

	//assert
	var elements = $("#inputThree").next().find("ul li");

	assert.equal("beaver", $("#inputThree").attr("justice"), "Setted attribute.");
	assert.equal(2, elements.length, "Response size");
	assert.equal("black", elements.eq(0).text(), "First element is 'black'");
	assert.equal("magenta", elements.eq(1).text(), "Second element is 'magenta'");

	expect(4);
});



