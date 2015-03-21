/*
 * EasyAutocomplete - Logger 
 */
var EasyAutocomplete = (function(scope){
	
	scope.Logger = function Logger() {
		var logger = {};

		this.error = function(message) {
			console.log("ERROR: " + message);
		}

		this.warning = function(message) {
			console.log("WARNING: " + message);
		}
	};

	return scope;

})(EasyAutocomplete || {});
	
