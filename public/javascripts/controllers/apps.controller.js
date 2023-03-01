app.controller("AppsController", ($scope, $http,) => {
    $scope.addNew = function () {
        window.location.href = "/apps/create";
    }
});
