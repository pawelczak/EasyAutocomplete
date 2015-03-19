/*
 * Tests EasyAutocomplete - build eac wrapper
 *
 * @author Łukasz Pawełczak
 */
QUnit.test( "Build tests", function( assert ) {

	//given
	var completer = new EasyAutocomplete.main($("#inputOne"), {url: "test.json"});

	var Consts = completer.getConstants();


	//execute
	completer.init();
	var field = document.getElementById("inputOne"),
		parent = field.parentNode,
		container = field.nextSibling;

	//assert
	assert.equal("off", field.getAttribute("autocomplete"), "Field autocomplete off");

	assert.equal("DIV", parent.nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parent.className, "Parent class");

	assert.equal("DIV", container.nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), container.className, "Container class");
	assert.equal("UL", container.childNodes[0].nodeName, "Container list tag type");
});

QUnit.test( "Build completer twice on same element", function( assert ) {

	//given
	var completer = new EasyAutocomplete.main($("#inputOne"), {url: "test.json"});
	var completer = new EasyAutocomplete.main($("#inputOne"), {url: "test2.json"});

	var Consts = completer.getConstants();

	//execute
	completer.init();
	var field = document.getElementById("inputOne"),
		parent = field.parentNode,
		container = field.nextSibling;

	//assert
	assert.equal("off", field.getAttribute("autocomplete"), "Field autocomplete off");

	assert.equal("DIV", parent.nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parent.className, "Parent class");
	assert.ok(Consts.getValue("WRAPPER_CSS_CLASS") != parent.parentNode.className, "Parent's parent class not known");

	assert.equal("DIV", container.nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), container.className, "Container class");
	assert.equal("UL", container.childNodes[0].nodeName, "Container list tag type");
	assert.ok(Consts.getValue("CONTAINER_CLASS") != parent.nextSibling.className, "Parent's parent class not known");
});

QUnit.test( "Build completer twice on different element", function( assert ) {

	
	//given
	var completerOne = new EasyAutocomplete.main($("#inputOne"), {url: "test.json"});
	var completerTwo = new EasyAutocomplete.main($("#inputTwo"), {url: "test2.json", autocompleteOff: false});

	var Consts = completerOne.getConstants();

	//execute
	completerOne.init();
	completerTwo.init();

	var fields = [],
		parents = [],
		containers = [];


	fields.push(document.getElementById("inputOne"));
	fields.push(document.getElementById("inputTwo"));

	parents.push(fields[0].parentNode);
	parents.push(fields[1].parentNode);

	containers.push(fields[0].nextSibling);
	containers.push(fields[1].nextSibling);


	//assert
	assert.equal("off", fields[0].getAttribute("autocomplete"), "Field autocomplete off");

	assert.equal("DIV", parents[0].nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parents[0].className, "Parent class");

	assert.equal("DIV", containers[0].nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), containers[0].className, "Container class");
	assert.equal("UL", containers[0].childNodes[0].nodeName, "Container list tag type");


	assert.equal(null, fields[1].getAttribute("autocomplete"), "Field autocomplete unassigned");

	assert.equal("DIV", parents[1].nodeName, "Parent tag type");
	assert.equal(Consts.getValue("WRAPPER_CSS_CLASS"), parents[1].className, "Parent class");

	assert.equal("DIV", containers[1].nodeName, "Container tag type");
	assert.equal(Consts.getValue("CONTAINER_CLASS"), containers[1].className, "Container class");
	assert.equal("UL", containers[1].childNodes[0].nodeName, "Container list tag type");
	
});


