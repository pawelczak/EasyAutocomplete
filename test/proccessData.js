 /*
 * ProccessData unit tests
 *
 * @author Łukasz Pawełczak
 *
 */
QUnit.test("Sort - sorting simple list", function( assert ) {
	expect(5);
	
	//given
	var options = {
			list: {
				sort: {
					enabled: true,
				}
			}
		},
		unsortedList = ["abba", "aaba", "red", "pink"],
		expectedList = ["aaba", "abba", "pink", "red"],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder);


	//assert
	assert.equal(4, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0], actuaList[0], "Passed - equal first");
	assert.equal(expectedList[1], actuaList[1], "Passed - equal second");
	assert.equal(expectedList[2], actuaList[2], "Passed - equal third");
	assert.equal(expectedList[3], actuaList[3], "Passed - equal fourth");
});

QUnit.test("Sort - sorting - data with numbers", function( assert ) {
	expect(5);
	
	//given
	var options = {
			list: {
				sort: {
					enabled: true,
				}
			}
		},
		unsortedList = ["ab12ba", "aaba", "red333", "44pink"],
		expectedList = ["44pink", "aaba", "ab12ba", "red333"],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;

	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder);


	//assert
	assert.equal(4, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0], actuaList[0], "Passed - equal first");
	assert.equal(expectedList[1], actuaList[1], "Passed - equal second");
	assert.equal(expectedList[2], actuaList[2], "Passed - equal third");
	assert.equal(expectedList[3], actuaList[3], "Passed - equal fourth");
});

QUnit.test("Sort - reverse simple list", function( assert ) {
	expect(5);
	
	//given
	var options = {
			list: {
				sort: {
					enabled: true,
					method:  function(a, b) {
						//Reverse alphabeticall sort
						if (a < b) {
							return 1;
						}
						if (a > b) {
							return -1;
						}
						return 0;
					}
				}
			}
		},
		unsortedList = ["abba", "aaba", "red", "pink"],
		expectedList = ["red", "pink", "abba", "aaba"],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder);


	//assert
	assert.equal(4, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0], actuaList[0], "Passed - equal first");
	assert.equal(expectedList[1], actuaList[1], "Passed - equal second");
	assert.equal(expectedList[2], actuaList[2], "Passed - equal third");
	assert.equal(expectedList[3], actuaList[3], "Passed - equal fourth");
});

QUnit.test("MaxSize - simple list", function( assert ) {
	expect(3);
	
	//given
	var options = {
			list: {
				maxNumberOfElements: 2
			}
		},
		unsortedList = ["fiat", "alfa romeo", "lancia"],
		expectedList = ["fiat", "alfa romeo"],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;
	listBuilder.maxNumberOfElements = options.list.maxNumberOfElements;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder);


	//assert
	assert.equal(2, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0], actuaList[0], "Passed - equal first");
	assert.equal(expectedList[1], actuaList[1], "Passed - equal second");
});

QUnit.test("MaxSize & Sort - simple list", function( assert ) {
	expect(3);
	
	//given
	var options = {
			list: {
				sort: {
					enabled: true,
				},
				maxNumberOfElements: 2
			}
		},
		unsortedList = ["fiat", "alfa romeo", "lancia"],
		expectedList = ["alfa romeo", "fiat"],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;
	listBuilder.maxNumberOfElements = options.list.maxNumberOfElements;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder);


	//assert
	assert.equal(2, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0], actuaList[0], "Passed - equal first");
	assert.equal(expectedList[1], actuaList[1], "Passed - equal second");
});

QUnit.test("match - simple list", function( assert ) {
	expect(3);
	
	//given
	var options = {
			list: {
				match: {
					enabled: true
				}
			}
		},
		unsortedList = ["hi-man", "hulk", "batman", "flash"],
		expectedList = ["hi-man", "batman"],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder, "man");


	//assert
	assert.equal(2, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0], actuaList[0], "Passed - equal first");
	assert.equal(expectedList[1], actuaList[1], "Passed - equal second");
});

QUnit.test("match - simple list", function( assert ) {
	expect(2);
	
	//given
	var options = {
			list: {
				match: {
					enabled: true
				}
			}
		},
		unsortedList = ["batman i robin", "hulk", "romeo i julia", "makaron"],
		expectedList = ["batman i robin"],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder, "man");


	//assert
	assert.equal(1, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0], actuaList[0], "Passed - equal first");

});

QUnit.test("match - simple list - suggestions should start with phrase", function( assert ) {
	expect(3);
	
	//given
	var options = {
			list: {
				match: {
					enabled: true,
					method: function(element, phrase) {
						if(element.indexOf(phrase) === 0) {
							return true;
						} else {
							return false;
						}
					}
				}
			}
		},
		unsortedList = ["lion", "wolf", "dolphin", "leopard"],
		expectedList = ["lion", "leopard"],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder, "l");


	//assert
	assert.equal(2, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0], actuaList[0], "Passed - equal first");
	assert.equal(expectedList[1], actuaList[1], "Passed - equal second");

});

QUnit.test("Sort - Object", function( assert ) {
	expect(5);
	
	//given
	var options = {
			getValue: function(element) {
				return element.name;
			},
			list: {
				sort: {
					enabled: true,
					method: function(a, b) {
						var a = options.getValue(a),
							b = options.getValue(b);

						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				}
			}
		},
		unsortedList = [{name: "red"}, {name: "green"}, {name: "blue"}, {name: "pink"}],
		expectedList = [{name: "blue"}, {name: "green"}, {name: "pink"}, {name: "red"}],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};

	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder);

	//assert
	assert.equal(4, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0].name, actuaList[0].name, "Passed - equal first");
	assert.equal(expectedList[1].name, actuaList[1].name, "Passed - equal second");
	assert.equal(expectedList[2].name, actuaList[2].name, "Passed - equal third");
	assert.equal(expectedList[3].name, actuaList[3].name, "Passed - equal fourth");
});


QUnit.test("Sort - Json", function( assert ) {
	expect(5);
	
	//given
	var options = {
			getValue: function(element) {
				return element.name;
			},
			list: {
				sort: {
					enabled: true,
					method: function(a, b) {
						var a = options.getValue(a),
							b = options.getValue(b);

						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				}
			}
		},
		unsortedList = [{"name": "red"}, {"name": "green"}, {"name": "blue"}, {"name": "pink"}],
		expectedList = [{"name": "blue"}, {"name": "green"}, {"name": "pink"}, {"name": "red"}],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};
		
	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder);

	//assert
	assert.equal(4, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0].name, actuaList[0].name, "Passed - equal first");
	assert.equal(expectedList[1].name, actuaList[1].name, "Passed - equal second");
	assert.equal(expectedList[2].name, actuaList[2].name, "Passed - equal third");
	assert.equal(expectedList[3].name, actuaList[3].name, "Passed - equal fourth");
});

QUnit.test("Sort & Max size - Json", function( assert ) {
	expect(4);
	
	//given
	var options = {
			getValue: function(element) {
				return element.car;
			},
			list: {
				maxNumberOfElements: 3,
				sort: {
					enabled: true,
					method: function(a, b) {
						var a = options.getValue(a),
							b = options.getValue(b);

						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				}
			}
		},
		unsortedList = [{"car": "mercedes"}, {"car": "volkswagen"}, {"car": "bmw"}, {"car": "opel"}, {"car": "audi"}],
		expectedList = [{"car": "audi"}, {"car": "bmw"}, {"car": "mercedes"}],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};
		
	listBuilder.data = unsortedList;
	listBuilder.maxNumberOfElements = options.list.maxNumberOfElements;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder);

	//assert
	assert.equal(3, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0].name, actuaList[0].name, "Passed - equal first");
	assert.equal(expectedList[1].name, actuaList[1].name, "Passed - equal second");
	assert.equal(expectedList[2].name, actuaList[2].name, "Passed - equal third");
});


QUnit.test("match - Json", function( assert ) {
	expect(3);
	
	//given
	var options = {
			getValue: function(element) {
				return element.name;
			},
			list: {
				match: {
					enabled: true
				}
			}
		},
		unsortedList = [{"name": "thick"}, {"name": "batman i robin"}, {"name": "wolverine"}, {"name": "spiderman"}],
		expectedList = [{"name": "batman i robin"}, {"name": "spiderman"}],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};
		
	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder, "man");

	//assert
	assert.equal(2, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0].name, actuaList[0].name, "Passed - equal first");
	assert.equal(expectedList[1].name, actuaList[1].name, "Passed - equal second");
});

QUnit.test("match & Sorting- Json", function( assert ) {
	expect(5);
	
	//given
	var options = {
			getValue: function(element) {
				return element.name;
			},
			list: {
				match: {
					enabled: true
				},
				sort: {
					enabled: true,
					method: function(a, b) {
						var a = a.power,
							b = b.power;

						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				}
			}
		},
		unsortedList = [{"name": "thick", "power": "3"}, {"name": "batman i robin", "power": "5"}, {"name": "wolverine", "power": "4"}, {"name": "spiderman", "power": "4"}],
		expectedList = [{"name": "spiderman", "power": "4"}, {"name": "batman i robin", "power": "5"}],

		config = new EasyAutocomplete.Configuration(options),

		listBuilder = {};
		
	listBuilder.data = unsortedList;


	//execute
	var actuaList = EasyAutocomplete.proccess(config, listBuilder, "man");


	//assert
	assert.equal(2, actuaList.length, "Passed - list size");
	assert.equal(expectedList[0].name, actuaList[0].name, "Passed - first name equal");
	assert.equal(expectedList[0].power, actuaList[0].power, "Passed - first power equal");
	assert.equal(expectedList[1].name, actuaList[1].name, "Passed - second name equal");
	assert.equal(expectedList[1].power, actuaList[1].power, "Passed - second power equal");
});
