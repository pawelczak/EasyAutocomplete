
/*
 * Easy autocomplete - jQuery plugin for autocompletion
 *
 * @author Łukasz Pawełczak
 */
function EasyAutocomplete($field, options) {
				
	var module = {
			name: "easy autocomplete"
		};

	var consts = new Constans(),
		config = new Configuration(options),
		logger = new Logger(),
		checkParam = config.equals,

		$field = $field, 
		$container = "",
		elementsList = [],
		selectedElement = -1;
		


	//------------------------ GETTERS --------------------------

	this.getConfiguration = function() {
		return config;
	}

	this.getConstants = function() {
		return consts;
	}

	this.getContainer = function() {
		return $container;
	}

	//------------------------ PUBLIC METHODS STARTS --------------------------	

	this.build = function() {
		prepareField();
	}

	this.init = function() {
		init();
	}

	//------------------------ PUBLIC METHODS ENDS --------------------------	


	//Main method
	function init() {


		if (!config.checkDataUrlProperties()) {
			logger.error("One of options variables 'data' or 'url' must be defined.");
			return;
		}

		if (!config.checkRequiredProperties()) {
			logger.error("Will not work without mentioned properties.");
			return;
		}


		prepareField();
		bindEvents();	

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

		$container = $("#" + getContainerId());//.find("ul");


		//Set placeholder for element
		if (config.placeholder !== false) {
			$field.attr("placeholder", config.placeholder);
		}


		function createWrapper() {
			var $wrapper = $("<div>").addClass(consts.getValue("WRAPPER_CSS_CLASS")),
				fieldWidth = $field.outerWidth();

			$wrapper.css("width", fieldWidth);

			//wrapp field with main div wrapper
			$field.wrap($wrapper);
		}

		function removeWrapper() {
			$field.unwrap();
		}

		function createContainer() {
			var $elements_container = $("<div>").addClass(consts.getValue("CONTAINER_CLASS"));

			$elements_container
					.attr("id", getContainerId())
					.prepend($("<ul>"));


			(function() {

				$elements_container
					/* List show animation */
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
					/* List hide animation */
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
					.on("loadElements", function(event, list, phrase) {
		
						var $item = "",
							$list = $("<ul>"),
							$listContainer = $elements_container.find("ul");

						$listContainer.empty();

						for(var i = 0, length = list.length; i < length; i += 1) {
							$item = $("<li><span></span></li>");
							

							(function() {
								var j = i,
									elementsValue = config.get("getValue")(list[j]);

								$item.find("span")
									.on("click", function() {

										//TODO
										$field.val(elementsValue);
										selectElement(j);
									})
									.html(highlight(elementsValue, phrase));
							})();

							$listContainer.append($item);
						}

					});

			})();

			$field.after($elements_container);
		}

		function removeContainer() {
			$field.next("." + consts.getValue("CONTAINER_CLASS")).remove();
		}

		function highlight(string, phrase) {

			if(config.get("highlightPhrase") && phrase !== "") {
				return highlightPhrase(string, phrase);	
			} else {
				return string;
			}
				
		}

		function highlightPhrase(string, phrase) {
			return (string + "").replace(new RegExp("(" + phrase + ")", "gi") , "<b>$1</b>");
		}



	}

	//Generate unique element id
	function getContainerId() {
		
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

						event.preventDefault();

						if(elementsList.length > 0 && selectedElement > 0) {

							selectedElement -= 1

							//TODO ellements list by getValue
							$field.val(config.get("getValue")(elementsList[selectedElement]));

							//TODO change name
							selectElement(selectedElement);

						}						
					break;

					case 40:

						//arrow down

						if(elementsList.length > 0 && selectedElement < elementsList.length - 1) {

							event.preventDefault();

							selectedElement += 1

							//TODO ellements list by getValue
							$field.val(config.get("getValue")(elementsList[selectedElement]));

							selectElement(selectedElement);
							
						}

					break;

					default:

						loadData();

					break;
				}
			

				function loadData() {

					if (config.get("data") !== "list-required") {
						var inputPhrase = $field.val();

						elementsList = processResponseData(config.get("data"));

						loadElements(elementsList, inputPhrase);

						showContainer();

					}

					if (config.get("url") !== "list-required") {

						$.ajax({url: config.get("url"), dataType: config.get("dataType")}) 
							.done(function(data) {
								var length = data.length;

								if (length === 0) {
									return;
								}

								var inputPhrase = $field.val();

								elementsList = processResponseData(data);

								loadElements(elementsList, inputPhrase);

								showContainer();

								config.get("ajaxCallback")();

							})
							.fail(function() {
								logger.warning("Fail to load response data");
							})
							.always(function() {

							});
					}

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
	//------------------------ DATA PROCESS -------------------------------
	//---------------------------------------------------------------------


	//Process list to display:
	//- sort 
	//- decrease number to specific number
	//- show only matching list
	function processResponseData(list) {

		var inputPhrase = $field.val();
		
		if(config.get("dataType") === "xml") {
			list = convertXmlToSimpleList(list);			
		}

		list = findMatching(list, inputPhrase);
		list = reduceElementsInList(list);
		list = sort(list);

		return list;

		function convertXmlToSimpleList(list) {
			var simpleList = [];

			$(list).find(config.get("xmlElementName")).each(function() {
				simpleList.push(this);
			});

			return simpleList;
		}

		function findMatching(list, phrase) {
			var preparedList = [],
				value = "";

			if (config.get("list").matching.enabled) {

				for(var i = 0, length = list.length; i < length; i += 1) {

					//console.log(config.get("getValue")(list[i]));

					value = config.get("getValue")(list[i]);
					
					if (!config.get("list").matching.caseSensitive) {

						if (typeof value === "string") {
							value = value.toLowerCase();	
						}
						
						phrase = phrase.toLowerCase();
					}

					//TODO Regex
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

	function loadElements(list, phrase) {
		$container.trigger("loadElements", [list, phrase]);
	}

	function loseFieldFocus() {
		$field.trigger("blur");
	}



	//-----------------------------------------------------------------
	//------------------------ CONFIGURATION --------------------------
	//-----------------------------------------------------------------

	/*
	 * Loads Configuration 
	 */
	function Configuration(options) {
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

				if (!options.list.matching) {
					options.list.matching = {};
				}

				options.list.matching.method = function(a, b) {
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
	}



	//---------------------------------------------------------------------
	//------------------------ CONSTANS -----------------------------------
	//---------------------------------------------------------------------


	//Load different Constans based on starting options
	
	function Constans() {
		var constants = {
			CONTAINER_CLASS: "easy-autocomplete-container",
			CONTAINER_ID: "CONTAINER-ID",

			WRAPPER_CSS_CLASS: "easy-autocomplete"
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

		this.error = function(message) {
			console.log("ERROR: " + module.name + ": " + message);
		}

		this.warning = function(message) {
			console.log("WARNING: " + module.name + ": " + message);
		}
	}

}


$.fn.easyAutocomplete = function(options) {
	new EasyAutocomplete(this, options).init();
}
