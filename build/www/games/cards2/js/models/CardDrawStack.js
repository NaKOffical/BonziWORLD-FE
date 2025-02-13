/** @module Models */

/**
 * The card stack model
 * @extends {maria.SetModel}
 * @extends {SL.MVC.PJO.CardStack}
 */
SL.MVC.CardDrawStack = {};
maria.SetModel.subclass(SL.MVC, "CardDrawStack", {
    properties: SL.Utils.Object.merge(new SL.MVC.PJO.CardStack(), {

        _sort: function(){
            this.cards.sort(function(a, b){
                return a.zindex - b.zindex;
            });
        },

        /**
         * Syncs the ModelSet with the intern
         * ordered array
         */
        sync: function(){
            var cardModels = [];
            this.forEach(function(card){
                cardModels.push(card);
            });

            this.cards = cardModels;
            this._sort();
        },

        /**
         * Push a card into the stack
         * @param {SL.MVC.Card} card
         */
        pushCard: function(card){
            card.zindex = this.cards.length;
            this.forEach(function(cardInStack){
                cardInStack.setDraggable(false);
            });

            card.setDraggable(true);
            card.setTurned(false);
            this.add(card);
            this.sync();
        },

        /**
         * Get the ordered card collection
         * @return {SL.MVC.Card[]}
         */
        getCards: function(){
            return this.cards;
        }
    })
});