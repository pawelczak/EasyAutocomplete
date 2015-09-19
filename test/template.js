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

QUnit.test("Template - iconLeft template", function( assert ) {
	

	//given
	var	options = {type: "iconLeft", fields: {iconSrc: "iconSrc"}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("Brad Pitt", {iconSrc: "http://easyautocomplete.com/icon/pitt.jpg"}) === "<img class='eac-icon' src='http://easyautocomplete.com/icon/pitt.jpg' />Brad Pitt", "Build returns value");	
	expect(2);
});

QUnit.test("Template - iconRight template", function( assert ) {
	

	//given
	var	options = {type: "iconRight", fields: {iconSrc: "iconSrc"}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("Matt", {iconSrc: "http://Damon.com"}) === "Matt<img class='eac-icon' src='http://Damon.com' />", "Build returns value");	
	expect(2);
});

QUnit.test("Template - links template", function( assert ) {
	

	//given
	var	options = {type: "links", fields: {link: "website_link"}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("EasyAutocomplete website", {website_link: "http://easyautocomplete.com"}) === "<a href='http://easyautocomplete.com' >EasyAutocomplete website</a>", "Build returns value");	
	expect(2);
});


QUnit.test("Template - links template", function( assert ) {
	

	//given
	var	options = {type: "links", fields: {link: "website_link"}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("EasyAutocomplete website", {website_link: "http://easyautocomplete.com"}) === "<a href='http://easyautocomplete.com' >EasyAutocomplete website</a>", "Build returns value");	
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


