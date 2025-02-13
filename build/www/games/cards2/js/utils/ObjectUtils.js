/** @module Utils */

/**
 * Object Utils
 * @type {Object<String, Function>}
 */
SL.Utils.Object = {
    /**
     * Returns the merge of two objects
     * @param {Object} obj1
     * @param {Object} obj2
     * @return {Object}
     */
    merge: function(obj1, obj2){
        var final = {};
        for(var i in obj1){
            final[i] = obj1[i];
        }

        for(var j in obj2){
            final[j] = obj2[j];
        }

        return final;
    },

    /**
     * Get the key of a object based on the value
     * @param {Object} obj
     * @param {*} value
     * @return {String}
     */
    getKey: function(obj, value){
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                if(obj[i] == value){
                    return i;
                }
            }
        }

        return null;
    }
};
