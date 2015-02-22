


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
	assert.equal("UL", container.childNodes[0].nodeName, "Container list tag type");
});

QUnit.test( "Build compliter twice on same element", function( assert ) {

	//given
	var compliter = new Compliter($("#compliter"), {url: "test.json"});
	var compliter = new Compliter($("#compliter"), {url: "test2.json"});

	var Consts = compliter.getConstants();

	//execute
	compliter.init();
	var field = document.getElementById("compliter"),
		parent = field.parentNode,
		container = field.nextSibling;

	//assert
	assert.equal("DIV", parent.nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parent.className, "Parent class");
	assert.ok(Consts.getValue("WRAPPER_CSS_CLASS") != parent.parentNode.className, "Parent's parent class not known");

	assert.equal("DIV", container.nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), container.className, "Container class");
	assert.equal("UL", container.childNodes[0].nodeName, "Container list tag type");
	assert.ok(Consts.getValue("CONTAINER_CLASS") != parent.nextSibling.className, "Parent's parent class not known");
});

QUnit.test( "Build compliter twice on different element", function( assert ) {

	//TOOO
	assert.ok("1" == 1, "ok");
	/*
	//given
	var compliter = new Compliter($("#compliter"), {url: "test.json"});
	var compliter = new Compliter($("#compliter2"), {url: "test2.json"});

	var Consts = compliter.getConstants();

	//execute
	compliter.init();
	var field = document.getElementById("compliter"),
		parent = field.parentNode,
		container = field.nextSibling;

	//assert
	assert.equal("DIV", parent.nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parent.className, "Parent class");
	assert.ok(Consts.getValue("WRAPPER_CSS_CLASS") != parent.parentNode.className, "Parent class");

	assert.equal("DIV", container.nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), container.className, "Container class");
	assert.equal("UL", container.childNodes[0].nodeName, "Container list tag type");
	*/
});


QUnit.test( "Response", function( assert ) {

	//TODO
	assert.ok("1" == 1, "ok");

/*
	//given
	var compliter = new Compliter($("#compliter"), {url: "../colors.json", autocompleteOff: false});


	//execute
	compliter.init();
	var field = document.getElementById("compliter"),
		parent = field.parentNode,
		container = field.nextSibling;

	//assert
	/*assert.equal("DIV", parent.nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parent.className, "Parent class");

	assert.equal("DIV", container.nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), container.className, "Container class");
*/
});
