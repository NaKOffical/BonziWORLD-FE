(function() {
    window.WinJSApp = window.WinJSApp || {};
    window.WinJSApp.listClicked = WinJS.UI.eventHandler(update);

    function update() {
        var content = document.getElementById('content');
        var blockSlider = (document.getElementById('blockSlider'));
        var blockIndex = +blockSlider.value;
        var data = new WinJS.Binding.List(CharMap.createBlock(blockIndex));
        content.winControl.itemDataSource = data.dataSource;
    }
    window.onload = function () {
        var root = document.getElementById('root');
        WinJS.UI.processAll(root).then(function () {
            // UNDONE: for development, just jam the content in here... :)
            //
            return window.global_data;
        }).then(function (data) {
            window.unicode = data;
            var title = document.getElementById('title');
            title.textContent = "CharMap";
            var blockSlider = (document.getElementById('blockSlider'));
            blockSlider.max = "" + (window.unicode.blocks.length - 1);
            blockSlider.addEventListener("change", update);
            update();

            content.addEventListener('iteminvoked', handleListViewItemInvoked);
        });
    };

    function showDialog(data) {
        var heading = document.querySelector(".win-contentdialog .heading");
        var body = document.querySelector(".win-contentdialog .body");
        heading.innerHTML = data.preview;
        body.textContent = data.name;
        document.querySelector(".win-contentdialog").winControl.show();
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
