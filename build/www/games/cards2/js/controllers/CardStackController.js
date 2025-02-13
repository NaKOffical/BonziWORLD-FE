/**
 * The card controller
 * @extends {maria.Controller}
 */
SL.MVC.CardStackController = {};

maria.Controller.subclass(SL.MVC, "CardStackController", {
    properties: {
        onClick: function(event){
            alert("foi");
        }
    }
});