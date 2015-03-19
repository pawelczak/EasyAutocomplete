//---------------------------------------------------------------------
//------------------------ CONSTANS -----------------------------------
//---------------------------------------------------------------------

/*
 * EasyAutocomplete - Constans
 *
 * @author £ukasz Pawe³czak
 */
var EasyAutocomplete = (function(scope){	
	
	scope.Constans = function Constans() {
		var constants = {
			CONTAINER_CLASS: "easy-autocomplete-container",
			CONTAINER_ID: "eac-container-",

			WRAPPER_CSS_CLASS: "easy-autocomplete"
		};

		this.getValue = function(propertyName) {
			return constants[propertyName];
		}

		function LIST_ID() {


		}
	};

	return scope;

})(EasyAutocomplete || {});
