(function() {
    var viewModel = {
        listViewArray: ko.observableArray(),
        favorites: ko.observableArray()
    };

    window.KOApp = window.KOApp || {};
    window.KOApp.favoriteClicked = WinJS.UI.eventHandler(function (evt) {
        viewModel.listViewArray.removeAll();
        viewModel.listViewArray.push.apply(viewModel.listViewArray, viewModel.favorites());
    });    
    window.KOApp.listClicked = WinJS.UI.eventHandler(update);

    function update() {
        var blockSlider = document.getElementById('blockSlider');
        var blockIndex = +blockSlider.value;
        viewModel.listViewArray.removeAll();
        viewModel.listViewArray.push.apply(viewModel.listViewArray, CharMap.createBlock(blockIndex));
    };


   window.onload = function () {
        var root = document.getElementById('root');
        WinJS.UI.processAll(root).then(function () {

            // Setup the SplitView Control
            var splitView = document.querySelector(".splitView").winControl;
            new WinJS.UI._WinKeyboard(splitView.paneElement);
            
            // Load data
            return window.global_data;

        }).then(function (data) {
            unicode = data;
            var title = document.getElementById('title');
            title.textContent = "CharMap";
            var blockSlider = (document.getElementById('blockSlider'));
            blockSlider.max = "" + (unicode.blocks.length - 1);
            blockSlider.addEventListener("change", update);

            ko.applyBindings(viewModel);
            update();
        });

        var lv = document.getElementById('content');
        lv.addEventListener('iteminvoked', handleListViewItemInvoked);
    };

    function showDialog(data) {
        var heading = document.querySelector(".win-contentdialog .heading");
        var body = document.querySelector(".win-contentdialog .body");
        heading.innerHTML = data.preview;
        body.textContent = data.name;
        document.querySelector(".win-contentdialog").winControl.show().then(function (e) {
            if(e.result === "primary") { // favorite
                viewModel.favorites.push(data);
            }
        });
    }

    function cancelDismissal(evenObject) {
        if (evenObject.detail.result === WinJS.UI.ContentDialog.DismissalResult.none) {
            evenObject.preventDefault();
        }
    }

    function handleListViewItemInvoked (ev) {
        ev.detail.itemPromise.then(function (item) {
            showDialog(item.data);
        })
    }
})();