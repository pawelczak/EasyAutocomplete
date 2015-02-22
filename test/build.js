


QUnit.test( "Build tests", function( assert ) {

	//given
	var compliter = new Compliter($("#compliter"), {url: "test.json"});

	var Consts = compliter.getConstants();


	//execute
	compliter.init();
	var field = document.getElementById("compliter"),
		parent = field.parentNode,
		container = field.nextSibling;

	//assert
	assert.equal("DIV", parent.nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parent.className, "Parent class");

	assert.equal("DIV", container.nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), container.className, "Container class");
});

/*
QUnit.test( "Response", function( assert ) {

	//given
	var compliter = new Compliter($("#compliter"), {url: "colors.json"});


	//execute
	compliter.init();
	var field = document.getElementById("compliter"),
		parent = field.parentNode,
		container = field.nextSibling;

	//assert
	assert.equal("DIV", parent.nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parent.className, "Parent class");

	assert.equal("DIV", container.nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), container.className, "Container class");

});
*/