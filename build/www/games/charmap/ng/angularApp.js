window.unicode = global_data;

angular.module('charmapApp', ['winjs', 'ngSanitize'])
    .controller('CharMapController', function($scope) {
    var charmap = this;

    $scope.viewState = { currentBlock: 0, mode: "list" };
    $scope.data = CharMap.createBlock(0);
    $scope.homeClicked = CharMap.homeClicked;

    $scope.listClicked = WinJS.UI.eventHandler(function(evt) {
        $scope.viewState.mode = "list";
    });
    $scope.favoriteClicked = WinJS.UI.eventHandler(function(evt) {
        $scope.viewState.mode = "favorite";
    });

    $scope.$watch("viewState", 
        function(scope) { 
            if ($scope.viewState.mode === "list") {
                $scope.data = CharMap.createBlock($scope.viewState.currentBlock); 
            }
            else {
                var all = CharMap.getAllBlocks();
                var data = [];
                for (var i=0; i<all.length; i++) {
                    data.push.apply(data, all[i].chars.filter(function (c) { return c.rating; }));
                }
                $scope.data = data;
            }
        }, true);
});
