
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

		$field = $field, 
		$container = "",
		elementsList = [],
		selectedElement = -1;
		


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
			.keyup(function(event) {

				switch(event.keyCode) {

					case 27:

						//Esc

						hideContainer();
						loseFieldFocus();
					break;

					case 38:

						//arrow up

						if(elementsList.length > 0 && selectedElement > 0) {

							selectedElement -= 1

							//TODO ellements list by getValue
							$field.val(elementsList[selectedElement]);

							//TODO change name
							selectElement(selectedElement);

						}						
					break;

					case 40:

						//arrow down

						if(elementsList.length > 0 && selectedElement < elementsList.length - 1) {

							selectedElement += 1

							//TODO ellements list by getValue
							$field.val(elementsList[selectedElement]);

							selectElement(selectedElement);
							
						}

					break;

					default:

						if($field.val().length === 0) {
							return;
						}

						loadData();

					break;
				}
			

				function loadData() {
					$.ajax(config.get("url")) 
					.done(function(data) {
						var length = data.length;

						if (length === 0) {
							return;
						}

						
						elementsList = prepareData(data);

						loadElements(elementsList);

						showContainer();

					})
					.fail(function() {
						logger.warning("Fail to load response data");
					})
					.always(function() {

					});

				}
				

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
				hideContainer();
			});
		}

		function bindBlur() {
			$field.blur(function() {

				//TODO
				setTimeout(function() { 
					hideContainer();
				}, 250);
			});
		}

		function removeAutocomplete() {
			$field.attr("autocomplete","off");
		}

	}

	//---------------------------------------------------------------------
	//------------------------ DATA PREPARATION ---------------------------
	//---------------------------------------------------------------------


	//Prepare list to display:
	//- sort 
	//- decrease number to specific number
	//- show only matching list
	function prepareData(list) {

		var inputPhrase = $field.val();
		
		list = findMatching(list, inputPhrase);
		list = reduceElementsInList(list);
		list = sort(list);

		return list;

		function findMatching(list, phrase) {
			var length = list.length,
				preparedList = [],
				value = "";

			if (config.get("list").matching.enabled) {

				for(var i = 0; i < length; i += 1) {

					value = config.get("getValue")(list[i]);
					
					if (!config.get("list").matching.caseSensitive) {
						value = value.toLowerCase();
						phrase = phrase.toLowerCase();
					}

					if (value.search(phrase) > -1) {
						preparedList.push(list[i]);
					}
					
				}

			} else {
				preparedList = list;
			}

			return preparedList;
		}

		function reduceElementsInList(list) {

			//MAX NUMBER OF ELEMENTS
			if (list.length > config.get("list").maxNumberOfElements) {
				list = list.slice(0, config.get("list").maxNumberOfElements);
			}

			return list;
		}

		function sort(list) {

			//SORT
			if (config.get("list").sort.enabled) {
				list.sort(config.get("list").sort.method);
			}

			return list;
		}

	}	

	//---------------------------------------------------------------------
	//------------------------ EVENTS -------------------------------------
	//---------------------------------------------------------------------

	// All html modifications should be made by events

	function showContainer() {
		$container.trigger("show");
		selectElement(selectedElement);//TODO
	}

	function hideContainer() {
		$container.trigger("hide");
	}

	function selectElement(index) {
		
		$container.trigger("selectElement", index);
	}

	function loadElements(list) {
		$container.trigger("loadElements", [list]);
	}

	function loseFieldFocus() {
		$field.trigger("blur");
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

		$container = $("#" + getListId());//.find("ul");


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
					.prepend("<ul></ul>");


			(function() {

				$elements_container
					.on("show", function() {

						switch(config.get("list").showAnimation.type) {

							case "slide":
								//TODO better handle time
								var time = config.get("list").showAnimation.time,
									callback = config.get("list").showAnimation.callback;

								$elements_container.find("ul").slideDown(time, callback);
							break;

							case "fade":
								var time = config.get("list").showAnimation.time,
									callback = config.get("list").showAnimation.callback;

								$elements_container.find("ul").fadeIn(time), callback;
							break;

							default:
								$elements_container.find("ul").show();
							break;
						}
						
					})
					.on("hide", function() {

						switch(config.get("list").hideAnimation.type) {

							case "slide":
								var time = config.get("list").hideAnimation.time,
									callback = config.get("list").hideAnimation.callback;

								$elements_container.find("ul").slideUp(time, callback);
							break;

							case "fade":
								var time = config.get("list").hideAnimation.time,
									callback = config.get("list").hideAnimation.callback;

								$elements_container.find("ul").fadeOut(time, callback);
							break;

							default:
								$elements_container.find("ul").hide();
							break;
						}
					})
					.on("selectElement", function(event, selected) {
						$elements_container.find("ul li").removeClass("selected");
						$elements_container.find("ul li:nth-child(" + (selectedElement + 1) + ")").addClass("selected");
					})
					.on("loadElements", function(event, list) {
		
						var length = list.length,
							$item = "",
							$list = $elements_container.find("ul");

						$list.empty();

						for(var i = 0; i < length; i += 1) {
							$item = $("<li><span></span></li>");
							

							(function() {
								var j = i;

								$item.find("span")
									.on("click", function() {

										//TODO
										$field.val(config.get("getValue")(list[j]));
										selectElement(j);
									})
									.text(config.get("getValue")(list[i]));

							})();

							$list.append($item);
						}

					});

			})();

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

		if (elementId === undefined || elementId === null) {
			
			do {
				elementId = consts.getValue("CONTAINER_ID") + Math.rand(10000);	
			} while($("#" + elementId).length == 0);

		} else {
			elementId = consts.getValue("CONTAINER_ID") + elementId;
		}

		return elementId;
	}

	this.getConfiguration = function() {
		return config;
	}

	this.getConstants = function() {
		return consts;
	}

	this.getContainer = function() {
		return $container;
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
					caseSensitive: false,
					method: function(a, b) {
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
