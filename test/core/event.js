/*
 * Tests EasyAutocomplete - event
 *
 * @author Łukasz Pawełczak
 */
QUnit.test("Event keypress - Esc keyCode", function( assert ) {
	expect(1);
	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "resources/colors_string.json", ajaxCallback: function() {


			var e = $.Event("keyup", { keyCode: 27 });
			$("inputOne").trigger(e);

			//assert
			
			assertList();
		}
	});


	//execute
	
	completerOne.init();

	$("#inputOne").val("c").trigger("keyup");

	//create event with Esc keyCode



	QUnit.stop();


	//assert

	function assertList() {
		var elements = $("#inputOne").next().find("ul li");

		assert.equal(3, elements.length, "Response size");
		//assert.equal("none", $("#eac-container-inputOne").find("ul").css("display"), "List should be hidden");

		QUnit.start();	
	}
});

