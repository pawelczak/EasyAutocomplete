/*
 * Easy autocomplete - jQuery plugin for autocompletion
 *
 */
var EasyAutocomplete = (function(scope) {

	
	scope.main = function Core($field, options) {
				
		var module = {
				name: "easy autocomplete"
			};

		var consts = new scope.Constans(),
			config = new scope.Configuration(options),
			logger = new scope.Logger(),
			proccessResponseData = scope.proccess,
			checkParam = config.equals,

			$field = $field, 
			$container = "",
			elementsList = [],
			selectedElement = -1;
			

		//------------------------ GETTERS --------------------------


		//TODO Remove
		this.getConfiguration = function() {
			return config;
		}

		//TODO Remove
		this.getConstants = function() {
			return consts;
		}

		//TODO Remove
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
				var $wrapper = $("<div>"),
					fieldWidth = $field.outerWidth();

				$wrapper
					.addClass(consts.getValue("WRAPPER_CSS_CLASS"))
					.css("width", fieldWidth);

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
			

							//TODO Move to separate module e.g. buildList 
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
											$field.val(elementsValue);//move to event driven function
											selectElement(j);
										})
										.mouseover(function() {

											//selectElement(j);	
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

						var inputPhrase = $field.val();

						if (config.get("data") !== "list-required") {
							
							elementsList = proccessResponseData(config, config.get("data"), $field.val());

							loadElements(elementsList, inputPhrase);

							showContainer();

						}

						if (config.get("url") !== "list-required") {

							$.ajax({url: config.get("url")(inputPhrase), dataType: config.get("dataType")}) 
								.done(function(data) {
									var length = data.length;

									if (length === 0) {
										return;
									}

									elementsList = data;

									//TODO case insensitive match
									if(config.get("dataType") === "xml") {
										elementsList = convertXmlToList(elementsList);
									}

									elementsList = proccessResponseData(config, elementsList, $field.val());

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

						function convertXmlToList(list) {
							var simpleList = [];

							$(list).find(config.get("xmlElementName")).each(function() {
								simpleList.push(this);
							});

							return simpleList;
						}

					}


					

				});
			}

			function bindKeydown() {
				$field.keydown(function(event) {
					if (event.keyCode === 38) {
						return false;
					}

					if (event.keyCode === 13) {

						//enter

						event.preventDefault();

						//selectElement(selectedElement);

						hideContainer();

						
					}
				});
			}

			function bindKeypress() {
				$field
				.off("keypress")
				.keypress(function(event) {
					
					
				});
			}

			function bindFocus() {
				$field.focus(function() {

					if ($field.val() !== "" && elementsList.length > 0) {
						selectedElement = -1;//TODO change to event, also it should remove class active from li element
						showContainer();	
					}
									
				});
			}

			function bindBlur() {
				$field.blur(function() {

					//TODO
					setTimeout(function() { 
						
						selectedElement = -1;//TODO change to event, also it should remove class active from li element
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


	}

	return scope;

})(EasyAutocomplete || {});


$.fn.easyAutocomplete = function(options) {
	new EasyAutocomplete.main(this, options).init();
}
