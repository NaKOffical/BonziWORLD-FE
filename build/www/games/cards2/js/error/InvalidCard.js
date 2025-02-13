/**
 * A card with a invalid value or suit
 * @param {SL.MVC.PJO.Card} card
 * @constructor
 * @extends {Error}
 */
SL.Error.InvalidCard = function(card){
    this.msg = "Card with invalid suit or/and value";
    this.card = card;
};
