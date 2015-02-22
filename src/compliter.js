
function Compliter($field, options) {
				
	var module = {
			name: "Compliter"
		};

	var constants = Constans(),
		logger = Logger(),
		config = Configuration(options),
		checkParam = config.equals,

		$field = $field, //$(element), //TODO change to input ?? you can only use input here anyway
		$container = "",
		elementsList = [];
		


	//init();

	//return this;

	//Main method
	function init() {

		if (!config.checkRequiredProperties()) {
			logger.error("Will not work without mentioned properties");
			return;
		}

		prepareField();
		bindEvents();	

	}


	//------------------------ PUBLIC METHODS STARTS --------------------------	

	this.build = function() {
		prepareField();
	}

	this.init = function() {
		init();
	}

	//------------------------ PUBLIC METHODS ENDS --------------------------	

	//Binds event handlers
	function bindEvents() {

		bindAllEvents();

		//------------------------ FUNCTIONS --------------------------					
		

		function bindAllEvents() {
			if (checkParam("autocompleteOff", true)) {
				removeAutocomplete();
			}

			bindKeyup();
			bindKeydown();
			bindKeypress();
			bindFocus();
			bindBlur();
		}


		//------------------------ SPECIFIC EVENTS BINDIND --------------------------

		function bindKeyup() {
			$field
			.off("keyup")
			.keyup(function() {
				
				
				

				$.ajax(config.url) 
					.done(function(data) {
						var length = data.length;

						if (length === 0) {
							return;
						}

						elementsList = data;

						//Prepare data to display:
						//- sort 
						//- decrease number to specific number
						//- show only matching data


						//MATCHING
						//TODO ADD inputPhrase
						//Change it to build new array maybe
						/*
						if (config.list.matching.enabled) {
							for(var i = 0; i < length; i += 1) {
								if (data[i].search(inputPhrase) === -1) {
									data.join(data.slice(0, i - 1), data.slice(i + 1, data.length -1));
									length = data.length;
									i--;
								}
							}
						}
						*/


						//SORT
						if (config.list.sort.enabled) {
							data.sort(config.list.sort.method);
						}

						//MAX NUMBER OF ELEMENTS
						if (length > config.list.maxNumberOfElements) {
							data = data.slice(0, config.list.maxNumberOfElements);
							length = data.length;
						}

						
						//TODO change this method
						$container.empty();

						for(var i = 0; i < length; i += 1) {

							//TODO 
							$container.append($("<li>" + config.getValue(data[i]) + "</li>"));





						}

						$container.show();

					})
					.fail(function() {
						logger.warning("Fail to load response data");
					})
					.always(function() {

					});




			});
		}

		function bindKeydown() {
			$field.keydown(function() {
				
			});
		}

		function bindKeypress() {
			$field
			.off("keypress")
			.keypress(function() {
				
			});
		}

		function bindFocus() {
			$field.focus(function() {
				
			});
		}

		function bindBlur() {
			$field.blur(function() {
				
			});
		}

		function removeAutocomplete() {
			$field.attr("autocomplete","off");
		}
	}




	//------------------------ FIELD PREPARATION --------------------------


	//TODO Rebuild this function
	function prepareField() {

		
		var $wrapper = $("<div class='compliter' ></div>");

		var fieldWidth = $field.outerWidth();
		$wrapper.css("width", fieldWidth);

		$field.wrap($wrapper);

		$container = $("<div class='compliter-container' ></div>");

		$container
			.attr("id", getListId())
			.prepend("<ul></ul>");



		$field.after($container);

		$container = $("#" + getListId()).find("ul");




		//Set placeholder for element
		if (config.placeholder !== false) {
			$field.attr("placeholder", config.placeholder);
		}


	}

	//TODO
	function clearPreparedFields() {}


	//------------------------ GETTERS --------------------------

	//Generate unique element id
	function getListId() {
		var elementId = $field.attr("id");

		//TODO has attr
		if (elementId === undefined || elementId === null) {
			elementId = Math.rand(1000000);

			//if element exist $(elementId) reroll
			//if ()
		}

		//TODO CONST
		return constants.CONTAINER_ID + elementId;
	}


	

	this.getConfiguration = function() {

		return config;
	}


	//------------------------ CONFIGURATION --------------------------

	/*
	Loads Configuration for Compliter
	*/
	function Configuration(options) {
		var config = {
			message: "default message",
			autocompleteOff: true,

			url: "required",

			getValue: function(element) {
				return element;
			},

			placeholder: false,

			list: {
				sort: {
					enabled: false,
					method: function(a, b) {
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

				matching: {
					enabled: false,
					method: function(a, b) {
						if (a === b){
							return true	
						}  
						return false;
					}
				},

			},

			highlightPhrase: true,

		};

		mergeOptions();

		config.equals = function(name, value) {
			if (config.isAssigned(name)) {
				if (config[name] === value) {
					return true;
				}
			} 
			
			return false;
		}

		config.isAssigned = function(name) {
			if (config[name] !== undefined && config[name] !== null) {
				return true;
			} else {
				return false;
			}
		}

		//TODO think about better mechanism
		config.checkRequiredProperties = function() {
			for (var propertyName in config) {
				if (config[propertyName] === "required") {
					logger.error("Option " + propertyName + " must be defined");
					return false;
				}
			}
			return true;
		}

		return config;


		//------------------------ LOAD config --------------------------

		//TODO iterate by objects properties: go deeper than one level
		function mergeOptions() {

			config = mergeObjects(config, options);

			function mergeObjects(source, target) {
				var mergedObject = source || {};

				for (var propertyName in source) {
					if (target[propertyName] !== undefined && target[propertyName] !== null) {

						if (typeof target[propertyName] !== "object") {
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
			if (config[name] !== undefined && config[name] !== null) {
				return true;
			} else {
				return false;
			}
		}
	}

	//------------------------ CONSTANS --------------------------

	//Load different Constans based on starting options
	
	function Constans() {
		var constants = {
			CONTAINER_ID: "CONTAINER-ID",

		};

		return constants;

		function LIST_ID() {


		}
	}

	//------------------------ LOGGER --------------------------

	function Logger() {
		var logger = {};

		logger.error = function(message) {
			console.log("ERROR: " + module.name + ": " + message);
		}

		logger.warning = function(message) {
			console.log("WARNING: " + module.name + ": " + message);
		}

		return logger;
	}

}


$.fn.compliter = function(options) {
	new Compliter(this, options).init();
}
