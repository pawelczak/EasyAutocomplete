/*
 * Tests for Template module - EasyAutocomplete 
 *
 * @author Łukasz Pawełczak
 */

QUnit.test("Template - module", function( assert ) {

	//execute
	var Template = new EasyAutocomplete.Template();


	//assert
	assert.ok(typeof EasyAutocomplete.Template === "function", "Constructor found");
	assert.ok(Template, "Constructor");
	assert.ok(typeof Template === "object", "created object");
	assert.ok(typeof Template.build === "function", "Template has method build");
});


QUnit.test("Template - default template", function( assert ) {

	//given
	var options = {};


	//execute
	var Template = new EasyAutocomplete.Template(options);

	//assert
	assert.ok(typeof Template.build == "function", "Build is function");
	assert.ok(Template.build("suggestion") === "suggestion", "Build returns value");	
	assert.ok(Template.build.toString() === 'function (element) { return element; }', "Build equals def value");
	
	expect(3);
});


QUnit.test("Template - description template", function( assert ) {
	

	//given
	var	options = {type: "description", fields: {description: "description"}};


	//execute
	var template = new EasyAutocomplete.Template(options);
		

	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("bruce", {description: "willis"}) === "bruce - <span>willis</span>", "Build returns value");	
	//assert.ok(template.build.toString() === 'function (element) {	return element + " - description"; }', "Build equals def value");
	expect(2);
});


QUnit.test("Template - custom template", function( assert ) {
	

	//given
	var	options = {type: "custom", method: function() {}};


	//execute
	var template = new EasyAutocomplete.Template(options);
				

	//assert
	assert.ok(typeof template.build === "function", "Build is function");
	assert.ok(template.build.toString() === 'function () {}', "Build equals def value");
	expect(2);
});





QUnit.test("Template - cssClass description", function( assert ) {
	

	//given
	var	options = {type: "description", method: function() {}};


	//execute
	var template = new EasyAutocomplete.Template(options);
				
	//assert
	assert.ok(typeof template.getTemplateClass === "function", "Build is function");
	assert.ok(template.getTemplateClass() === 'eac-description', "Build equals def value");
	expect(2);
});


