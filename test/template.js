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
	assert.ok(Template.getTemplateClass() === '', "css class");
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


QUnit.test("Template - description template - field string", function( assert ) {
	

	//given
	var	options = {type: "description", fields: {description: "description"}};


	//execute
	var template = new EasyAutocomplete.Template(options);
		

	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("bruce", {description: "willis"}) === "bruce - <span>willis</span>", "Build returns value");
	assert.ok(template.getTemplateClass() === 'eac-description', "css class");	
	//assert.ok(template.build.toString() === 'function (element) {	return element + " - description"; }', "Build equals def value");
	expect(3);
});

QUnit.test("Template - description template - field function", function( assert ) {
	

	//given
	var	options = {type: "description", fields: {description: function(element) {return element["description"];}}};


	//execute
	var template = new EasyAutocomplete.Template(options);
		

	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("bruce", {description: "willis"}) === "bruce - <span>willis</span>", "Build returns value");
	assert.ok(template.getTemplateClass() === 'eac-description', "css class");	

	expect(3);
});

QUnit.test("Template - iconLeft template - field string", function( assert ) {
	

	//given
	var	options = {type: "iconLeft", fields: {iconSrc: "iconSrc"}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("Brad Pitt", {iconSrc: "http://easyautocomplete.com/icon/pitt.jpg"}) === "<img class='eac-icon' src='http://easyautocomplete.com/icon/pitt.jpg' />Brad Pitt", "Build returns value");	
	assert.ok(template.getTemplateClass() === 'eac-icon-left', "css class");
	expect(3);
});

QUnit.test("Template - iconLeft template - field function", function( assert ) {
	

	//given
	var	options = {type: "iconLeft", fields: {iconSrc: function(element) {return element["iconSrc"];}}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("Brad Pitt", {iconSrc: "http://easyautocomplete.com/icon/pitt.jpg"}) === "<img class='eac-icon' src='http://easyautocomplete.com/icon/pitt.jpg' />Brad Pitt", "Build returns value");	
	assert.ok(template.getTemplateClass() === 'eac-icon-left', "css class");
	expect(3);
});

QUnit.test("Template - iconRight template - field string", function( assert ) {
	

	//given
	var	options = {type: "iconRight", fields: {iconSrc: "iconSrc"}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("Matt", {iconSrc: "http://Damon.com"}) === "Matt<img class='eac-icon' src='http://Damon.com' />", "Build returns value");	
	assert.ok(template.getTemplateClass() === 'eac-icon-right', "css class");
	expect(3);
});

QUnit.test("Template - iconRight template - field function", function( assert ) {
	

	//given
	var	options = {type: "iconRight", fields: {iconSrc: function(element) {return element["iconSrc"];}}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("Matt", {iconSrc: "http://Damon.com"}) === "Matt<img class='eac-icon' src='http://Damon.com' />", "Build returns value");	
	assert.ok(template.getTemplateClass() === 'eac-icon-right', "css class");
	expect(3);
});

QUnit.test("Template - links template - field string", function( assert ) {
	

	//given
	var	options = {type: "links", fields: {link: "website_link"}};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("EasyAutocomplete website", {website_link: "http://easyautocomplete.com"}) === "<a href='http://easyautocomplete.com' >EasyAutocomplete website</a>", "Build returns value");	
	assert.ok(template.getTemplateClass() === '', "css class");
	expect(3);
});


QUnit.test("Template - links template - field function", function( assert ) {
	

	//given
	var	options = {type: "links", fields: {link: function(element) {return element["website_link"];} }};


	//execute
	var template = new EasyAutocomplete.Template(options);


	//assert
	assert.ok(typeof template.build == "function", "Build is function");
	assert.ok(template.build("EasyAutocomplete website", {website_link: "http://easyautocomplete.com"}) === "<a href='http://easyautocomplete.com' >EasyAutocomplete website</a>", "Build returns value");	
	assert.ok(template.getTemplateClass() === '', "css class");
	expect(3);
});


QUnit.test("Template - custom template", function( assert ) {
	

	//given
	var	options = {type: "custom", method: function() {}};


	//execute
	var template = new EasyAutocomplete.Template(options);
				

	//assert
	assert.ok(typeof template.build === "function", "Build is function");
	assert.ok(template.build.toString() === 'function () {}', "Build equals def value");
	assert.ok(template.getTemplateClass() === '', "css class");
	expect(3);
});


QUnit.test("Template - cssClass description", function( assert ) {
	

	//given
	var	options = {type: "description", fields: {description: "description"}, method: function() {}};


	//execute
	var template = new EasyAutocomplete.Template(options);
				
	//assert
	assert.ok(typeof template.getTemplateClass === "function", "Build is function");
	assert.ok(template.getTemplateClass() === 'eac-description', "Build equals def value");
	expect(2);
});


