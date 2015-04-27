/*
 * EasyAutocomplete - Template 
 *
 * 
 *
 */
var EasyAutocomplete = (function(scope){

	scope.Template = function Template(options) {



		var genericTemplates = {
			basic: {
				type: "basic",
				method: function(element) { return element; }
			},
			description: {
				type: "description",
				fields: {
					description: "description"
				},
				method: function(element) {	return element + " - description"; }
			},
			iconLeft: {
				type: "iconLeft",
				fields: {
					icon: ""
				},
				method: function(element) {
					return element;
				}
			},
			iconRight: {
				type: "iconRight",
				fields: {
					iconSrc: ""
				},
				method: function(element) {
					return element;
				}
			},
			custom: {
				type: "custom",
				method: function() {}
			}
		},





		/*
		 * Converts method with {{text}} to function
		 */
		convertTemplateToMethod = function(template) {


			//TODO 
			//Move template.fields here + unit tests

			if (template.type === "description") {

			
				var _fields = template.fields;

				var buildMethod = function(elementValue, element) {
					return elementValue + " - " + element[_fields.description];
				};


				return buildMethod;

			}

			if (template.type === "iconRight") {

				var _fields = template.fields;

				var buildMethod = "";

				if (typeof _fields.iconSrc === "string") {
					buildMethod = function(elementValue, element) {
						return elementValue + "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" ;
					};					
				} else if (typeof _fields.iconSrc === "function") {
					buildMethod = function(elementValue, element) {
						return elementValue + "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" ;
					};
				}

				return buildMethod;
			}


			if (template.type === "iconLeft") {

				var _fields = template.fields;

				var buildMethod = "";

				if (typeof _fields.iconSrc === "string") {
					buildMethod = function(elementValue, element) {
						return "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" + elementValue ;
					};					
				} else if (typeof _fields.iconSrc === "function") {
					buildMethod = function(elementValue, element) {
						return "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" + elementValue;
					};
				}

				return buildMethod;
			}


			if (template.type === "custom") {

				return template.method;
			}

			return genericTemplates.basic.method;

		}


		prepareBuildMethod = function(options) {


			//check if empty object and if object has type
			if (!options || !options.type) {

				return genericTemplates.basic.method;
			}

			//There is no generic template that matches 
			//client template type

			if (options.type && genericTemplates[options.type]) {

				//return genericTemplates[options.type].method;
				return convertTemplateToMethod(options);
			} else {

				return genericTemplates.basic.method;
			}



			return convertTemplateToMethod(template);

		};


		this.build = prepareBuildMethod(options);


	}

	return scope;

})(EasyAutocomplete || {});

