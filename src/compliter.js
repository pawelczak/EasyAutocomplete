
/*
 * @author Łukasz Pawełczak
 */
function Compliter($field, options) {
				
	var module = {
			name: "Compliter"
		};

	var consts = new Constans(),
		logger = Logger(),
		config = new Configuration(options),
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



	//---------------------------------------------------------------------------
	//------------------------ EVENTS HANDLING ----------------------------------
	//---------------------------------------------------------------------------


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

		//---------------------------------------------------------------------------
		//------------------------ SPECIFIC EVENTS BINDIND --------------------------
		//---------------------------------------------------------------------------

		function bindKeyup() {
			$field
			.off("keyup")
			.keyup(function() {
				
				
				

				$.ajax(config.get("url")) 
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
						if (config.get("list").sort.enabled) {

							//console.log(config.getValue("list").sort.method);

							data.sort(config.get("list").sort.method);


						}

						//MAX NUMBER OF ELEMENTS
						if (length > config.get("list").maxNumberOfElements) {
							data = data.slice(0, config.get("list").maxNumberOfElements);
							length = data.length;
						}

						
						//TODO change this method
						$container.empty();

						for(var i = 0; i < length; i += 1) {

							//TODO 
							$container.append($("<li>" + config.get("getValue")(data[i]) + "</li>"));





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



	//---------------------------------------------------------------------
	//------------------------ FIELD PREPARATION --------------------------
	//---------------------------------------------------------------------


	//TODO Rebuild this function
	function prepareField() {

			
		if ($field.parent().hasClass(consts.getValue("WRAPPER_CSS_CLASS"))) {
			removeContainer();
			removeWrapper();
		} 
		

		createWrapper();
		createContainer();	


		$container = $("#" + getListId()).find("ul");


		//Set placeholder for element
		if (config.placeholder !== false) {
			$field.attr("placeholder", config.placeholder);
		}


		function createWrapper() {
			var $wrapper = $("<div class='" + consts.getValue("WRAPPER_CSS_CLASS") + "' ></div>"),
			fieldWidth = $field.outerWidth();


			$wrapper.css("width", fieldWidth);

			//wrapp field with main div wrapper
			$field.wrap($wrapper);
		}

		function removeWrapper() {
			$field.unwrap();
		}

		function createContainer() {
			var $elements_container = $("<div class='" + consts.getValue("CONTAINER_CLASS") + "' ></div>");

			$elements_container
				.attr("id", getListId())
				.prepend("<ul></ul>")
				.on("show", function() {


				})
				.on("hide", function() {


					
				});





			$field.after($elements_container);
		}

		function removeContainer() {
			$field.next("." + consts.getValue("CONTAINER_CLASS")).remove();
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
		return consts.getValue("CONTAINER_ID") + elementId;
	}


	

	this.getConfiguration = function() {
		return config;
	}

	this.getConstants = function() {
		return consts;
	}

	//-----------------------------------------------------------------
	//------------------------ CONFIGURATION --------------------------
	//-----------------------------------------------------------------

	/*
	Loads Configuration for Compliter
	*/
	function Configuration(options) {
		var defaults = {
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



		//------------------------ LOAD config --------------------------

		//TODO iterate by objects properties: go deeper than one level
		function mergeOptions() {

			defaults = mergeObjects(defaults, options);

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
	}


	//---------------------------------------------------------------------
	//------------------------ CONSTANS -----------------------------------
	//---------------------------------------------------------------------


	//Load different Constans based on starting options
	
	function Constans() {
		var constants = {
			CONTAINER_CLASS: "compliter-container",
			CONTAINER_ID: "CONTAINER-ID",

			WRAPPER_CSS_CLASS: "compliter"
		};

		this.getValue = function(propertyName) {
			return constants[propertyName];
		}

		function LIST_ID() {


		}
	}



	//---------------------------------------------------------------------
	//------------------------ LOGGER -------------------------------------
	//---------------------------------------------------------------------

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
