/*!
 * jQuery JSON-2-Form  Plugin v1.0.0
 * https://github.com/saurshaz/jquery.jquery-json2form.js
 *
 * Copyright 2013 Saurabh Sharma
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var config = $.populateForm = function (frm, data, options) {

        // populate specified form from JSON
        if (data !== undefined && frm !== undefined) {
            options = $.extend({}, config.defaults, options);

            // reset form values from json object
            $.each(data, function (id, node) {
                var name = node.name;
                var val = node.value;

                // handle input fields
                var $el = frm.find($('input[name="' + name + '"]')),
                    type = $el.attr('type');

                switch (type) {
                    case 'checkbox':
                        $el.attr('checked', 'checked');
                        break;
                    case 'radio':
                        $el.filter('[value="' + val + '"]').attr('checked', 'checked');
                        break;
                    default:
                        $el.val(val);
                        break;
                }

                // handle select fields
                var $elSelect = frm.find($('select[name="' + name + '"]')),
                    typeOfSelect = $elSelect.attr('multiple');

                if ((typeOfSelect) && (typeOfSelect === 'multiple')) {
                    // handle multi select scenario
                    $elSelect.find($("option[value='" + val + "']")).prop('selected', true);
                } else {
                    // handle single select scenario
                    $elSelect.val(val);
                }
            });
        }
    };
}));
