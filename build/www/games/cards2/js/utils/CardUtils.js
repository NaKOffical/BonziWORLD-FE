/** @module Utils */

/**
 * Cards utils
 * @type {Object<String, Function>}
 */
SL.Utils.Card = {
    /**
     * Iterates over all cards suits and values
     * @param {Function} callback Receives the value, suit, value name and suit name
     */
    each: function(callback){
        for(var value in SL.cv) {
            for (var suit in SL.suits) {
                if (SL.cv.hasOwnProperty(value) && SL.suits.hasOwnProperty(suit)) {
                    callback(SL.cv[value], SL.suits[suit], value, suit);
                }
            }
        }
    },

    /**
     * Get the card id of the SVG
     * @param {SL.MVC.PJO.Card} card
     * @return {String}
     */
    fileName: function(card){
        var fileName = "";
        var suitKey = SL.Utils.Object.getKey(SL.suits, card.suit);
        var valueKey = SL.Utils.Object.getKey(SL.cv, card.value);

        if (card.turned) {
            fileName = "back.png"
        }
        else {
            var suitName = suitKey.toLowerCase();
            var valueName = card.value > 9 ? valueKey.toLowerCase() : card.value;
            fileName = valueName + "_" + suitName + ".png";
        }

        return fileName;
    }
};
