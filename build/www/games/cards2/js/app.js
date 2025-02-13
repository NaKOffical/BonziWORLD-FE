/**
 * The application module
 * @module App
 */
SL.App = {
    /** @type {SL.Core.CardFactory} */
    cardFactory: null,

    initGame: function(){
        var cardStack = new SL.MVC.CardStack();

        SL.Utils.Card.each(function(value, suit){
            var card = new SL.MVC.Card();
            card.setValue(value);
            card.setSuit(suit);
            card.setTurned(true);

            cardStack.pushCard(card);
        });

        var cardStackView = new SL.MVC.CardStackView(cardStack);
        console.log(cardStack);
        $(".center-block").append(cardStackView.build());
    },

    start: function(){
        this.cardFactory = new SL.Core.CardFactory();
        this.cardFactory.load();
        this.initGame();
    }
};

$(document).ready(function(){
    SL.App.start();
});