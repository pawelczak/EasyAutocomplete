/*
 * EasyAutocomplete - jQuery plugin for autocompletion
 *
 */
var EasyAutocomplete = (function(scope) {

	
	scope.main = function Core($input, options) {
				
		var module = {
				name: "EasyAutocomplete"
			};

		var consts = new scope.Constans(),
			config = new scope.Configuration(options),
			logger = new scope.Logger(),
			template = new scope.Template(options.template),
			proccessResponseData = scope.proccess,
			checkParam = config.equals,

			$field = $input, 
			$container = "",
			elementsList = [],
			selectedElement = -1;
			

		//------------------------ GETTERS --------------------------

		this.getConstants = function() {
			return consts;
		};

		this.getConfiguration = function() {
			return config;
		};

		this.getContainer = function() {
			return $container;
		};

		//------------------------ PUBLIC METHODS STARTS --------------------------	

		this.build = function() {
			prepareField();
		};

		this.init = function() {
			init();
		};

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

			$container = $("#" + getContainerId());


			//Set placeholder for element
			if (config.get("placeholder")) {
				$field.attr("placeholder", config.get("placeholder"));
			}


			function createWrapper() {
				var $wrapper = $("<div>"),
					classes = consts.getValue("WRAPPER_CSS_CLASS");

			
				if (config.get("theme")) {
					classes += " eac-" + config.get("theme");
				}

				if (config.get("cssClasses")) {
					classes += " " + config.get("cssClasses");
				}

				if (template.getTemplateClass() !== "") {
					classes += " " + template.getTemplateClass();
				}
				

				$wrapper
					.addClass(classes);


				//wrapp field with main div wrapper
				$field.wrap($wrapper);


				adjustWrapperWidth();

			}

			function adjustWrapperWidth() {
				var fieldWidth = $field.outerWidth();

				$field.parent().css("width", fieldWidth);				
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
									var animationTime = config.get("list").showAnimation.time,
										callback = config.get("list").showAnimation.callback;

									$elements_container.find("ul").slideDown(animationTime, callback);
								break;

								case "fade":
									var animationTime = config.get("list").showAnimation.time,
										callback = config.get("list").showAnimation.callback;

									$elements_container.find("ul").fadeIn(animationTime), callback;
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
									var animationTime = config.get("list").hideAnimation.time,
										callback = config.get("list").hideAnimation.callback;

									$elements_container.find("ul").slideUp(animationTime, callback);
								break;

								case "fade":
									var animationTime = config.get("list").hideAnimation.time,
										callback = config.get("list").hideAnimation.callback;

									$elements_container.find("ul").fadeOut(animationTime, callback);
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

							$listContainer
								.empty()
								.detach();


							for(var i = 0, length = list.length; i < length; i += 1) {
								$item = $("<li><div class='eac-item'></div></li>");
								

								(function() {
									var j = i,
										elementsValue = config.get("getValue")(list[j]);

									$item.find(" > div")
										.on("click", function() {

											$field.val(elementsValue);
											selectElement(j);
										})
										.mouseover(function() {

											selectedElement = j;
											selectElement(j);	
										})
										.html(template.build(highlight(elementsValue, phrase), list[j]));
								})();

								$listContainer.append($item);
								
							}

							$elements_container.append($listContainer);

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
				} while($("#" + elementId).length === 0);

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

								selectedElement -= 1;

								$field.val(config.get("getValue")(elementsList[selectedElement]));

								selectElement(selectedElement);

							}						
						break;

						case 40:

							//arrow down

							event.preventDefault();

							if(elementsList.length > 0 && selectedElement < elementsList.length - 1) {

								selectedElement += 1;

								$field.val(config.get("getValue")(elementsList[selectedElement]));

								selectElement(selectedElement);
								
							}

						break;

						default:

							if (event.keyCode > 40 || event.keyCode === 8) {
								loadData();	
							}
							

						break;
					}
				

					function loadData() {

						var inputPhrase = $field.val();

						if (config.get("data") !== "list-required") {
							
							elementsList = proccessResponseData(config, config.get("data"), $field.val());

							loadElements(elementsList, inputPhrase);

							showContainer();

						}

						var settings = createAjaxSettings();

						if (settings.url === undefined || settings.url === "") {
							settings.url = config.get("url");
						}

						if (settings.dataType === undefined || settings.dataType === "") {
							settings.dataType = config.get("dataType");
						}


						if (settings.url !== undefined && settings.url !== "list-required") {

							settings.url = settings.url(inputPhrase);

							$.ajax(settings) 
								.done(function(data) {

									elementsList = config.get("listLocation")(data);

									
									if(config.get("dataType").toUpperCase() === "XML") {
										elementsList = convertXmlToList(elementsList);
									}

									var length = elementsList.length;

									if (length === 0) {
										return;
									}
									

									if (checkInputPhraseMatchResponse(inputPhrase, data)) {

										elementsList = proccessResponseData(config, elementsList, $field.val());

										loadElements(elementsList, inputPhrase);	
										
										showContainer();
									}


									config.get("ajaxCallback")();

								})
								.fail(function() {
									logger.warning("Fail to load response data");
								})
								.always(function() {

								});
						}

						function convertXmlToList(list) {
							var simpleList = [];

							$(list).find(config.get("xmlElementName")).each(function() {
								simpleList.push(this);
							});

							return simpleList;
						}

						function createAjaxSettings() {

							var settings = new Object(),
								ajaxSettings = config.get("ajaxSettings") || {};

							for (set in ajaxSettings) {
								settings[set] = ajaxSettings[set];
							}

							return settings;
						}

						function checkInputPhraseMatchResponse(inputPhrase, data) {

							if (config.get("matchResponseProperty") !== false || typeof config.get("matchResponseProperty") === "string") {

								if (data[config.get("matchResponseProperty")] == inputPhrase) {
									return true;
								} else {
									return false;
								}

							} else {
								return true;
							}

						}


					}


				});
			}

			function bindKeydown() {
				$field
					.on("keydown", function(evt) {
	        		    evt = evt || window.event;
	        		    var keyCode = evt.keyCode;
	        		    if (keyCode === 38) {
	        		        suppressKeypress = true; 
	        		        return false;
	        		    }
		        	})
					.keydown(function(event) {

					if (event.keyCode === 13 && selectedElement > -1) {

						//enter

						$field.val(config.get("getValue")(elementsList[selectedElement]));
						selectedElement = -1;
						hideContainer();

						event.preventDefault();
					}
				});
			}

			function bindKeypress() {
				$field
				.off("keypress");
			}

			function bindFocus() {
				$field.focus(function() {

					if ($field.val() !== "" && elementsList.length > 0) {
						
						selectedElement = -1;
						showContainer();	
					}
									
				});
			}

			function bindBlur() {
				$field.blur(function() {

					//TODO
					setTimeout(function() { 
						
						selectedElement = -1;
						hideContainer();
					}, 250);
				});
			}

			function removeAutocomplete() {
				$field.attr("autocomplete","off");
			}

		}

		

		//---------------------------------------------------------------------
		//------------------------ EVENTS -------------------------------------
		//---------------------------------------------------------------------

		// All html modifications should be made by events

		function showContainer() {
			$container.trigger("show");
			selectElement(selectedElement);
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


	};

	return scope;

})(EasyAutocomplete || {});


$.fn.easyAutocomplete = function(options) {
	new EasyAutocomplete.main(this, options).init();
};

