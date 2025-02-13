/**
 * The card view
 * @extends {maria.ElementView}
 */
SL.MVC.CardView = {};
SL.MVC.CardTemplate = SL.Utils.Template.load("card");

maria.ElementView.subclass(SL.MVC, "CardView", {
    uiActions: {
        'dragStop .card': 'onDrag'
    },
    properties: {
        /**
         * Turns the card draggable
         * @param {jQuery} $template
         * @private
         */
        _initDrag: function ($template) {
            var that = this;
            $template.draggable({
                stop: function (ev) {
                    this.dispatchEvent(new Event('dragStop'));
                }
            });
        },

        buildData: function () {
            var $templ = $(this.find(""));
            var card = this.getModel();

            var cardImg = SL.App.cardFactory.getCardImg(card);
            $templ.html(cardImg);
            $templ.css({zIndex: card.zindex});
            if(this.hasOwnProperty("cssModifiers")){
                $templ.css(this.cssModifiers);
            }

            $templ.attr("id", card.value + "-" + card.suit);

            this._initDrag($templ);

            if (card.draggable) {
                $templ.draggable('enable');
            }
            else {
                $templ.draggable('disable');
            }
        },

        update: function () {
            this.buildData();
        }
    }
});