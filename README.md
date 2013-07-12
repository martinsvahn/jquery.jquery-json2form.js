jquery.jquery-json2form.js
==========================

jquery.jquery-json2form.js


* The call is simply 

$.populateForm($('#form-id'), json-object); // Default format
or
$.populateForm($('#form-id'), json-object, {format:'verbose'});
or
$.populateForm($('#form-id'), json-object, {format:'provided'});


This plugin handles multi-selects in all forms like

{name: "Country", value: ["USA", "UK"]}

or

[{name: "Country", value: "USA"},
{name: "Country", value: "UK"}]


{"Country": ["USA", "UK"]}

or

[{"Country": "USA"},
{"Country":"UK"}]
