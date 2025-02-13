/**
 * The card view
 * @extends {maria.SetView}
 */
SL.MVC.CardStackView = {};

SL.MVC.CardStackTemplate = SL.Utils.Template.load("cardstack");
maria.SetView.subclass(SL.MVC, 'CardStackView', {
   uiActions: {
       "click .cardstack": "onClick"
   },
   properties: {
       /**
        * Creates a sigle card view
        * @param {SL.MVC.PJO.Card} card
        * @return {SL.MVC.CardView}
        */
       createChildView: function(card){
           var cardView = new SL.MVC.CardView(card);
           cardView.cssModifiers = {marginLeft: parseInt(card.zindex/10)};
           return cardView;
       }
   }
});