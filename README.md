# <a href='http://easyautocomplete.com' >EasyAutocomplete - plugin for jQuery</a>
Jquery autocomplete plugin


![demo](http://easyautocomplete.com/images/EasyAutocomplete.gif)


**EasyAutocomplete** is a highly configurable jquery autocomplete plugin:
 * It supports local and remote data sets (JSON, XML and plain text),
 * Uses **ajax** method calls,
 * Allows to search, sort and match the response phrase,
 * It lets you use a couple of different list templates and even offers you possibility to create your own list <a href="http://easyautocomplete.com/guide#sec-templates">template</a>,
 * As one of the best **jquery autocomplete** plugins, EasyAutocomplete supports callback handles, so it can be configured to run functions on specific <a href="http://easyautocomplete.com/guide#sec-trigger-event">events</a>,
 * It has a couple of interesting, clean, modern build in css styles (no images requirement).


If you are interested in using this jQuery autocomplete plugin on your site, you can find out more details in the
<a href="http://easyautocomplete.com/">EasyAutocomplete - jQuery autocomplete - homepage</a>. You can find there <a href='http://easyautocomplete.com/guide' >full documentation and easy guide</a> on how to use EasyAutocomplete plugin.

## Quick example

Javascript:
```Javascript
var options = {

  url: "location_to_file.json",

  getValue: "name"
};

$("#countries").easyAutocomplete(options);
```

JSON:
```JSON
[
  {"name": "Afghanistan", "code": "AF"},
  {"name": "Aland Islands", "code": "AX"},
  {"name": "Albania", "code": "AL"},
  {"name": "Algeria", "code": "DZ"},
  {"name": "American Samoa", "code": "AS"}
 ]
```

HTML:
```HTML
<input id="countries"/>
```

## Demo

There are a couple of examples in folder: `demo`.

## Build

To build project(javascript and css) run:

```
grunt build
```

## File location:

* Distribution files Javascript, CSS are in `dist` folder,
* Source files are in the folder `src`,
* Simple examples, that presents usage of plugin can be found in folder `demo`,
* Tests for the plugin are located in folder `test`.

## Run tests
To execute all unit tests, use:

```
grunt test
```

## License:

Code released under <a href='http://github.com/pawelczak/EasyAutocomplete/blob/master/LICENSE.txt' >the MIT license</a>.
