(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var fillForm = function (frm, name, val) {
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
            if (val !== undefined && val instanceof Array) {
                //alert(val+' is an Array');   
                $elSelect.val(val);
            } else {
                $elSelect.find($("option[value='" + val + "']")).prop('selected', true);
            }
        } else {
            // handle single select scenario
            $elSelect.val(val);
        }
        
         // handle textarea fields
        var $elTextarea = frm.find($('textarea[name="' + name + '"]'));
        $elTextarea.val(val);
    };
    
   
        
    
    var handleVerboseFormJson = function (frm, data) {
        // reset form values from json object
        $.each(data, function (id, node) {
            var name = node.name;
            var val = node.value;

            // handle input fields
            fillForm(frm, name, val);
        });
    };

    var handleConciseFormJson = function (frm, data) {
        // reset form values from json object
        var result = $.parseJSON(data);
       $.each(data,function (name, value) {
            fillForm(frm, name, value);
        });
    };

    var config = $.populateForm = function (frm, data, options) {
        // populate specified form from JSON
        if (data !== undefined && frm !== undefined) {
            options = $.extend({}, config.defaults, options);

            // default format is considered to be concise
            if (options.format && options.format === 'verbose') {
                // if the format is [{name:<name_val1>,value:,<val_value1>},{name:<name_val2>,value:,<val_value2>}]
                handleVerboseFormJson(frm, data);
            } else if (options.format && options.format === 'provided') {
                // support any other JSON format TODO :: if needed -- consider the option -- 'format'
            } else {
                // if the format is [{<name_val1>:<val_value1>,<name_val2>:<val_value2>}] :: DEFAULT choice
                handleConciseFormJson(frm, data);
            }
        }
    };
}));
