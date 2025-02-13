/** @module Models */

SL.MVC.PJO.Game = function(){
    /** @type {SL.MVC.CardStack} */
    this.stack = null;

    /** @type {SL.MVC.CardDrawStack} */
    this.drawStack = null;
};

maria.Model.subclass(SL.MVC, "Game", {
    properties: SL.Utils.Object.merge(new SL.MVC.PJO.Game(), {
        start: function(){

        }
    })
});