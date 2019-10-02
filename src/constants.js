/*
 * EasyAutocomplete - Constants
 */
var EasyAutocomplete = (function (scope) {

	scope.Constants = function Constants() {

		var constants = {
			CONTAINER_CLASS: 'easy-autocomplete-container',
			CONTAINER_ID: 'eac-container-',
			WRAPPER_CSS_CLASS: 'easy-autocomplete'
		};

		this.getValue = function (propertyName) {
			return constants[propertyName];
		};

	};

	return scope;

})(EasyAutocomplete || {});
