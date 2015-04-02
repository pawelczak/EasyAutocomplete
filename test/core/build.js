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

QUnit.test( "Build tests - no placeholder", function( assert ) {

	//given
	var completer = new EasyAutocomplete.main($("#inputOne"), {url: "test.json"});


	//execute
	completer.init();

	var $field = $("#inputOne");

	//assert
	assert.equal(undefined, $field.attr("placeholder"), "No placeholder");

	expect(1);
});


QUnit.test( "Build tests - placeholder", function( assert ) {

	//given
	var phrase = "search phrase",
		completer = new EasyAutocomplete.main($("#inputTwo"), {url: "test.json", placeholder: phrase});


	//execute
	completer.init();

	var $field = $("#inputTwo");

	//assert
	assert.equal(phrase, $field.attr("placeholder"), "Placeholder Ok");

	expect(1);
});



QUnit.test( "Build tests - color theme", function( assert ) {

	//given
	var cssClass = "blue-light",
		completer = new EasyAutocomplete.main($("#inputOne"), {url: "test.json", theme: cssClass});


	Array.prototype.contains = function(obj) {
		var i = this.length;
	    while (i--) {
	        if (this[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	};

	//execute
	completer.init();

	var $field = $("#inputOne");

	var classes = $field.parent().attr("class").split(" ");

	//assert
	assert.ok(classes.contains("eac-" + cssClass), "Color theme");

	expect(1);
});


QUnit.test( "Build tests - custom classes", function( assert ) {

	//given
	var cssClass = "my custom classes",
		completer = new EasyAutocomplete.main($("#inputTwo"), {url: "test.json", cssClasses: cssClass});


	Array.prototype.contains = function(obj) {
		var i = this.length;
	    while (i--) {
	        if (this[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	};

	//execute
	completer.init();

	var $field = $("#inputTwo");

	var classes = $field.parent().attr("class").split(" ");

	//assert
	assert.ok(classes.contains("my"), "first class");
	assert.ok(classes.contains("custom"), "second css class");
	assert.ok(classes.contains("classes"), "third css class");

	expect(3);
});

QUnit.test( "Build tests - themes & custom classes", function( assert ) {

	//given
	var theme = "blue-light"
		cssClass = "my custom classes",
		completer = new EasyAutocomplete.main($("#inputTwo"), {url: "test.json", theme: theme, cssClasses: cssClass});


	Array.prototype.contains = function(obj) {
		var i = this.length;
	    while (i--) {
	        if (this[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	};

	//execute
	completer.init();

	var $field = $("#inputTwo");

	var classes = $field.parent().attr("class").split(" ");

	//assert
	assert.ok(classes.contains("eac-" + theme), "theme class");
	assert.ok(classes.contains("my"), "first class");
	assert.ok(classes.contains("custom"), "second css class");
	assert.ok(classes.contains("classes"), "third css class");

	expect(4);
});

QUnit.test( "Build tests - wrapper width", function( assert ) {

	//given
	var completer = new EasyAutocomplete.main($("#inputTwo"), {url: "test.json"});

	//execute
	completer.init();

	//assert
	//Doesnt work when not runned in browser
	//assert.equal(169, $("#inputTwo").parent().innerWidth(), "Passes - wrapper width");
	
	expect(0);
});
