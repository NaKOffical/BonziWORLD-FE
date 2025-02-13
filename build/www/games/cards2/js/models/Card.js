/** @module Models */

/**
 * The card plain object
 * @constructor
 */
SL.MVC.PJO.Card = function(){
    /** @type {SL.cv} */
    this.value = null;

    /** @type {SL.suits} */
    this.suit = null;

    /** @type {Boolean} */
    this.turned = false;

    /** @type {Boolean} */
    this.draggable = false;

    /** @type {Number} */
    this.zindex = 0;
};

/**
 * The card model
 * @extends {maria.Model}
 * @extends {SL.MVC.PJO.Card}
 */
SL.MVC.Card = {};

maria.MVC.subclass(SL.MVC, "Card", {
    properties: SL.Utils.Object.merge(new SL.MVC.PJO.Card(), {
        /**
         * Default setter for the model
         * @param {String} field
         * @param {*} value
         * @private
         */
        _defaultSetter: function(field, value){
            if(this[field] != value){
                this[field] = value;
                this.dispatchEvent({type: 'change'});
            }
        },

        /**
         * Sets the value of the card
         * @param {SL.cv} value
         */
        setValue: function(value){
            this._defaultSetter('value', value);
        },

        /**
         * Sets the Suit of the card
         * @param {SL.suits} suit
         */
        setSuit: function(suit){
            this._defaultSetter('suit', suit);
        },


        /**
         * Sets the state of the card
         * @param {Boolean} turned
         */
        setTurned: function(turned){
            this._defaultSetter('turned', turned);
        },

        /**
         * Sets the card draggable or not
         * @param {Boolean} draggable
         */
        setDraggable: function(draggable){
            this._defaultSetter('draggable', draggable);
        },

        /**
         * Sets the card ZIndex
         * @param {Number} zindex
         */
        setZIndex: function(zindex){
            this._defaultSetter('zindex', zindex);
        },

        /**
         * Switch the state (back/front) of the card
         */
        flip: function(){
            this.setTurned(!this.turned);
        },

        /**
         * Compares to other card
         * @param {SL.MVC.PJO.Card} card
         * @return {Boolean}
         */
        equals: function(card){
            return this.value == card.value && this.suit == card.suit;
        }
    })
});