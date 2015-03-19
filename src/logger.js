/*
 * EasyAutocomplete - Logger 
 *
 * @author Łukasz Pawełczak
 */
var EasyAutocomplete = (function(scope){
	
	scope.Logger = function Logger() {
		var logger = {};

		this.error = function(message) {
			console.log("ERROR: " + module.name + ": " + message);
		}

		this.warning = function(message) {
			console.log("WARNING: " + module.name + ": " + message);
		}
	};

	return scope;

})(EasyAutocomplete || {});
	
