/** @module Utils */

/**
 * The Array utils
 * @type {Object<String, Function>}
 */
SL.Utils.Array = {
    /**
     * Compares two arrays of objects based
     * on their objects equals methods
     * @param {Object} arr1
     * @param {Object} arr2
     * @return {Boolean}
     */
    equals: function(arr1, arr2){
        if (arr1.length != arr2.length) return false;

        for (var i = 0; i < arr1.length; i++) {
            var found = false;
            for (var j = 0; j < arr2.length; j++) {
                if (arr1[i].equals(arr2[j])) {
                    found = true;
                    break;
                }
            }
            if(!found){
                return false;
            }
        }
        return true;
    },

    /**
     * Compares two arrays of objects based
     * on their objects equals methods and they order
     * @param {Object} arr1
     * @param {Object} arr2
     * @return {Boolean}
     */
    strictEquals: function(arr1, arr2){
        if (arr1.length != arr2.length) return false;

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].equals(arr2[i])) {
                return false;
            }
        }
        return true;
    }
};