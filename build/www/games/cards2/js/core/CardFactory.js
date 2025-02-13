/**
 * Manages the load and creation
 * of the svg cards views
 * @constructor
 */
SL.Core.CardFactory = function(){

    /**
     * A set of card images
     * @type {Image[]}
     */
    var cardsImgs = [];

    /**
     * The cover of the card
     * @type {Image}
     */
    var cardCover = new Image();

    /**
     * Validates a card
     * @param {SL.MVC.PJO.Card} card
     * @return {Boolean}
     * @private
     */
    var _validCard = function(card){
        var suitKey = SL.Utils.Object.getKey(SL.suits, card.suit);
        var valueKey = SL.Utils.Object.getKey(SL.cv, card.value);

        return !(suitKey == null || (valueKey == null && card.suit != SL.suits.BACK));
    };

    /**
     * Searches a card into the card images array
     * @param {SL.MVC.PJO.Card} card
     * @return {Image}
     * @private
     */
    var _findCard = function(card){
        for (var i = 0; i < cardsImgs.length; i++) {
            var currCard = cardsImgs[i]._card;
            if (card.value == currCard.value && card.suit == currCard.suit) {
                return cardsImgs[i];
            }
        }
    };

    /**
     * Loads all the cards
     */
    this.load = function(){

        cardCover.src = "css/svg-cards/exported/back.png";

        SL.Utils.Card.each(function(value, suit){
            var card = new SL.MVC.PJO.Card();
            card.suit = suit;
            card.value = value;

            var cardImg = new Image();
            cardImg.src = "css/svg-cards/exported/" + SL.Utils.Card.fileName(card);
            cardImg._card = card;
            cardsImgs.push(cardImg);
        });


    };

    /**
     * Get the card svg
     * @param {SL.MVC.PJO.Card} card
     * @throws {SL.Error.InvalidCard}
     * @return {jQuery}
     */
    this.getCardImg = function(card){
        if (!_validCard(card)) {
            throw new SL.Error.InvalidCard(card);
        }

        if (card.turned) {
            return $(cardCover).clone();
        }
        else {
            return $(_findCard(card)).clone();
        }
    };
};
