/*
 * Tests for Template module - EasyAutocomplete 
 *
 * @author Łukasz Pawełczak
 */

QUnit.test('Template - module', function (assert) {

	// when
	var Template = new EasyAutocomplete.Template();


	// then
	assert.ok(typeof EasyAutocomplete.Template === 'function', 'Constructor found');
	assert.ok(Template, 'Constructor');
	assert.ok(typeof Template === 'object', 'created object');
	assert.ok(typeof Template.build === 'function', 'Template has method build');
	assert.ok(Template.getTemplateClass() === '', 'css class');
});


QUnit.test('Template - default template', function (assert) {

	// given
	var options = {},
		expctedBuildMethod = (function (element) {
			return element;
		}).toString().replace(/\t/g, '').replace(/\n/g, '').replace(/\s{2}/g, ' ');


	// when
	var Template = new EasyAutocomplete.Template(options);

	// then
	assert.ok(typeof Template.build === 'function', 'Build is function');
	assert.ok(Template.build('suggestion') === 'suggestion', 'Build returns value');
	assert.ok(Template.build.toString().replace(/\t/g, '').replace(/\n/g, '').replace(/\s{2}/g, ' ') === expctedBuildMethod, 'Build equals def value');


});


QUnit.test('Template - description template - field string', function (assert) {


	// given
	var options = {type: 'description', fields: {description: 'description'}};


	// when
	var template = new EasyAutocomplete.Template(options);


	// then
	assert.ok(typeof template.build === 'function', 'Build is function');
	assert.ok(template.build('bruce', {description: 'willis'}) === 'bruce - <span>willis</span>', 'Build returns value');
	assert.ok(template.getTemplateClass() === 'eac-description', 'css class');
	// then.ok(template.build.toString() === 'function (element) {	return element + " - description"; }', "Build equals def value");

});

QUnit.test('Template - description template - field function', function (assert) {


	// given
	var options = {
		type: 'description', fields: {
			description: function (element) {
				return element['description'];
			}
		}
	};


	// when
	var template = new EasyAutocomplete.Template(options);


	// then
	assert.ok(typeof template.build == 'function', 'Build is function');
	assert.ok(template.build('bruce', {description: 'willis'}) === 'bruce - <span>willis</span>', 'Build returns value');
	assert.ok(template.getTemplateClass() === 'eac-description', 'css class');


});

QUnit.test('Template - iconLeft template - field string', function (assert) {


	// given
	var options = {type: 'iconLeft', fields: {iconSrc: 'iconSrc'}};


	// when
	var template = new EasyAutocomplete.Template(options);


	// then
	assert.ok(typeof template.build == 'function', 'Build is function');
	assert.ok(template.build('Brad Pitt',
		{iconSrc: 'http://easyautocomplete.com/icon/pitt.jpg'}) === '<img class=\'eac-icon\' src=\'http://easyautocomplete.com/icon/pitt.jpg\' />Brad Pitt',
		'Build returns value');
	assert.ok(template.getTemplateClass() === 'eac-icon-left', 'css class');

});

QUnit.test('Template - iconLeft template - field function', function (assert) {


	// given
	var options = {
		type: 'iconLeft', fields: {
			iconSrc: function (element) {
				return element['iconSrc'];
			}
		}
	};


	// when
	var template = new EasyAutocomplete.Template(options);


	// then
	assert.ok(typeof template.build == 'function', 'Build is function');
	assert.ok(template.build('Brad Pitt',
		{iconSrc: 'http://easyautocomplete.com/icon/pitt.jpg'}) === '<img class=\'eac-icon\' src=\'http://easyautocomplete.com/icon/pitt.jpg\' />Brad Pitt',
		'Build returns value');
	assert.ok(template.getTemplateClass() === 'eac-icon-left', 'css class');

});

QUnit.test('Template - iconRight template - field string', function (assert) {


	// given
	var options = {type: 'iconRight', fields: {iconSrc: 'iconSrc'}};


	// when
	var template = new EasyAutocomplete.Template(options);


	// then
	assert.ok(typeof template.build == 'function', 'Build is function');
	assert.ok(template.build('Matt', {iconSrc: 'http://Damon.com'}) === 'Matt<img class=\'eac-icon\' src=\'http://Damon.com\' />', 'Build returns value');
	assert.ok(template.getTemplateClass() === 'eac-icon-right', 'css class');

});

QUnit.test('Template - iconRight template - field function', function (assert) {


	// given
	var options = {
		type: 'iconRight', fields: {
			iconSrc: function (element) {
				return element['iconSrc'];
			}
		}
	};


	// when
	var template = new EasyAutocomplete.Template(options);


	// then
	assert.ok(typeof template.build == 'function', 'Build is function');
	assert.ok(template.build('Matt', {iconSrc: 'http://Damon.com'}) === 'Matt<img class=\'eac-icon\' src=\'http://Damon.com\' />', 'Build returns value');
	assert.ok(template.getTemplateClass() === 'eac-icon-right', 'css class');

});

QUnit.test('Template - links template - field string', function (assert) {


	// given
	var options = {type: 'links', fields: {link: 'website_link'}};


	// when
	var template = new EasyAutocomplete.Template(options);


	// then
	assert.ok(typeof template.build == 'function', 'Build is function');
	assert.ok(template.build('EasyAutocomplete website',
		{website_link: 'http://easyautocomplete.com'}) === '<a href=\'http://easyautocomplete.com\' >EasyAutocomplete website</a>', 'Build returns value');
	assert.ok(template.getTemplateClass() === '', 'css class');

});


QUnit.test('Template - links template - field function', function (assert) {


	// given
	var options = {
		type: 'links', fields: {
			link: function (element) {
				return element['website_link'];
			}
		}
	};


	// when
	var template = new EasyAutocomplete.Template(options);


	// then
	assert.ok(typeof template.build === 'function', 'Build is function');
	assert.ok(template.build('EasyAutocomplete website',
		{website_link: 'http://easyautocomplete.com'}) === '<a href=\'http://easyautocomplete.com\' >EasyAutocomplete website</a>', 'Build returns value');
	assert.ok(template.getTemplateClass() === '', 'css class');

});


QUnit.test('Template - custom template', function (assert) {

	// given
	var options = {
		type: 'custom', method: function () {
		}
	};

	// when
	var template = new EasyAutocomplete.Template(options);

	// then
	assert.ok(typeof template.build === 'function', 'Build is function');
	// assert.ok(template.build.toString() === 'function () {}', 'Build equals def value');
	assert.ok(template.getTemplateClass() === '', 'css class');

});


QUnit.test('Template - cssClass description', function (assert) {

	// given
	var options = {
		type: 'description', fields: {description: 'description'}, method: function () {
		}
	};

	// when
	var template = new EasyAutocomplete.Template(options);

	// then
	assert.ok(typeof template.getTemplateClass === 'function', 'Build is function');
	assert.ok(template.getTemplateClass() === 'eac-description', 'Build equals def value');

});


