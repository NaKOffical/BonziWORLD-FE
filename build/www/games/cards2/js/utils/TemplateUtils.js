/** @module Utils */

/**
 * Util functions for templates
 * @type {Object}
 */
SL.Utils.Template = {
    load: function(name){
        var templateStr = "";
        $.ajax({
            url: "html/templates/" + name + ".html",
            type: "GET",
            async: false,
            success: function(template){
                templateStr = template;
            }
        });

        return templateStr;
    }
};
