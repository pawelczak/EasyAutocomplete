/*
 * Tests for ListBuilder module - EasyAutocomplete 
 *
 * @author Łukasz Pawełczak
 */
QUnit.test('ListBuilder', function (assert) {


	// when
	var ListBuilderService = new EasyAutocomplete.ListBuilderService();


	// then
	assert.ok(typeof EasyAutocomplete.ListBuilderService === 'function', 'Constructor found');
	assert.ok(ListBuilderService, 'Constructor');
	assert.ok(typeof ListBuilderService === 'object', 'created object');
	assert.ok(typeof ListBuilderService.init === 'function', 'ListBuilderService has method init');
	assert.ok(typeof ListBuilderService.updateCategories === 'function', 'ListBuilderService has method updateCategories');
	assert.ok(typeof ListBuilderService.convertXml === 'function', 'ListBuilderService has method convertXml');
	assert.ok(typeof ListBuilderService.processData === 'function', 'ListBuilderService has method processData');
	assert.ok(typeof ListBuilderService.checkIfDataExists === 'function', 'ListBuilderService has method checkIfDataExists');

});


QUnit.test('ListBuilder - init', function (assert) {

	// given
	var data = {};

	var configuration = {

		get: function (property) {

			switch (property) {

				case 'listLocation':
					return function (arg) {
						return data;
					};
					break;

				case 'getValue':
					return function (foo) {
						return 'bar'
					};
					break;

				case 'list':
					return {
						maxNumberOfElements: function () {
							return 3
						}
					};
					break;

				default:
					break;
			}
		}

	};


	// when
	var ListBuilderService = new EasyAutocomplete.ListBuilderService(configuration);

	var listBuilders = ListBuilderService.init(data);

	// then
	assert.ok(listBuilders.length === 1, 'ListBuilder - size');
	assert.ok(listBuilders[0].data === data, 'ListBuilder - data match');
	assert.ok(listBuilders[0].getValue.toString() == configuration.get('getValue').toString(), 'ListBuilder - getValue function match');

});


QUnit.test('ListBuilder - checkIfDataExists - empty listBuilders', function (assert) {

	// given
	var configuration = {},
		listBuilders = [{}];


	// when
	var ListBuilderService = new EasyAutocomplete.ListBuilderService(configuration);

	var flag = ListBuilderService.checkIfDataExists(listBuilders);

	// then
	assert.ok(flag === false, 'checkIfDataExists');
	;
});

QUnit.test('ListBuilder - checkIfDataExists - listBuilders.data not array', function (assert) {

	// given
	var configuration = {},
		listBuilders = [{
			data: 1
		}];


	// when
	var ListBuilderService = new EasyAutocomplete.ListBuilderService(configuration);

	var flag = ListBuilderService.checkIfDataExists(listBuilders);

	// then
	assert.ok(flag === false, 'checkIfDataExists');
	;
});

QUnit.test('ListBuilder - checkIfDataExists - listBuilders.data array', function (assert) {

	// given
	var configuration = {},
		listBuilders = [{
			data: [1, 2]
		}];


	// when
	var ListBuilderService = new EasyAutocomplete.ListBuilderService(configuration);

	var flag = ListBuilderService.checkIfDataExists(listBuilders);

	// then
	assert.ok(flag === true, 'checkIfDataExists');
	;
});

/*
QUnit.test("ListBuilder - convertXml", function( assert ) {

	// given
	var data = {};

	var configuration = {

		dataType: "xml",

		get: function(property) {

			switch(property) {

				case "listLocation":
					return function(arg) {
						return data;
					}
				break;

				case "getValue": 
					return function(foo) {return "bar"};
				break;

				default:
				break;
			};
		}
		
	};

	var listBuilders = {};


	// when
	var ListBuilderService = new EasyAutocomplete.ListBuilderService(configuration);

	//var listBuilders = ListBuilderService.init(data);




	// then
	assert.ok(listBuilders.length === 1, "ListBuilder - size");
	assert.ok(listBuilders[0].data === data, "ListBuilder - data match");
	assert.ok(listBuilders[0].getValue.toString() == configuration.get("getValue").toString(), "ListBuilder - getValue function match");
	
});
*/
