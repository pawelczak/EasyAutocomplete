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
	var completerOne = $(".inputOne").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$(".inputOne").val("more").trigger(e);

	//assert
	var elements = $(".inputOne").next().find("ul li");

	assert.equal(4, elements.length, "Response size");
	assert.equal("black", elements.eq(0).text(), "First element is 'black'");
	assert.equal("white", elements.eq(1).text(), "Second element is 'white'");
	assert.equal("magenta", elements.eq(2).text(), "Third element is 'magenta'");
	assert.equal("yellow", elements.eq(3).text(), "Fourth element is 'yellow'");

	expect(5);
});
