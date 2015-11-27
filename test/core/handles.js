/*
 * Tests EasyAutocomplete - handles
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("Handles should generate id and it should be possible to use it with functions", function( assert ) {
	
	
	//given
	$(".input-no-id").attr("id", "");

	var completerOne = $(".input-no-id").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],

		list: {

			match: {
				enabled: true
			}
		}
		
	});

	

	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$(".input-no-id").val("a").trigger(e);
	
	//trigger select event
	var key = $.Event('keyup');
	key.keyCode = 40; 
	$(".input-no-id").trigger(key);

	//assert
	var id = $(".input-no-id").attr("id");

	var $inputNoId = $("#" + id);
	
	assert.ok(id.length > 0, "input field has id");
	assert.equal($inputNoId.getSelectedItemIndex(), 0, "getSelectedItemIndex passed");
	assert.equal($inputNoId.getSelectedItemData(), "black", "getSelectedItemData passed");
	assert.equal($inputNoId.getItemData(1), "magenta", "getItemData passed");

	expect(4);
});


QUnit.test("It should be possible to invoke plugin on element found whith class selector and use its id to with functions", function( assert ) {

	//given
	var completerOne = $(".input-with-id").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],

		list: {

			match: {
				enabled: true
			}
		}
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$("#input-with-id").val("a").trigger(e);
	
	//trigger select event
	var key = $.Event('keyup');
	key.keyCode = 40; 
	$("#input-with-id").trigger(key);

	//assert
	var $inputWithId = $("#input-with-id");
	
	assert.equal($inputWithId.getSelectedItemIndex(), 0, "getSelectedItemIndex passed");
	assert.equal($inputWithId.getSelectedItemData(), "black", "getSelectedItemData passed");
	assert.equal($inputWithId.getItemData(1), "magenta", "getItemData passed");

	expect(3);
});

QUnit.test("It should be possible to invoke plugin on couple of element found whith class selector and use its id to with functions", function( assert ) {

	//given
	//invoked on two elements #inputOne and #inputTwo
	var completerOne = $(".input").easyAutocomplete({

		data: ["black", "white", "magenta", "yellow"],

		list: {

			match: {
				enabled: true
			}
		}
		
	});


	//execute
	var e = $.Event('keyup');
	e.keyCode = 50; 
	$(".input").val("a").trigger(e);
	
	//trigger select event
	var key = $.Event('keyup');
	key.keyCode = 40; 
	$(".input").trigger(key);

	//assert
	var $inputOne = $("#inputOne"),
		$inputTwo = $("#inputTwo");
	
	assert.equal($inputOne.getSelectedItemIndex(), 0, "getSelectedItemIndex passed");
	assert.equal($inputOne.getSelectedItemData(), "black", "getSelectedItemData passed");
	assert.equal($inputOne.getItemData(1), "magenta", "getItemData passed");

	assert.equal($inputTwo.getSelectedItemIndex(), 0, "getSelectedItemIndex passed");
	assert.equal($inputTwo.getSelectedItemData(), "black", "getSelectedItemData passed");
	assert.equal($inputTwo.getItemData(1), "magenta", "getItemData passed");

	expect(6);
});

