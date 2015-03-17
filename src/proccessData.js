//---------------------------------------------------------------------
//------------------------ DATA PROCESS -------------------------------
//---------------------------------------------------------------------


//Process list to display:
//- sort 
//- decrease number to specific number
//- show only matching list

var EasyAutocomplete = (function(scope) {

	scope.proccess = function proccessData(config, list, phrase) {

		var inputPhrase = phrase;//TODO REFACTOR

		list = findMatching(list, inputPhrase);
		list = reduceElementsInList(list);
		list = sort(list);

		return list;


		function findMatching(list, phrase) {
			var preparedList = [],
				value = "";

			if (config.get("list").matching.enabled) {

				for(var i = 0, length = list.length; i < length; i += 1) {

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
		
	};

	return scope;

})(EasyAutocomplete || {});