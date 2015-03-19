/*
 * EasyAutocomplete - Configuration 
 *
 * @author Łukasz Pawełczak
 */
var EasyAutocomplete = (function(scope){

	scope.Configuration = function Configuration(options) {
		var defaults = {
			data: "list-required",
			url: "list-required",
			dataType: "json",

			xmlElementName: "",

			getValue: function(element) {
				return element;
			},

			autocompleteOff: true,

			placeholder: false,

			ajaxCallback: function() {},

			list: {
				sort: {
					enabled: false,
					method: function(a, b) {
						a = defaults.getValue(a);
						b = defaults.getValue(b);

						//Alphabeticall sort
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					}
				},

				maxNumberOfElements: 6,

				match: {
					enabled: false,
					caseSensitive: false,
					method: function(a, b) {
						a = defaults.getValue(a);
						b = defaults.getValue(b);

						if (a === b){
							return true	
						}  
						return false;
					}
				},

				showAnimation: {
					type: "normal", //normal|slide|fade
					time: 400,
					callback: function() {}
				},

				hideAnimation: {
					type: "normal",
					time: 400,
					callback: function() {}
				},

			},

			highlightPhrase: true,

		};

		prepareDefaults();

		mergeOptions();

		this.get = function(propertyName) {
			return defaults[propertyName];
		}

		this.equals = function(name, value) {
			if (isAssigned(name)) {
				if (defaults[name] === value) {
					return true;
				}
			} 
			
			return false;
		}

		this.checkDataUrlProperties = function() {
			if (defaults.url === "list-required" && defaults.data === "list-required") {
				return false;
			}
			return true;
		}

		//TODO think about better mechanism
		this.checkRequiredProperties = function() {
			for (var propertyName in defaults) {
				if (defaults[propertyName] === "required") {
					logger.error("Option " + propertyName + " must be defined");
					return false;
				}
			}
			return true;
		}


		//------------------------ Prepare defaults --------------------------

		//TODO
		//different defaults are required for xml than json
		function prepareDefaults() {

			if (options.dataType == "xml") {
				
				if (!options.getValue) {

					options.getValue = function(element) {
						return $(element).text();
					}
				}

				
				if (!options.list) {

					options.list = {};
				} 

				if (!options.list.sort) {
					options.list.sort = {}
				}


				options.list.sort.method = function(a, b) {
					a = options.getValue(a);
					b = options.getValue(b);
					
					//Alphabeticall sort
					if (a < b) {
						return -1;
					}
					if (a > b) {
						return 1;
					}
					return 0;
				}

				if (!options.list.match) {
					options.list.match = {};
				}

				options.list.match.method = function(a, b) {
					a = options.getValue(a);
					b = options.getValue(b);

					if (a === b){
						return true	
					}  
					return false;
				}

			}
		}


		//------------------------ LOAD config --------------------------

		function mergeOptions() {

			defaults = mergeObjects(defaults, options);

			function mergeObjects(source, target) {
				var mergedObject = source || {};

				for (var propertyName in source) {
					if (target[propertyName] !== undefined && target[propertyName] !== null) {

						if (typeof target[propertyName] !== "object" || 
								target[propertyName] instanceof Array) {
							mergedObject[propertyName] = target[propertyName];		
						} else {
							mergeObjects(source[propertyName], target[propertyName])
						}
					}
				}
				
				return mergedObject;
			}
		}	

		//TODO check if config has value
		//check (param.name, value)
		//return boolean
		function assign(name) {
			if (defaults[name] !== undefined && defaults[name] !== null) {
				return true;
			} else {
				return false;
			}
		}

		function isAssigned(name) {
			if (defaults[name] !== undefined && defaults[name] !== null) {
				return true;
			} else {
				return false;
			}
		}
	};

	return scope;

})(EasyAutocomplete || {});

